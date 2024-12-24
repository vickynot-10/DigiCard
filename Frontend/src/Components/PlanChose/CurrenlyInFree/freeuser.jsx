import "../BasicSubscribed/basicsubscribe.css";
import { useAuth } from "../../../Contexts/authContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Reusable_components/Loader/loader";
import { AssestsObj } from "../../../Assests/assests.js";
import Toaster from "../../Reusable_components/Toaster/toaster";
export default function FreeUser() {
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await axios.get(`${process.env.REACT_APP_URL}/all-cards`, {
          withCredentials: true,
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
    fetchdata();
  }, []);

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
  return (
    <div id="already-subscribed-main-container">
      <div
        id="already-subscribed-container"
        className={
          isLoggedUserin.cardsArrLength < 1
            ? "limit-not-reached-div"
            : "limit-reached-div"
        }
      >
        <div id="as-div1">
          <p id="plan-header">free plan</p>
          <p id="card-number-length">
            cards created {isLoggedUserin.cardsArrLength} of 1
          </p>
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
