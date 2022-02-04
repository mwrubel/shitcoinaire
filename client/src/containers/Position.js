import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../context/user'
import Positions from "./Positions";

const Position = () => {
    const params = useParams();
    const {portfolio, setPortfolio} = useContext(UserContext)
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const [position, setPosition] = useState(null)
    const [coin, setCoin] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/positions/${params?.id}`)
        .then(res => res.json())
        .then(data => {
            setPosition(data)
        })
        fetch(`/coins/${position?.coin_id}`)
        .then(res => res.json())
        .then(data => {
            setCoin(data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        //if (amount > position.)
        editPosition()
    }

    //MAYBE USE ONE FROM CONTEXT?
    const editPosition = () => {
        // quanitity = amount / price then quantity-quantity
        let quanitity = amount/price
        let newCashBal = portfolio.cash_balance+amount
        
        if ((amount/price) > position.quanitity) {
            return <h3>not enough {coin?.name} to meet your order</h3>
        }
        else {
        fetch(`/positions/${params?.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", },
            body: JSON.stringify({
            quantity: position.quantity-quanitity, 
            cost_basis: position.cost_basis,
            })
        })
        .then(res => res.json())
        .then(data => {
            setPosition([data])
        })
        fetch(`/portfolios/${portfolio.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", },
            body: JSON.stringify({
                cash_balance: portfolio.cash_balance+= amount
            })
        })
        .then(res => res.json())
        .then(data => {
            setPortfolio(data)
        })
        }
    }

    const marketClose = () => {
        fetch(`/positions/${params?.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }).then(()=>{
            //go back to positions page
            navigate("/positions");
          }) 
    }


    

    return (
        <div>
            size: {position?.quantity}
            <br/>
            cost basis: ${position?.cost_basis}
            <br/>
            <button onClick={marketClose}>market close</button>
            <form onSubmit={handleSubmit}>
            <label>Sell {coin?.name}: </label>
            <input
                type="text"
                id="amount"
                value={amount}
                 onChange={(e) => setAmount(e.target.value)}
             /> <br/>
             <label>Price: $</label>
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

export default Position