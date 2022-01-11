import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {login} = useContext(UserContext)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(user => {
                if (!user.errors) {
                    login(user)   
                } else {
                    setError(user.error)
                }     
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /> <br/>
                <label>Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br/>
                <input type="submit"/>
            </form>
            <ul>
                <h3>{error}</h3>
            </ul>
        </>
    )
}
export default Login