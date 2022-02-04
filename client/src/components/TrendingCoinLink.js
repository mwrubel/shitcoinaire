import React from 'react'
import { Link } from "react-router-dom"

const TrendingCoinLink = ({ coin }) => {
    return (
        <div>
            <Link to={"/coins/" + coin.symbol}>
                <h3>{coin.coin_id}({coin.current_price})</h3>
            </Link>
            <br/>
        </div>
    )
}
export default TrendingCoinLink