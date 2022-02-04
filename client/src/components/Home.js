import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Navbar from './Navbar'
import styled from 'styled-components';

const Home = () => {
    const { user, loggedIn, positions, portfolio, netLiq } = useContext(UserContext)
    const HomeComponent = styled.div`
        background-color: #44014C;
        width: 300px;
        min-height: 200px;
        margin: 30px auto;
        box-sizing: border-box;
    `;
    //fetchPositions()
    if(!loggedIn){
    return (
        <div>
            <h1>login or signup to get started</h1>
            <Navbar></Navbar>
        </div>
    )
    } else {
        return (
        <div>
            <Navbar></Navbar>
            <br/>
            <h1>{user.username}'s portfolio</h1>
            <br/>
            cash balance:{portfolio?.cash_balance}
            <br/>
            net liquidity:{portfolio?.cash_balance + parseInt(netLiq)}
            {positions}
        </div>
        )
    }
}

export default Home