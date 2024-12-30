import "../EditDigiCardpage/editpage.css";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Reusable_components/Loader/loader";
import Toaster from "../Reusable_components/Toaster/toaster";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";

export default function EditUserCard() {
  const { isLoggedUserin } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const imgaddress = location.state;
  const [btnLoading, setBtnLoading] = useState(false);
  const [details, setDetails] = useState({logo : null});
  const [compname, setcompname] = useState("");
  const [editData, seteditdata] = useState({
    data: [],
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
          `${process.env.REACT_APP_URL}/editUser/${id}`,
          { withCredentials: true }
        );
        if (!res) {
          throw new Error("Error occured");
        }
        if (res.data.isFound === true) {
      

          seteditdata({
            isFound: true,
            data: res.data.data,
          });
          res.data.data.map((item) => setcompname(item.companyName));
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

  function redirectToweb() {
    navigate(`/showUser/${compname}/${id}`, {
      state: imgaddress === null ? "Didnt upload" : imgaddress,
    });
  }
  async function SubmitForm(e) {
    e.preventDefault();
    setBtnLoading(true);
    if ( details.logo === null && Object.keys(details).length <= 1 ) {
      setErr({
        isErr: true,
        msg: "No Changes made in details",
      });
      setBtnLoading(false);
      return;
    }
    let formdata = new FormData();
    for(let key in details){
      formdata.append(key , details[key])
    }
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_URL}/editUserDigi/${id}`,
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

  function setImg(e){
    let fileImg = e.target.files[0];
    setDetails((prev)=>({
      ...prev , logo : fileImg
    }))

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
          <form onSubmit={SubmitForm}>
            <div id="edit-page-main">
              {editData.data.length > 0 &&
                editData.data.map((item) => {
                  return (
                    <Fragment key={item._id}>
                      <div>
                        <label htmlFor="User_name">User Name</label>
                        <input
                          onChange={savingDetails}
                          type="text"
                          id="User_name"
                          value={
                            details["User_name"] !== undefined
                              ? details["User_name"]
                              : item.User_name
                          }
                          name="User_name"
                        />
                      </div>
                      <div>
                        <label htmlFor="User_role">User Role</label>
                        <input
                          type="text"
                          id="User_role"
                          onChange={savingDetails}
                          name="User_role"
                          value={
                            details["User_role"] !== undefined
                              ? details["User_role"]
                              : item.User_role
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="User_ID">User ID</label>
                        <input
                          type="text"
                          id="User_ID"
                          onChange={savingDetails}
                          value={
                            details["User_ID"] !== undefined
                              ? details["User_ID"]
                              : item.User_ID
                          }
                          name="User_ID"
                        />
                      </div>
                      <div>
                        <label htmlFor="user_branch">User Branch</label>
                        <input
                          type="text"
                          onChange={savingDetails}
                          id="user_branch"
                          name="user_branch"
                          value={
                            details["user_branch"] !== undefined
                              ? details["user_branch"]
                              : item.user_branch
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="User_mobile_number">
                          User Mobile Number
                        </label>
                        <input
                          type="text"
                          onChange={savingDetails}
                          id="User_mobile_number"
                          name="User_mobile_number"
                          value={
                            details["User_mobile_number"] !== undefined
                              ? details["User_mobile_number"]
                              : item.User_mobile_number
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="User_mail">User Mail</label>
                        <input
                          type="text"
                          name="User_mail"
                          id="User_mail"
                          onChange={savingDetails}
                          value={
                            details["User_mail"] !== undefined
                              ? details["User_mail"]
                              : item.User_mail
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="companyName">Company Name</label>
                        <input
                          type="text"
                          id="companyName"
                          onChange={savingDetails}
                          name="companyName"
                          value={
                            details["companyName"] !== undefined
                              ? details["companyName"]
                              : item.companyName
                          }
                        />
                      </div>

                      <div>
                        <label htmlFor="location">Location</label>
                        <input
                          type="text"
                          id="location"
                          onChange={savingDetails}
                          value={
                            details["location"] !== undefined
                              ? details["location"]
                              : item.location
                          }
                          name="location"
                        />
                      </div>
                      {isLoggedUserin.subscription === "premium" && (
                        <>
                          <div>
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input
                              type="text"
                              id="whatsapp"
                              onChange={savingDetails}
                              value={
                                details["whatsapp"] !== undefined
                                  ? details["whatsapp"]
                                  : item.whatsapp
                              }
                              name="whatsapp"
                            />
                          </div>
                          <div>
                            <label htmlFor="linkedin">LinkedIn</label>
                            <input
                              type="text"
                              id="linkedin"
                              onChange={savingDetails}
                              value={
                                details["linkedin"] !== undefined
                                  ? details["linkedin"]
                                  : item.linkedin
                              }
                              name="linkedin"
                            />
                          </div>
                          <div>
                            <label htmlFor="facebook">Facebook</label>
                            <input
                              type="text"
                              id="facebook"
                              onChange={savingDetails}
                              value={
                                details["facebook"] !== undefined
                                  ? details["facebook"]
                                  : item.facebook
                              }
                              name="facebook"
                            />
                          </div>
                          <div>
                            <label htmlFor="instagram">Instagram</label>
                            <input
                              type="text"
                              onChange={savingDetails}
                              id="instagram"
                              value={
                                details["instagram"] !== undefined
                                  ? details["instagram"]
                                  : item.instagram
                              }
                              name="instagram"
                            />
                          </div>
                          <div>
                            <label htmlFor="twitter">Twitter</label>
                            <input
                              type="text"
                              id="twitter"
                              onChange={savingDetails}
                              value={
                                details["twitter"] !== undefined
                                  ? details["twitter"]
                                  : item.twitter
                              }
                              name="twitter"
                            />
                          </div>
                          <div>
                            <label htmlFor="youtube">YouTube</label>
                            <input
                              type="text"
                              id="youtube"
                              onChange={savingDetails}
                              value={
                                details["youtube"] !== undefined
                                  ? details["youtube"]
                                  : item.youtube
                              }
                              name="youtube"
                            />
                          </div>
                          1
                        </>
                      )}
                    </Fragment>
                  );
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
              {btnLoading ? <Loader size={20} color="black" /> : "Submit"}
            </button>
            <button
              onClick={redirectToweb}
              style={{ backgroundColor: "transparent", border: "unset" }}
            >
              Click here to preview
            </button>
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
