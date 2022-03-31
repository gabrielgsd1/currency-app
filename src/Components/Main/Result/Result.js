import { useState, useEffect } from "react";
import "./Result.css";

function Result(props) {
  let fromCoinData = props.result.fromCoin;
  let toCoinData = props.result.toCoin;
  let finalResult = props.result.conversionPrice;

  const [number, setNumber] = useState(1);

  const changeNumber = (e) => {
    setNumber(e.target.value);
  };

  useEffect(() => {
    setNumber(1);
  }, [props.result.fromCoin, props.result.toCoin]);

  return (
    <div id="resultContainer">
      <table id="resultTable">
        <thead>
          <tr>
            <th colSpan="2">
              {fromCoinData.symbol} - {toCoinData.symbol}{" "}
            </th>
          </tr>
          <tr>
            <th>Value</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                id="numberInput"
                min="0"
                max="10000"
                maxLength="4"
                value={number}
                onChange={(e) => changeNumber(e)}
              />
            </td>
            <td>{fromCoinData.symbol}</td>
          </tr>

          <tr>
            <td>{(finalResult * number).toFixed(12)}</td>
            <td>{toCoinData.symbol}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Result;
