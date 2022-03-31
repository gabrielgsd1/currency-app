import "./Form.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Contexts/ContextProvider";

function Form(props) {
  const navigate = useNavigate();
  const axios = require("axios").default;
  const userContext = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState(null);
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

  async function checkLogin() {
    if (email === "" || password === "") {
      setErrorLogin(true);
      setErrorLoginMessage("Please fill all the fields");
    }
    const req = await axios.post(
      "https://currency-backend-api.herokuapp.com/userLogin",
      {
        email: email.toLowerCase(),
        password,
      }
    );
    if (!req.data.status.success) {
      setErrorLogin(true);
      setErrorLoginMessage(req.data.status.message);
      return;
    }
    userContext.user.setUser({
      id: req.data.userInfo.id,
      name: req.data.userInfo.name,
      email: req.data.userInfo.email,
    });
    setErrorLogin(false);
    setErrorLoginMessage("");
    userContext.login.setIsLogged(true);
    navigate("/");
  }

  const registerUser = async () => {
    const isEmailValid = regex.test(email);
    if (!isEmailValid) {
      setErrorLogin(true);
      setErrorLoginMessage("Email is not in a valid way");
      return;
    }
    if (email === "" || password === "" || name === "") {
      setErrorLogin(true);
      setErrorLoginMessage("Please fill all the fields");
      return;
    }
    const req = await axios.post(
      "https://currency-backend-api.herokuapp.com/registerUser",
      {
        name,
        email: email.toLowerCase(),
        password,
      }
    );
    if (req.data.success) navigate("/login");
    else {
      setErrorLogin(true);
      setErrorLoginMessage(req.data.message);
      return;
    }
  };

  const checkKey = (e) => {
    if (e.keyCode === 13) {
      if (props.type === "register") registerUser();
      else if (props.type === "login") checkLogin();
    }
  };

  return (
    <div id="form">
      {errorLogin ? <h1 id="error-message">{errorLoginMessage}</h1> : ""}
      {props.type === "register" ? (
        <div className="form-item">
          <h2 align="center">Welcome, user!</h2>
          <label className="label-form" htmlFor="name-form">
            Name
          </label>
          <input
            onKeyDown={checkKey}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="input-form"
            type="text"
            id="name-form"
          />
        </div>
      ) : (
        <h2 align="center">Please login to enjoy the best of this website!</h2>
      )}
      <div className="form-item">
        <label className="label-form" htmlFor="email-form">
          Email
        </label>
        <input
          onKeyDown={checkKey}
          autoComplete="off"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input-form"
          type="text"
          id="email-form"
        />
      </div>
      <div className="form-item">
        <label className="label-form" htmlFor="password-form">
          Password
        </label>
        <input
          onKeyDown={checkKey}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input-form"
          type="password"
          required
          id="password-form"
        />
      </div>
      <div className="form-item" id="button-item">
        {props.type === "register" ? (
          <button id="button-form" onClick={registerUser}>
            Register
          </button>
        ) : (
          <button id="button-form" onClick={checkLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Form;
