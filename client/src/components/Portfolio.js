import React, {useState, useContext} from 'react'
import { UserContext } from '../context/user'

const Portfolio = () => {
    const {portfolio} = useContext(UserContext)




    return (
        <div>
            <h1>Portfolio:</h1>
            cash bal: {portfolio.cash_balance}
        </div>
    )
}
export default Portfolio