import { useEffect, useState, useContext } from "react";
import "./Inputs.scss";
import { InputsContext, UserContext } from "../../../Contexts/ContextProvider";

function Inputs(props) {
  const axios = require("axios").default;
  const [fiat, setFiat] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const changeCoin = useContext(InputsContext);
  const userContext = useContext(UserContext);

  const switchCoin = (e) => {
    if (props.id === 1) changeCoin.setFrom(e.target.value);
    if (props.id === 2) changeCoin.setTo(e.target.value);
  };

  useEffect(() => {
    async function getCoins() {
      const fetchCoins = await axios.get(
        "https://currency-backend-api.herokuapp.com/getcoins"
      );
      setFiat(fetchCoins.data.fiat);
      setCrypto(fetchCoins.data.crypto);
    }
    getCoins();
  }, [axios]);

  useEffect(() => {
    changeCoin.setFrom("");
    changeCoin.setTo("");
  }, [userContext.login.isLogged]);

  return (
    <div className="select-container">
      <select
        id="fiatcoins"
        name="box"
        value={props.id === 1 ? changeCoin.from : changeCoin.to}
        onChange={switchCoin}
      >
        <option value="" defaultValue></option>
        <option disabled id="option">
          FIAT
        </option>
        {fiat.map((coin) => {
          return (
            <option value={coin.id} key={coin.id}>
              {coin.symbol} - {coin.name}{" "}
            </option>
          );
        })}
        <option disabled>CRYPTO</option>
        {crypto.map((coin) => {
          return (
            <option value={coin.id} key={coin.id}>
              {coin.symbol} - {coin.name}
            </option>
          );
        })}
      </select>
      <span id="select-arrow"></span>
    </div>
  );
}

export default Inputs;
