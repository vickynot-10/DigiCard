import "./basicsubscribe.css";
import { useAuth } from "../../../Contexts/authContext";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import CloseIcon from "@mui/icons-material/Close";
import { AssestsObj } from "../../../Assests/assests.js";
import Loader from "../../Reusable_components/Loader/loader.jsx";
import Toaster from "../../Reusable_components/Toaster/toaster.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
export default function BasicSubscribed() {
  const navigate = useNavigate();
  const { isLoggedUserin } = useAuth();
  const [isLoading, setloading] = useState(true);
  const [resData, setResData] = useState({
    isFound: false,
    membersArr: [],
    digiCard: [],
  });
  const [errobj, setErrobj] = useState({
    isErr: false,
    msg: "",
  });
  function redirect() {
    if (isLoggedUserin.cardsArrLength < 5) {
      navigate("/basic-plan", {
        state: "basic",
      });
      return;
    }
  }

  function redirectDigi(urltype, compname, str) {
    let url = `${compname}/${str}`.trim();
    if (urltype === "user") {
      navigate(`/showUser/${url}`);
      return;
    }
    if (urltype === "company") {
      navigate(`/getDigi/${url}`);
      return;
    }
  }

  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await axios.get(`${process.env.REACT_APP_URL}/all-cards`, {
          withCredentials: true,
        });
        if (!res) {
          throw new Error("Error occured , Login and try again");
        }
        if (res.data.isFound === true) {
          setErrobj({ isErr: false, msg: "" });
          setResData({
            isFound: true,
            digiCard: res.data.data.digi,
            membersArr: res.data.data.membersdigi,
          });
        }
      } catch (e) {
        let errmsg = e.message || "An error occured";
        if (e.response) {
          errmsg = e.response.data;
        }
        setErrobj({
          isErr: true,
          msg: errmsg,
        });
      } finally {
        setloading(false);
      }
    }
    fetchdata();
  }, []);
  let count = 0
  resData.membersArr.forEach((item)=>{
    item.members.forEach((val)=>{
      count = count +1
    })
  })
  return (
    <div id="already-subscribed-main-container">
      <div
        id="already-subscribed-container"
        onClick={redirect}
        className={
          isLoggedUserin.cardsArrLength < 5
            ? "limit-not-reached-div"
            : "limit-reached-div"
        }
      >
        <div id="as-div1">
          <p id="plan-header">basic plan</p>
          <p id="card-number-length">
            cards created {resData.digiCard.length + count} of 5
          </p>
        </div>
        <div id="as-div2">
          {isLoggedUserin.cardsArrLength < 5 && (
            <button>
              
              {isLoggedUserin.cardsArrLength < 5 ? (
                <EastIcon />
              ) : (
                <CloseIcon />
              )}
            </button>
          )}
        </div>
      </div>

      {isLoading && <Loader size={80} loaderMargin="60px 0" />}

      {resData.isFound &&
        (resData.digiCard.length > 0 || resData.membersArr.length > 0) && (
          <div id="userscard-shows-div">
            <p id="current-digicard-header-txt"> Current digicards </p>
            <div id="cards-boxes-div">
              {resData.digiCard.length > 0 &&
                resData.digiCard.map((item) => {
                  return (
                    <div
                      key={item._id}
                      id="sep-card-detail-show"
                      onClick={() =>
                        redirectDigi("company", item.Companyname, item._id)
                      }
                    >
                      <img
                        src={`${process.env.REACT_APP_URL}/imgs${item.img}`}
                        onError={(e) => {
                          e.currentTarget.src = AssestsObj.User;
                          e.currentTarget.onerror = null;
                        }}
                      />
                      <div id="company-name-at-card">
                        <p> {item.Companyname} </p>
                      </div>
                    </div>
                  );
                })}
              {resData.membersArr.length > 0 &&
                resData.membersArr.map((val) => {
                  return val.members.map((item) => {
                    return (
                      <div
                        key={item._id}
                        id="sep-card-detail-show"
                        onClick={() =>
                          redirectDigi("user", item.companyName, item._id)
                        }
                      >
                        <img
                          src={`${process.env.REACT_APP_URL}/imgs${item.img}`}
                          onError={(e) => {
                            e.currentTarget.src = AssestsObj.User;
                            e.currentTarget.onerror = null;
                          }}
                        />
                        <div id="company-name-at-card">
                          <p> {item.User_name} </p>
                        </div>
                      </div>
                    );
                  });
                })}
            </div>
          </div>
        )}

      {resData.isFound &&
        (resData.digiCard.length === 0 || resData.membersArr.length === 0) &&
        null}

      {errobj.isErr && (
        <Toaster
          message={errobj.msg}
          type="error"
          onClose={() => setErrobj({ isErr: false, msg: "" })}
          AutoHideDuration={5000}
          MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
          width="100%"
          fontColor="white"
          iconColor="white"
        />
      )}
    </div>
  );
}
