import "../BasicPlanPage/basicPlanPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Reusable_components/Loader/loader";
import Toaster from "../Reusable_components/Toaster/toaster";
import { useNavigate, useLocation } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

export default function PremiumPlanPage() {
  const location = useLocation();
  const plan_type = location.state;
  const [isChecked, setCheck] = useState(true);
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
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    personal: false,
    company: true,
    plan: "",
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
  useEffect(() => {
    if (resdata.Userid !== null) {
      redirectToWeb();
    }
  }, [resdata.Userid]);
  const navigate = useNavigate();

  function savingDetails(e) {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function changingToggleValues(e) {
    if (e.target.checked) {
      setCheck(true);
      setDetails((prev) => ({
        ...prev,
        company: true,
        personal: false,
      }));
      return;
    }
    setCheck(false);
    setDetails((prev) => ({
      ...prev,
      company: false,
      personal: true,
    }));
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
    setResData((prev) => ({
      ...prev,
      isOK: false,
    }));
  }

  function redirectToWeb() {
    if (details.companyname.trim() === "" && isChecked === false) {
      navigate(`/getDigi/personal/${resdata.Userid}`);
      return;
    }
    navigate(`/getDigi/${details.companyname}/${resdata.Userid}`);
  }
  useEffect(() => {
    setTimeout(() => {
      if (plan_type === "premium") {
        setDetails((prev) => ({
          ...prev,
          plan: "premium",
        }));
        return;
      }
      if (plan_type === null || plan_type === undefined) {
        navigate("/create-card");
      }
    }, 5000);
  }, []);

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
            <span> Yes </span>
            <Switch
              defaultChecked
              onChange={changingToggleValues}
              aria-label="switch-box"
            />
            <span> No </span>
          </div>
        </div>

        <form onSubmit={SubmitForm} encType="multipart/form-data">
          <div id="basic-plan-page-main">
            <div id="section-div">
              <p className="section-header">
                
                {isChecked ? "Company Details" : "Personal Details"}
              </p>

              <div id="input-boxes-arrange-div">
                <div>
                  <label htmlFor="companyname">
                    {isChecked ? "Company Name" : "Name"}
                  </label>
                  <input
                    type="text"
                    id="companyname"
                    onChange={savingDetails}
                    name="companyname"
                    required
                    value={details.companyname}
                  />
                </div>

                <div>
                  <label htmlFor="clientname">
                    {isChecked ? "Founder / CEO" : "About"}
                  </label>
                  <input
                    type="text"
                    id="clientname"
                    required={isChecked}
                    onChange={savingDetails}
                    name="personName"
                    value={details.personName}
                  />
                </div>

                <div>
                  <label htmlFor="role">Role </label>
                  <input
                    type="text"
                    id="role"
                    onChange={savingDetails}
                    name="role"
                    value={details.role}
                  />
                </div>
              </div>

              <div id="single-row-input-div">
                <label htmlFor="location"> Location </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={details.location}
                  onChange={savingDetails}
                />
              </div>

              <div id="input-2boxes-arrange-div">
                <div>
                  <label htmlFor="weblink"> Website Link</label>
                  <input
                    type="text"
                    id="weblink"
                    name="webLink"
                    value={details.webLink}
                    onChange={savingDetails}
                  />
                </div>
                <div className="file-upload-div">
                  <p id="file-upload-text-desc">
                    {details.logo &&
                    details.logo.name &&
                    details.logo.name.trim() !== ""
                      ? `${details.logo.name} selected`
                      : " Only accepts svg,png,jpg,jpeg,webp and Try upload an Transparent background"}
                  </p>
                  <div
                    style={{
                      width: "120px",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "row",
                      border: "1px solid #ccc",
                    }}
                  >
                    <input
                      type="file"
                      id="imgupload"
                      name="logo"
                      accept=".svg, .png, .jpg, .jpeg, .webp"
                      onChange={setImg}
                    />
                    <FileUploadOutlinedIcon
                      sx={{
                        color: "#1F51FF",
                        margin: "0 4px",
                        fontSize: {
                          xs: "15px",
                          sm: "15px",
                          md: "18px",
                          lg: "20px",
                          xl: "20px",
                        },
                      }}
                    />
                    <label
                      htmlFor="imgupload"
                      style={{
                        position: "static",
                        cursor: "pointer",
                        fontSize: "clamp(0.80rem,0.90rem,1rem)",
                      }}
                    >
                      Upload Logo
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div id="section-div">
              <p className="section-header">Contact Details</p>
              <div id="input-boxes-arrange-div">
                <div>
                  <label htmlFor="mail"> Mail </label>
                  <input
                    type="email"
                    id="mail"
                    name="mail"
                    value={details.mail}
                    onChange={savingDetails}
                  />
                </div>

                <div>
                  <label htmlFor="clientnumber"> Mobile Number </label>
                  <input
                    required
                    type="text"
                    id="clientnumber"
                    name="mobile"
                    onChange={savingDetails}
                    value={details.mobile}
                  />
                </div>

                <div>
                  <label htmlFor="clientwhatsapp"> Whatsapp </label>
                  <input
                    type="text"
                    id="clientwhatsapp"
                    name="whatsappnum"
                    onChange={savingDetails}
                    value={details.whatsappnum}
                  />
                </div>
              </div>
            </div>

            <div id="section-div">
              <p className="section-header">Social Links</p>
              <div id="input-boxes-arrange-div">
                <div>
                  <label htmlFor="linkedin"> LinkedIn Link </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={details.linkedin}
                    onChange={savingDetails}
                  />
                </div>
                <div>
                  <label htmlFor="facebook"> Facebook Link </label>
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={details.facebook}
                    onChange={savingDetails}
                  />
                </div>

                <div>
                  <label htmlFor="twitter"> Twitter Link </label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={details.twitter}
                    onChange={savingDetails}
                  />
                </div>
              </div>
              <div id="input-2boxes-arrange-div">
                <div>
                  <label htmlFor="youtube"> Youtube Link </label>
                  <input
                    type="text"
                    id="youtube"
                    name="youtube"
                    value={details.youtube}
                    onChange={savingDetails}
                  />
                </div>

                <div>
                  <label htmlFor="instagram"> Instagram Link </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={details.instagram}
                    onChange={savingDetails}
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" id="submit-btn-bpp" disabled={isLoading}>
            {isLoading ? <Loader size={20} color="black" /> : "Submit"}
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
