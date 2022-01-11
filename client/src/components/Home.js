import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Navbar from './Navbar'

const Home = () => {
    const { user, loggedIn, positions, portfolio } = useContext(UserContext)
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
            <h1>{user.username}'s portfolio</h1>
            <Navbar></Navbar>
            <br/>
            {portfolio}
            {positions}
        </div>
        )
    }
}

export default Home