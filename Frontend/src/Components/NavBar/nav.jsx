import "./nav.css";
import { Link } from "react-router-dom";
import {  useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../Contexts/authContext";

export default function NavBar() {
  const [showMobileNav, setMobileNav] = useState(false);
  const { isLoggedUserin } = useAuth();

  function togglenav() {
    setMobileNav(!showMobileNav);
  }


  return (
    <div id="navbar-container">
      <div id="navbar-div">
        <div id="navbar-main">
          <div>
            <h1>DigiCard</h1>
          </div>
          <div id="open-nav-div">
            <button onClick={togglenav} aria-label="open and close menu button">
              {showMobileNav ? (
                <CloseIcon sx={{ color: "white" }} />
              ) : (
                <MenuIcon sx={{ color: "black" }} />
              )}
            </button>
          </div>
          <div className={showMobileNav ? "navbar-btn" : "navbar-links"}>
            <Link to="/">Home</Link>
            {isLoggedUserin.isLoggedIn ? (
              <p id="username-nav"> {
                isLoggedUserin.username ? isLoggedUserin.username : 'User'
              }
              </p>
            ) : (
              <>
                <Link to="/loginForm">Log in</Link>
                <Link to="/signupForm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
