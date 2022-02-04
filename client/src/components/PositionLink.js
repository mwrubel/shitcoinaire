import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";

const PositionLink = ({ position }) => {

  const [coin, setCoin] = useState(null)

  useEffect(() => {
    fetchCoin()
  }, [])

  const fetchCoin = () => {

      fetch(`/coins/${position.coin_id}`)
      .then(res => res.json())
      .then(data => {
          setCoin(data)
      })
  }

  return (
    <div>
        {/* coins/id */}
      <Link to={"/positions/" + position.id}>
        <h3>{coin?.name}({coin?.ticker}) <br/>  cost basis: ${position.cost_basis} quantity: {position.quantity}</h3>
      </Link>
      <br></br>
    </div>
  );
};

export default PositionLink;
