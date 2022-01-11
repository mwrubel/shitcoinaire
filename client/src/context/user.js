import React, { useState, useEffect} from 'react'

// create context
const UserContext = React.createContext()

// provider (provides children with value)
function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [positions, setPositions] = useState([])
    //const [portfolio, setPortfolio] = useState({})

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setUser(data)
            if (data.error) {
                setLoggedIn(false)
            } else {
                setLoggedIn(true)
                fetchPositions()
                //fetchPortfolio()
            }
        })
    }, [])

    // const fetchPortfolio = () => {
    //     fetch('/portfolio')
    //     .then(res => res.json())
    //     .then(data => setPortfolio(data))
    // }

    //get positions
    const fetchPositions = () => {
        fetch('/positions')
        .then(res => res.json())
        .then(data => {
            //setPositions(data)
        })
    }

    //add positions
    const addPosition = (position) => {
        console.log(position)
        fetch('/positions', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(position)
        })
        .then(res => res.json())
        .then(data => {
            setPositions([...positions, data])
        })
    }

    //edit positions function
    const editPosition = (id, position) => {
        console.log("PATCH ID" + id)
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
        <UserContext.Provider value={{user, loggedIn, positions, login, logout, signup, addPosition, editPosition, deletePosition}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }