import "./basicPlanPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Reusable_components/Loader/loader";
import Toaster from "../Reusable_components/Toaster/toaster";
import { useNavigate, useLocation } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

export default function BasicplanPage() {
  const location = useLocation();
  const [isChecked, setCheck] = useState(true);
  const plan_type = location.state;

  const [details, setDetails] = useState({
    personName: "",
    mobile: "",
    whatsappnum: "",
    location: "",
    mail: "",
    webLink: "",
    logo: null,
    companyname: "",
    plan: "",
    role: "",
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

  useEffect(() => {
    setTimeout(() => {
      if (plan_type === "basic") {
        setDetails((prev) => ({
          ...prev,
          plan: "basic",
        }));
        return;
      }
      if (plan_type === null || plan_type === undefined) {
        navigate("/create-card");
      }
    }, 5000);
  }, []);

  function changingToggleValues(e) {
    if (e.target.checked) {
      setCheck(true);
      return;
    }
    setCheck(false);
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
            <div>
              <input
                type="text"
                id="companyname"
                className={details.companyname ? "filled" : ""}
                required
                onChange={savingDetails}
                name="companyname"
                value={details.companyname}
              />
              <label htmlFor="companyname">
                {isChecked ? "Company Name" : "Name"}
              </label>
            </div>

            <div>
              <input
                type="text"
                className={details.personName ? "filled" : ""}
                id="clientname"
                required={isChecked}
                onChange={savingDetails}
                name="personName"
                value={details.personName}
              />
              <label htmlFor="clientname">
                {isChecked ? "Name" : "About in 1 line"}
              </label>
            </div>

            <div>
              <input
                type="text"
                id="role"
                className={details.role ? "filled" : ""}
                onChange={savingDetails}
                name="role"
                value={details.role}
              />
              <label htmlFor="role">Role </label>
            </div>

            <div>
              <input
                type="number"
                required
                id="clientnumber"
                name="mobile"
                onChange={savingDetails}
                value={details.mobile}
                className={details.mobile ? "filled" : ""}
              />
              <label htmlFor="clientnumber"> Mobile Number </label>
            </div>

            <div>
              <input
                type="text"
                id="clientwhatsapp"
                name="whatsappnum"
                onChange={savingDetails}
                value={details.whatsappnum}
                className={details.whatsappnum ? "filled" : ""}
              />
              <label htmlFor="clientwhatsapp"> Whatsapp </label>
            </div>

            <div>
              <input
                type="text"
                id="location"
                name="location"
                value={details.location}
                onChange={savingDetails}
                className={details.location ? "filled" : ""}
              />
              <label htmlFor="location"> Location </label>
            </div>
            <div>
              <input
                type="email"
                id="mail"
                name="mail"
                value={details.mail}
                className={details.mail ? "filled" : ""}
                onChange={savingDetails}
              />
              <label htmlFor="mail"> Mail </label>
            </div>

            <div>
              <input
                type="text"
                id="weblink"
                name="webLink"
                value={details.webLink}
                className={details.webLink ? "filled" : ""}
                onChange={savingDetails}
              />
              <label htmlFor="weblink"> Website Link</label>
            </div>

            <div className="file-upload-div">
              <p id="file-upload-text-desc">
                Only accepts svg,png,jpg,jpeg,webp and Try upload an Transparent
                background
              </p>
              <div id="file-btn-div">
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
