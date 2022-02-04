import React from "react";
import { Link} from "react-router-dom";

const CoinLink = ({ coin }) => {

  return (
    <div>
      <Link to={"/coins/" + coin?.symbol}>
        <h3>{coin?.id}({coin?.symbol}) ${coin?.tickers[1].last} <b>({coin?.market_data.price_change_percentage_24h}%)</b></h3>
      </Link>
      <img src={coin?.image.large}></img>
      <br></br>
    </div>
  );
};

export default CoinLink;
