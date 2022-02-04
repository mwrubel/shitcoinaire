import React, { useState, useEffect } from "react";
import CoinLink2 from "../components/CoinLink2";
import CoinLink from "../components/CoinLink";
const Coins = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("/coins")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        
      });
  }, []);

  //coins list, clickable link for each coin
  //const coinsList = coins.map((c) => <li key={c.id}> {c.name} ({c.ticker}) <img src={c.image}></img></li>);
  const coinsList = coins.map((c) => <CoinLink2 key={c.id} coin={c} />);
  return (
    <div>
      Coins:
      <ul>{coinsList}</ul>
    </div>
  );
};

export default Coins;