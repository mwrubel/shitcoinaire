import React, {useContext} from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
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
            <div className='Navbar'>
              {/* <ListGroup horizontal>
              <ListGroup.Item></ListGroup.Item>
              <ListGroupItem>f</ListGroupItem> */}
                <h1>{user.username}</h1>
                <button onClick={logoutUser}>Logout</button>
                <br/>
                <NavLink to='/portfolio'>
                  My portfolio
                </NavLink>
                <br/>
                <NavLink to='/coins'>
                  Coins
                </NavLink>
                <br/>
                <NavLink to='/search'>
                  Search for coins
                </NavLink>
                <br/>
                <NavLink to='/positions'>
                  Positions
                </NavLink>
                {/* </ListGroup> */}
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