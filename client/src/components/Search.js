import React, {useState, useEffect, useContext} from 'react'
import Navbar from './Navbar'
import { LineChart, Line, XAxis, Tooltip, CartesianGrid } from 'recharts';
import CoinLink from './CoinLink';
import { UserContext } from '../context/user'

const Search = () => {
    const [coinName, setCoinName] = useState("bitcoin") 
    const [flag, setFlag] = useState(false)
    const [historicalPrice, setHistoricalPrice] = useState([])
    const [trendingCoins, setTrendingCoins] = useState([])
    const {coins, buyCoin, fetchCoins} = useContext(UserContext)
    const [coin, setCoin] = useState(null)

    const fetchCoinSearch = (name) => {
        fetch(`https://api.coingecko.com/api/v3/coins/${name}`, {
            "method": "GET"
        })
        .then(res => res.json())
        .then(data => {
            setCoin(data)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchCoinSearch(coinName)
        fetchCoins()
    }
    const postCoin = () => {
        //if bitcoin is there/ in coins if not buyCoins
        buyCoin(coin)
    }

    const fetchTrendingCoins = () => {
        fetch("https://api.coingecko.com/api/v3/search/trending")
        .then(res => res.json())
        .then(data => {
            setTrendingCoins(data.coins)
        })
    }

    useEffect(() => {
        fetchCoinSearch(coinName)
        fetchTrendingCoins()
      }, []);

    const coinsList = trendingCoins.map((c) => {
        return (<ul key={c.coin_id}><br/>name: {c.item.name}, ticker: {c.item.symbol}, mkt cap rank: {c.item.market_cap_rank}<img src={c.item.small}></img><br/></ul>)
    })

    return (
        <div>
            <Navbar></Navbar>
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
            {/* Fetch top coins by mkt cap, then map? */}
            {coin ? coin.name : null}
           {/* <img src={coins[0].image.large}></img>
            <br/>
            {coins[0].id}({coins[0].symbol}) ${coins[0].tickers[1].last} <b>{coins[0].price_change_percentage_24h}%</b> */}
            <br/><br/>
            <button onClick={postCoin}>add to coins</button>
            <br/>
            <br/>
            <h2><u>trending coins:</u></h2><br/>
            {coinsList}
        </div>
    )
}
export default Search;