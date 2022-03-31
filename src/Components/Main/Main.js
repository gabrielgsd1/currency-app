import "./Main.scss";
import Inputs from "./Inputs/Inputs";
import Result from "./Result/Result";
import { InputsContext, UserContext } from "../../Contexts/ContextProvider";
import { useState, useContext } from "react";

function Main() {
  const [resultState, setResultState] = useState("none");
  const [result, setResult] = useState("");
  const [errorCoin, setErrorCoin] = useState(false);
  const [errorCoinMessage, setErrorCoinMessage] = useState(null);
  const coinsToSend = useContext(InputsContext);
  const userInfo = useContext(UserContext);
  const axios = require("axios").default;

  const convert = async () => {
    setErrorCoin(false);
    setErrorCoinMessage(null);
    if (coinsToSend.from === "" || coinsToSend.to === "") {
      setErrorCoin(true);
      setErrorCoinMessage("Please choose two coins to convert");
      return;
    }
    const req = await axios.post(
      "https://currency-backend-api.herokuapp.com/convert",
      {
        from: coinsToSend.from,
        to: coinsToSend.to,
      }
    );
    setResult(req.data);
    setResultState("done");
  };

  const switchCoins = () => {
    let temp = coinsToSend.to;
    coinsToSend.setTo(coinsToSend.from);
    coinsToSend.setFrom(temp);
  };

  const userName = () => {
    if (!userInfo) return;
    const name = userInfo.user.user.name;
    const firstLetter = name.at(0).toUpperCase();
    const rest = name.slice(1);
    return firstLetter + rest;
  };

  return (
    <div id="main">
      <h1 className="name">Hello, {userName()}</h1>
      {errorCoin ? <h1>{errorCoinMessage}</h1> : ""}
      <div className="item" id="boxes">
        <div className="content-container">
          <div className="content">
            <label htmlFor="box1">Convert</label>
            <Inputs id={1} />
          </div>
          <div className="content">
            <label htmlFor="box2">To</label>
            <Inputs id={2} />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={convert} className="item" name="box" id="button">
          Convert
        </button>
        <button onClick={switchCoins} className="item" name="box" id="switch">
          Switch
        </button>
      </div>
      {resultState !== "none" ? (
        <Result result={result} resultState={resultState} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Main;
