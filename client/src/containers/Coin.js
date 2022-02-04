import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../context/user'
//HAND IN COIN??!
const Coin = () => {
    const params = useParams();
    const {addPosition, coins} = useContext(UserContext)
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const [coin, setCoin] = useState(null)

    useEffect(() => {
        fetch("/coins/" + params.id)
          .then((res) => res.json())
          .then((data) => {
            setCoin(data);
          });
      }, []);


    const handleSubmit = (e) => {
        console.log("submit")
        e.preventDefault()
        addPosition(coin, amount, price)
    }

    if (coin) {
        return (
        <div>
            
            {coin.id}
            <br/>
            <img src={coin.image}></img>
            <br/>
            {coin.name}
            <br/>
            {coin.description}
            <form onSubmit={handleSubmit}>
            <label>Buy {coin.name}: </label>
            <input
                type="text"
                id="amount"
                value={amount}
                 onChange={(e) => setAmount(e.target.value)}
             /> <br/>
             <label>Price (usd): </label>
             <input
                type="text"
                id="price"
                value={price}
                 onChange={(e) => setPrice(e.target.value)}
             /> <br/>
            <input type="submit"/>
        </form>
        </div>
    )
    }
    else {
        return(<div>coin not found</div>)
    }

}

export default Coin