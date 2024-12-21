import "../BasicPlanPage/basicPlanPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Reusable_components/Loader/loader";
import Toaster from "../Reusable_components/Toaster/toaster";
import { useParams } from "react-router-dom";

export default function AddNewUser() {
  const [isLoading, setLoading] = useState(false);
  const {companyName} = useParams();
  const [userDetails, setUserDetails] = useState({
    User_name: "",
    User_role: "",
    user_branch: "",
    User_mobile_number: "",
    User_mail: "",
    User_ID: "",
    location: "",
    whatsapp: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    companyName : "",
    youtube: "",
  });

  useEffect(()=>{
    if(companyName === null || !companyName){
      setUserDetails((prev)=>({
        ...prev , companyName : "personal"
      }))
      return;
    }
    setUserDetails((prev)=>({
      ...prev , companyName : companyName
    }))
  },[companyName])

  const [resdata, setResData] = useState({
    isOK: false,
    msg: "",
  });
  const [errobj, setErr] = useState({
    isErr: false,
    msg: "",
  });
  function savingDetails(e) {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function setErrfalse() {
    setErr({
      isErr: false,
      msg: "",
    });
  }
  function setResFalse() {
    setResData((prev) => ({
      ...prev,
      isOK: false,
    }));
  }
  async function submittingForm(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_URL}/addNewUser`,
        userDetails,
        {
          withCredentials: true,
        }
      );
      if(!res){
        throw new Error("Error Occured");
      }
      if (res.data.isAdded === true) {
        setResData({
          isOK: true,
          msg: res.data.msg
        });
        setErrfalse();
      }
    } catch (e) {
      let errMsg = e.message || "An error occured";

      if (e.response) {
        errMsg = e.response.data;
      }
      setErr({
        isErr: true,
        msg: errMsg,
      });
      setResFalse();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="basic-plan-page-container">
      <div id="basic-plan-page-div">
        <form onSubmit={submittingForm}>
          <div id="basic-plan-page-main">
            <div>
              <label htmlFor="username"> User Name </label>
              <input
                type="text"
                id="username"
                onChange={savingDetails}
                name="User_name"
                required
                value={userDetails.User_name}
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label htmlFor="role"> User Role </label>
              <input
                type="text"
                id="role"
                onChange={savingDetails}
                name="User_role"
                value={userDetails.User_role}
                placeholder="Enter Role"
              />
            </div>
            <div>
              <label htmlFor="role"> User Branch </label>
              <input
                type="text"
                id="role"
                onChange={savingDetails}
                name="user_branch"
                value={userDetails.user_branch}
                placeholder="Enter Branch"
              />
            </div>
            <div>
              <label htmlFor="role"> User ID Number </label>
              <input
                type="text"
                id="role"
                onChange={savingDetails}
                name="User_ID"
                value={userDetails.User_ID}
                placeholder="Enter ID"
              />
            </div>
            <div>
              <label htmlFor="usernumber"> Mobile Number : </label>
              <input
                required
                type="text"
                id="usernumber"
                name="User_mobile_number"
                onChange={savingDetails}
                value={userDetails.User_mobile_number}
                placeholder="Enter Mobile Number"
              />
            </div>

            <div>
              <label htmlFor="userwhatsapp"> Whatsapp : </label>
              <input
                type="text"
                id="userwhatsapp"
                name="whatsappnum"
                onChange={savingDetails}
                value={userDetails.whatsapp}
                placeholder="Enter Whatsapp Number"
              />
            </div>

            <div>
              <label htmlFor="location"> Location : </label>
              <input
                type="text"
                id="location"
                name="location"
                value={userDetails.location}
                onChange={savingDetails}
                placeholder="Enter Location"
              />
            </div>
            <div>
              <label htmlFor="mail"> Mail : </label>
              <input
                type="email"
                id="mail"
                name="User_mail"
                value={userDetails.User_mail}
                placeholder="Enter E-mail"
                onChange={savingDetails}
              />
            </div>

            <div>
              <label htmlFor="linkedin"> LinkedIn Link : </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={userDetails.linkedin}
                placeholder="Enter LinkedIn Profile Link"
                onChange={savingDetails}
              />
            </div>
            <div>
              <label htmlFor="facebook"> Facebook Link : </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={userDetails.facebook}
                placeholder="Enter Facebook Profile Link"
                onChange={savingDetails}
              />
            </div>

            <div>
              <label htmlFor="twitter"> Twitter Link : </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={userDetails.twitter}
                placeholder="Enter Twitter Profile Link"
                onChange={savingDetails}
              />
            </div>

            <div>
              <label htmlFor="youtube"> Youtube Link : </label>
              <input
                type="text"
                id="youtube"
                name="youtube"
                value={userDetails.youtube}
                placeholder="Enter Youtube Profile Link"
                onChange={savingDetails}
              />
            </div>

            <div>
              <label htmlFor="instagram"> Instagram Link : </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={userDetails.instagram}
                placeholder="Enter Instagram Link"
                onChange={savingDetails}
              />
            </div>
          </div>
          <button type="submit" id="submit-btn-bpp" disabled={isLoading}>
            {isLoading ? <Loader size={20} color="#fff" /> : "Submit"}
          </button>
        </form>
      </div>
      {errobj.isErr && (
              <Toaster
                type="error"
                minwidthToaster="100px"
                message={errobj.msg}
                height="40px"
                onClose={setErrfalse}
              />
            )}
            {resdata.isOK && (
              <Toaster
                type="success"
                minwidthToaster="100px"
                message={resdata.msg}
                height="40px"
                onClose={setResFalse}
              />
            )}
    </div>
  );
}
