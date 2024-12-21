import '../BasicPlanPage/basicPlanPage.css'
import { useState,useEffect } from "react";
import axios from "axios";
import Loader from '../Reusable_components/Loader/loader';
import Toaster from '../Reusable_components/Toaster/toaster';
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';


export default function PremiumPlanPage() {
 
  const [isChecked,setCheck] =useState(true)
  const [details, setDetails] = useState({
    personName: "",
    mobile: "",
    whatsappnum: "",
    location: "",
    mail: "",
    webLink: "",
    logo: null,
    companyname: "",
    role: "",
    linkedin : "",
    facebook : "",
    instagram : "",
    twitter : "",
    youtube : "",
    personal : false,
    company : true
    
  });
  const [isLoading, setLoading] = useState(false);
  const [resdata, setResData] = useState({
    isOK: false,
    msg: "",
    Userid: null,
  });
  const [errobj, setErr] = useState({
    isErr: false,
    msg: "",
  });
  useEffect(()=>{
    if(resdata.Userid !== null ){
        redirectToWeb()
    }
},[resdata.Userid])
  const navigate = useNavigate();

  function savingDetails(e) {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function changingToggleValues(e){
    if(e.target.checked){
      setCheck(true)
      setDetails((prev)=>({
        ...prev ,
        company : true , personal : false
      }))
      return
    }
    setCheck(false)
    setDetails((prev)=>({
      ...prev ,
      company : false , personal : true
    }))
  }
  function setImg(e) {
    const fileImg = e.target.files[0];
    setDetails((prev) => ({
      ...prev,
      logo: fileImg,
    }));
  }

  function setErrfalse() {
    setErr({
      isErr: false,
      msg: "",
    });
  }
  function setResFalse() {
    setResData((prev)=>({
        ...prev , isOK : false
    }))
  }

  function redirectToWeb() {
    console.log("btn clicks")
    if(details.companyname.trim() === '' && isChecked === false ){
      navigate(`/getDigi/personal/${resdata.Userid}`);
      return
    }
    navigate(`/getDigi/${details.companyname}/${resdata.Userid}`);
    
  }

  async function SubmitForm(e) {
    e.preventDefault();
    setLoading(true);
    let formdata = new FormData();
    for (const key in details) {
      formdata.append(key, details[key]);
    }
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_URL}/saveDigi`,
        formdata,
        {
          withCredentials: true,
        }
      );
      if (res.data.isDone === true) {
        setResData({
          isOK: true,
          msg: res.data.msg,
          Userid: res.data.id,
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
        <div id="switch-box-row">
                  <p> For Company : </p>
                  <div>
                <span> Yes </span> <Switch defaultChecked onChange={changingToggleValues} aria-label="switch-box" /> <span> No </span>
                </div>
                </div>
        <form onSubmit={SubmitForm} encType="multipart/form-data">
          <div id="basic-plan-page-main">
          <div>
              <label htmlFor="companyname"> {isChecked ? "Company Name :" : "Name :" } </label>
              <input
                type="text"
                id="companyname"
                onChange={savingDetails}
                name="companyname"
                // required
                value={details.companyname}
                placeholder={isChecked ? "Enter Company Name" : "Enter Name"}
              />
            </div>
            <div>
              <label htmlFor="clientname"> {isChecked ? " Name :" : "About in 1 line :" } </label>
              <input
                type="text"
                id="clientname"
                // required = {isChecked}
                onChange={savingDetails}
                name="personName"
                value={details.personName}
                placeholder={isChecked ? "Enter person Name" : "Enter About"}
              />
            </div>
            <div>
              <label htmlFor="role">Role : </label>
              <input
                type="text"
                id="role"
                onChange={savingDetails}
                name="role"
                value={details.role}
                placeholder="Enter Role"
              />
            </div>

            <div>
              <label htmlFor="clientnumber"> Mobile Number : </label>
              <input
              required
                type="text"
                id="clientnumber"
                name="mobile"
                onChange={savingDetails}
                value={details.mobile}
                placeholder="Enter Mobile Number"
              />
            </div>

            <div>
              <label htmlFor="clientwhatsapp"> Whatsapp : </label>
              <input
                type="text"
                id="clientwhatsapp"
                name="whatsappnum"
                onChange={savingDetails}
                value={details.whatsappnum}
                placeholder="Enter Whatsapp Number"
              />
            </div>

            <div>
              <label htmlFor="location"> Location : </label>
              <input
                type="text"
                id="location"
                name="location"
                value={details.location}
                onChange={savingDetails}
                placeholder="Enter Location"
              />
            </div>
            <div>
              <label htmlFor="mail"> Mail : </label>
              <input
                type="email"
                id="mail"
                name="mail"
                value={details.mail}
                placeholder="Enter E-mail"
                onChange={savingDetails}
              />
            </div>

            <div>
              <label htmlFor="weblink"> Website Link : </label>
              <input
                type="text"
                id="weblink"
                name="weblink"
                value={details.weblink}
                placeholder="Enter Web Page Link"
                onChange={savingDetails}
              />
            </div>

            <div>
              <label htmlFor="linkedin"> LinkedIn Link : </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={details.linkedin}
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
                value={details.facebook}
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
                value={details.twitter}
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
                value={details.youtube}
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
                value={details.instagram}
                placeholder="Enter Instagram Link"
                onChange={savingDetails}
              />
            </div>

            <div>
              <label htmlFor="imgupload" style={{ marginBottom:'5px' }}> Logo </label>
              <p> Only accepts svg,png,jpg,jpeg,webp and Try upload an Transparent background </p>
              <input type="file" id="imgupload" name="logo" accept=".svg, .png, .jpg, .jpeg, .webp" onChange={setImg} />
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
