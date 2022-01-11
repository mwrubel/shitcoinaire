import React, {useContext} from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';

const Navbar = () => {
    const { user, logout, loggedIn } = useContext(UserContext)
    const navigate = useNavigate()

    const logoutUser = () => {
        fetch('/logout', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            logout()
            navigate('/')
        })
    }

    if (loggedIn) {
        return(
            <div>
                <h1>Hello, {user.username}</h1>
                <br/>
                <button onClick={logoutUser}>Logout</button>
                <br/>
                <NavLink to='/portfolio'>
                  My portfolio
                </NavLink>
                <br/>
                <NavLink to='/search'>
                  search for coins
                </NavLink>
            </div>
        )
    }
    else {  
      return (
      <div>
        <ul>
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
        <br/>
        <NavLink to="/signup">
          <button>Sign up</button>
        </NavLink>
        </ul>
      </div>
      )
    }
}
export default Navbar;