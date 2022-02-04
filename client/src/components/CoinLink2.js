import React from "react";
import { Link} from "react-router-dom";

const CoinLink2 = ({ coin }) => {

  return (
    <div>
      <Link to={"/coins/" + coin.id}>
        <h3>{coin.name}({coin.ticker})  <img src={coin.image}></img></h3>
      </Link>
      <br></br>
    </div>
  );
};

export default CoinLink2;