import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  const onSelect = (event) => {
    setCoinPrice(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  console.log(coinPrice);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onSelect}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(2)}
                USD
              </option>
            ))}
          </select>
          <input
            onChange={onChange}
            type="number"
            placeholder="Your Deposit"
          ></input>
          <span>
            You can have{" "}
            {coinPrice !== null ? (money / coinPrice).toFixed(2) : null}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
