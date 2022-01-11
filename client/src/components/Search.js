import React, {useState, useEffect} from 'react'

const Search = () => {
    const [coinName, setCoinName] = useState([]) 
    const [coins, setCoins] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData()
    }

    const fetchData = () => {
        fetch(`https://coingecko.p.rapidapi.com/coins/${coinName}?sparkline=false&developer_data=true&community_data=true&market_data=true&tickers=true&localization=true`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coingecko.p.rapidapi.com",
                "x-rapidapi-key": "7f0443b9aemsh3ffa391c8a958eep138b24jsn80600be739c4"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCoins(data)
        })
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Search for coin: </label>
            <input
                type="text"
                id="coinName"
                value={coinName}
                 onChange={(e) => setCoinName(e.target.value)}
             /> 
             <input type="submit"/>
             </form>
            <br/>
            {coins.id}({coins.symbol}) ${coins.tickers[0].last} 
            
        </div>
    )
}
export default Search;