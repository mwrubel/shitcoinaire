import React, { useState, useEffect, useContext } from "react";
import PositionLink from "../components/PositionLink";
import { UserContext } from '../context/user'

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [netLiq, setNetliq] = useState(0)
  const {portfolio} = useContext(UserContext)

  useEffect(() => {
    fetch("/positions")
      .then((res) => res.json())
      .then((data) => {
        setPositions(data);
      });
      if(positions.length > 0){
        const result = positions.reduce((total, currentValue) => total = total + (currentValue.cost_basis*currentValue.quantity),0);
        setNetliq(result)
      }
  }, []);

  //positions list, sent to positionlink. Creates clickable link for each position
  const positionsList = positions.map((p) => <PositionLink key={p.id} position={p} />);
  
  return (
    <div>
      {netLiq !==0 ? <h3>net liq: {netLiq + portfolio.cash_balance} </h3>: <h1>{netLiq}</h1>}
      <br/>
      Positions:
      <ul>{positionsList}</ul>
    </div>
  );
};

export default Positions;