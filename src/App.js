import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">All About Crypto Currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="header-row">
        <div className="header-col ">
          <p className="header header-currency">Currency</p>
          <p className="header header-symbol">Symbol</p>
          <p className="header header-price">Current Price</p>
          <p className="header header-volume">Volume</p>
          <p className="header header-price_change_percentage_24h">24h</p>
          <p className="header header-market_cap">Market Cap</p>
          <p className="header header-high">High(24h) </p>
          <p className="header header-low">Low(24h)</p>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
            high_24h={coin.high_24h}
            low_24h={coin.low_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
