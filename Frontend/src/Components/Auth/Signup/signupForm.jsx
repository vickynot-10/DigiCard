import { useState } from "react";
import axios from "axios";
import "../Login/loginForm.css";
import Toaster from "../../Reusable_components/Toaster/toaster";
import Loader from "../../Reusable_components/Loader/loader";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useAuth } from "../../../Contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();
  const { setUserLoggedIn } = useAuth();
  const [userdetails, setUserdetails] = useState({
    mail: "",
    username: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [resData, setResData] = useState({
    isCreated: false,
    msg: "",
  });
  const [errobj, seterrobj] = useState({
    isErr: false,
    msg: "",
  });

  function savingDetails(e) {
    const { name, value } = e.target;
    setUserdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function seterrFalse() {
    seterrobj({
      isErr: false,
      msg: "",
    });
  }
  function setresfalse() {
    setResData({
      isCreated: false,
      msg: "",
    });
  }

  async function submittingForm(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userdetails.password || userdetails.password.trim() === "") {
        throw new Error("Password is required");
      }
      if ( !userdetails.username || userdetails.username.trim() === "") {
        throw new Error("Enter Your Username");
      }
      if ( !userdetails.mail || userdetails.mail.trim() === "") {
        throw new Error("Enter Your Mail");
      }
      if (userdetails.password.length < 8) {
        throw new Error("Password must have atleast 8 characters");
      }
      if (userdetails.password.length > 20) {
        throw new Error("Password should less than 20 characters");
      }

      let res = await axios.post(
        `${process.env.REACT_APP_URL}/signup`,
        userdetails,
        {
          withCredentials: true,
        }
      );
      if (!res) {
        throw new Error("An error occured Try Again");
      }
      if (res.data.isCreated === true) {
        seterrFalse();
        setResData({
          isCreated: true,
          msg: res.data.msg,
        });
        setUserLoggedIn({
          isLoggedIn: true,
          username: userdetails.username,
        });
        setTimeout(() => {
          navigate("/");
          navigate(0);
        }, [2000]);
      }
    } catch (e) {
      setresfalse();
      let errmsg = e.message || "An Error occured";
      if (e.response) {
        errmsg = e.response.data;
      }
      seterrobj({
        isErr: true,
        msg: errmsg,
      });
      setresfalse();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="loginform-container">
      <div id="loginform-div">
        <div id="loginForm-main">
          <form onSubmit={submittingForm}>
            <div id="loginform">
              <div id="login-header">
                <p> Create Your Account </p>
              </div>
              <div id="login-input-div">
                <label htmlFor="username-login"> User Name </label>
                <div>
                  <span>
                    <PersonOutlinedIcon />
                  </span>
                  <input
                    required
                    placeholder="Type Here"
                    type="text"
                    onChange={savingDetails}
                    id="username-login"
                    name="username"
                    value={userdetails.username}
                  />
                </div>
              </div>
              <div id="login-input-div">
                <label htmlFor="mail-login">Mail </label>
                <div>
                  <span>
                    <EmailOutlinedIcon />
                  </span>
                  <input
                    required
                    type="email"
                    placeholder="Type Here"
                    onChange={savingDetails}
                    id="mail-login"
                    name="mail"
                    value={userdetails.mail}
                  />
                </div>
              </div>
              <div id="login-input-div">
                <label htmlFor="password-login">Password </label>
                <div>
                  <span>
                    <HttpsOutlinedIcon />
                  </span>
                  <input
                    required
                    type="password"
                    placeholder="Type Here"
                    onChange={savingDetails}
                    id="password-login"
                    name="password"
                    value={userdetails.password}
                  />
                </div>
              </div>
              <div id="login-btn-submit">
                <button disabled={isLoading} type="submit">
                  {isLoading ? <Loader size={25} color="white" /> : "SIGN UP"}
                </button>
              </div>
              {errobj.isErr && (
                <Toaster
                  message={errobj.msg}
                  type="error"
                  onClose={seterrFalse}
                  AutoHideDuration={5000}
                  MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
                  width="100%"
                  fontColor="white"
                  iconColor="white"
                />
              )}
              {resData.isCreated && (
                <Toaster
                  message={resData.msg}
                  type="success"
                  onClose={setresfalse}
                  AutoHideDuration={5000}
                  MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
                  width="100%"
                  fontColor="white"
                  iconColor="white"
                />
              )}
              <div id="signup-text-div">
                <a href="/loginForm"> Already Have an account ? Login </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
