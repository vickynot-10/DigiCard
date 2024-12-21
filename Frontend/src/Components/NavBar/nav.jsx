import "./nav.css";
import { Link } from "react-router-dom";
import {  useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../Contexts/authContext";
import axios from "axios";
import Modal from '../Reusable_components/Modal/modal'
import Toaster from '../Reusable_components/Toaster/toaster'
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate()
  const [showMobileNav, setMobileNav] = useState(false);
  const { isLoggedUserin } = useAuth();
  const [logoutobj,setlogoutobj] = useState({
    isLogout : false , msg: '' , msgOnErr : ''
  })

  function togglenav() {
    setMobileNav(!showMobileNav);
  }

  async function Logout(){
    try{
      let res = await axios.post(`${process.env.REACT_APP_URL}/logout`,{},{
        withCredentials : true
      });
      if(!res){
        throw new Error("Error at logging out try again");
      }
      if(res.data.isLogout === true){
        setlogoutobj({
          isLogout : true , msg : res.data.msg , msgOnErr : ''
        })
        setTimeout(()=>{
          navigate(0)
        },5000)
      }
    }catch(e){
      let errmsg = e.message || "An error occured";
      if(e.response){
        errmsg = e.response.data
      }
      setlogoutobj({
        isLogout  : false , msgOnErr  : errmsg , msg : ''
      })
    }
  }
function setlogoutfalse(){
  setlogoutobj({
    isLogout : false , msg :"" , msgOnErr : ''
  })
}

  return (
    <div id="navbar-container">
      {
        logoutobj.isLogout && <Modal headerText="Thank you" onClose={setlogoutfalse} AutoHideDuration={4000} >
          <Toaster message={ logoutobj.msg.length > 1 ? logoutobj.msg  : logoutobj.msgOnErr.length > 1 ? logoutobj.msgOnErr : null }
          showIcon={false}
          height="20px"
                        type= { logoutobj.msg.length > 1 ? 'success' : logoutobj.msgOnErr.length > 1 ? 'error' : null }
                        onClose={setlogoutfalse} 
                        AutoHideDuration={5000}
                        MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
                        width="100%" fontColor='white' iconColor='white'/>

        </Modal>
      }
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
              <><p id="username-nav"> {isLoggedUserin.username ? isLoggedUserin.username : 'User'}
              </p><button onClick={Logout} id="logout-btn" >  Log out</button></>
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
