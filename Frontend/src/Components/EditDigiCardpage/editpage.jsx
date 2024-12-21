import "./editpage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Reusable_components/Loader/loader";
import Toaster from "../Reusable_components/Toaster/toaster";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
  const { id, companyName } = useParams();
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const [details, setDetails] = useState({ logo: null });
  const [compname, setcompname] = useState("");
  const [editData, seteditdata] = useState({
    data: {},
    isFound: false,
  });
  const [errobjEdit, setErrobjEdit] = useState({
    isErr: false,
    msg: " ",
  });

  const [isLoading, setLoading] = useState(true);

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
    setDetails((prev) => ({
      ...prev,
      [name]: value,
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

  useEffect(() => {
    setLoading(true);
    if (id === null || !id || id === "null") {
      setErrobjEdit({
        isErr: true,
        msg: "Error occured Try again",
      });
      return;
    }
    async function fetchData() {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_URL}/getDigi/${companyName}/${id}`,{
            withCredentials : true
          }
        );
        if (res.data.isfound === true) {
          seteditdata({
            isFound: true,
            data: res.data.data1,
            userid: res.data.data1._id,
          });
          setcompname(res.data.data1.Companyname);
          setDetails((prev) => ({
            ...prev,
            Companyname: res.data.data1.Companyname,
          }));
        }
      } catch (e) {
        let errMsg = e.message || "An error occured";

        if (e.response) {
          errMsg = e.response.data;
        }
        setErrobjEdit({
          isErr: true,
          msg: errMsg,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  async function SubmitForm(e) {
    e.preventDefault();
    setBtnLoading(true);
    if (details.logo === null && Object.keys(details).length === 2) {
      setBtnLoading(false);
      setErr({
        isErr: true,
        msg: "No Edit is Done",
      });
      return;
    }
    let formdata = new FormData();
    for (const key in details) {
      formdata.append(key, details[key]);
    }
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_URL}/editDigiDetails/${companyName}/${id}`,
        formdata,
        {
          withCredentials: true,
        }
      );

      if (res.data.isEdited === true) {
        setResData({
          isOK: true,
          msg: res.data.msg,
        });
        setcompname(details.Companyname);
        navigate(`/editDigi/${details.Companyname}/${id}`);
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
      setBtnLoading(false);
    }
  }

  return (
    <div id="edit-page-container">
      {isLoading && <Loader size={80} />}
      {errobjEdit.isErr && (
        <Toaster
          type="error"
          minwidthToaster="100px"
          message={errobjEdit.msg}
          height="40px"
          onClose={() => setErrobjEdit({ msg: "", isErr: false })}
        />
      )}
      {editData.isFound && (
        <div id="edit-page-div">
          {!editData.data.img.startsWith("Didnt") && (
            <img
              src={`${process.env.REACT_APP_URL}/imgs${editData.data.img}`}
              alt="picture"
            />
          )}

          <form onSubmit={SubmitForm} encType="multipart/form-data">
            <div id="edit-page-main">
              {Object.entries(editData.data).map(([key, val]) => {
                if (key === "_id" || key === "__v" || key === 'members') {
                  return null;
                }
                if (key !== "img") {
                  return (
                    <div key={key}>
                      <label htmlFor={key}>
                        
                        {key === "Companyname"
                          ? "Company Name / Personal Name"
                          : key === "name"
                          ? "User name / About"
                          : key}
                        :
                      </label>
                      <input
                        type="text"
                        id={key}
                        onChange={savingDetails}
                        name={key}
                        value={details[key] !== undefined ? details[key] : val}
                        placeholder={`Enter ${key}`}
                      />
                    </div>
                  );
                }
              })}
              <div>
                <label htmlFor="imgupload" style={{ marginBottom: "5px" }}>
                  Upload New Logo
                </label>
                <p>
                  
                  Only accepts svg,png,jpg,jpeg,webp and Try upload an
                  Transparent background
                </p>
                <input
                  type="file"
                  id="imgupload"
                  name="logo"
                  accept=".svg, .png, .jpg, .jpeg, .webp"
                  onChange={setImg}
                />
              </div>
            </div>
            <button type="submit" id="submit-btn-bpp" disabled={btnLoading}>
              {btnLoading ? <Loader size={20} color="#fff" /> : "Submit"}
            </button>

            <a
              id="preview-tag-link"
              href={`/getDigi/${compname}/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              
              Click here to preview
            </a>
          </form>
        </div>
      )}

      {errobj.isErr && (
        <Toaster
          AutoHideDuration={5000}
          type="error"
          minwidthToaster="100px"
          message={errobj.msg}
          height="40px"
          onClose={setErrfalse}
        />
      )}
      {resdata.isOK && (
        <Toaster
          AutoHideDuration={5000}
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
