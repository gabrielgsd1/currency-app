import "./Header.scss";
import { useContext } from "react";
import { UserContext } from "./../../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  const signOut = () => {
    userContext.user.setUser(null);
    userContext.login.setIsLogged(false);
    navigate("/login");
  };

  return (
    <div id="header-header">
      <div className="items">
        {userContext.login.isLogged ? (
          <button className="button" onClick={signOut}>
            Sign Out
          </button>
        ) : (
          <div id="two-buttons">
            <button className="button" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button className="button" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
