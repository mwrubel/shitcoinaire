import React, { useState, useEffect} from 'react'

//https://dev.to/christiankastner/rails-strong-params-and-accepting-nested-parameters-5bgd


// create context
const UserContext = React.createContext()

// provider (provides children with value)
function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [positions, setPositions] = useState([])
    const [portfolio, setPortfolio] = useState(null)
    const [coins, setCoins] = useState([])
    const [netLiq, setNetLiq] = useState(0)

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setUser(data)
            if (data.error) {
                setLoggedIn(false)
            } else {
                fetchPortfolio()
                setLoggedIn(true)
                fetchCoins()
            }
        })
    }, [])

    //get coins
    const fetchCoins = () => {
        fetch('/coins')
        .then(res => res.json())
        .then(data => {
            setCoins(data)
        })
    }

    //change to addCoin
    const buyCoin = (coin) => {
        //if coins.find
        if (!coins.find((c)=>c.name===coin.name)) {
            fetch('/coins', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                name: coin.name,
                ticker: coin.symbol,
                image: coin.image.small,
                description: coin.description.en
            })
            })
            .then(res => res.json())
            .then(data => setCoins([...coins, data]))
        }

    }

    const sellCoin = (coin, amount) => {
        
    }

    const fetchPortfolio = () => {
        fetch("/portfolio")
        .then(res => res.json())
        .then(data => setPortfolio(data))
        .catch(err => {
	        console.error(err);
        });
    }

    const createPortfolio = () => {
        fetch('/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                cash_balance: 100000,
                user_id: user.id
            })
        })
            .then(res => res.json())
            .then(data => setPortfolio(data))
    }

    //get positions
    const fetchPositions = () => {
        fetch('/positions')
        .then(res => res.json())
        .then(data => {
            setPositions(data)
            console.log(positions)
        })
        const result = positions.reduce((total, currentValue) => total = total + (currentValue.cost_basis*currentValue.quantity),0);
        setNetLiq(result)
        // for (let i = 0; i < positions.length; i++) {
        //     total+=(positions[i].cost_basis*positions[i].quantity)
        //     setNetLiq(total)
        //     console.log(total)
        // } 
    }

    //add positions
    const addPosition = (coin, amount, price) => {
        // if (portfolio.cash_balance >= amount) {
            fetch(`/portfolios/${portfolio.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", },
                body: JSON.stringify({
                    cash_balance: portfolio.cash_balance-amount
                })
            })
            .then(res => res.json())
            .then(data => {
                setPortfolio(data)
            })
            fetch('/positions', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    portfolio_id: portfolio.id,
                    coin_id: coin.id,
                    quantity: amount/price,
                    cost_basis: price
                })
            })
            .then(res => res.json())
            .then(data => {
                setPositions([...positions, data])
            })
        // }
        // else {
        //     console.log("NOT ENOUGH MONEY TO BUY")
        // }
    }

    //edit positions function
    const editPosition = (id, position) => {
        fetch('/positions/' + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", },
            body: JSON.stringify({


            })
        })
        .then(res => res.json())
        .then(data => {
            setPositions([...positions, data])
        })
        fetchPositions()
    }

    // delete function
    const deletePosition = (e) => {
        fetch('/positions/' + e.target.id, {
            method: "DELETE"
        })
        .then(res => {
            if(res.ok){
                fetchPositions()
        // console.log(trails)
        //  let updatedTrails = trails
        //  updatedTrails.filter((item) => item.trail_name !== e.target.value)
        //  console.log("e: "+e.target.id)
        //  setTrails([...updatedTrails])
        //  console.log(updatedTrails)
            } else {
                res.json().then(console.log(res))
            }
        })
    }

    const login = (user) => {
        setUser(user)
        fetchPositions()
        setLoggedIn(true)
    }

    const logout = () => {
        setUser({})
        setPositions([])
        setLoggedIn(false)
    }

    const signup = (user) => {
        setUser(user)
        fetchPositions()
        setLoggedIn(true)
    }

    return (
        <UserContext.Provider value={{
            user, loggedIn, positions, portfolio, netLiq, setPortfolio, coins, login, logout, signup, fetchPortfolio, createPortfolio, addPosition, 
            editPosition, fetchPositions, fetchCoins, deletePosition, buyCoin, sellCoin
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }