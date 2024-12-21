import '../BasicPlanPage/BasicplanDisplayCard/basicplandisplay.css'
import { useEffect, useState, useRef } from "react";
import { useParams , useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { AssestsObj } from "../../Assests/assests.js"


import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import html2canvas from "html2canvas";
import YouTubeIcon from '@mui/icons-material/YouTube';



export default function DisplayUserDigi() {
  const divCapture = useRef(null);
  const location = useLocation();
  const navigate = useNavigate()
  const imgaddress = location.state
  const [resData, setResData] = useState({
    data: {},
    isFound: false,
  });
  const [whatsappnum, setWhatappnum] = useState("");
  const { id , companyName } = useParams();
  const [errobj, seterrobj] = useState({
    iserr: false,
    msg: "",
  });
  const [errobjRes, setErrobjRes] = useState({
    isErr: false,
    msg: "",
  });

  function ErrorFalse() {
    setErrobjRes({
      isErr: false,
      msg: "",
    });
  }

  function setResFalse() {
    setResData((prev) => ({
      ...prev,
      isFound: false,
    }));
  }

  async function generateImg() {
    if (divCapture.current === null) {
      return;
    }
    try {
      const canvas = await html2canvas(divCapture.current, {
        useCORS: true,
      });
      const img = canvas.toDataURL("img/png");
      let link = document.createElement("a");
      link.href = img;
      link.download = `digicard-${resData.data.User_name}.png`;
      link.click();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {

    if (id === null || !id || id === "null") {
      seterrobj({
        iserr: true,
        msg: "Error occured Please Try again",
      });
      return;
    }
    async function fetchData() {
      try {
        let res = await axios.get(`${process.env.REACT_APP_URL}/showUser/${companyName}/${id}`,{
          withCredentials : true
        });
        if(!res){
          throw new Error("Error occured")
        }
        if (res.data.isFound === true) {
          setResData({
            isFound: true,
            data: res.data.data,
          });
          ErrorFalse();
        }
      } catch (e) {
        let errMsg = e.message || "An error occured";

        if (e.response) {
          errMsg = e.response.data;
        }
        setErrobjRes({
          isErr: true,
          msg: errMsg,
        });
        setResFalse();
      }
    }
    fetchData();
  }, [id]);


  function savingWhatsappNum(e) {
    setWhatappnum(e.target.value);
  }

  function redirectToweb(){
    navigate(`/editUser/${id}`, {
      state : imgaddress === null ?  "Didnt upload" : imgaddress
    })
  }

  return (
    <div id="bp-comp-container">
      <div id="bp-cmp-div">
        <div id="bp-comp-main">
          {resData.isFound && (
            <div id="bp-comp-contents" ref={divCapture}>
              <div id="bp-section1-page">
                {( imgaddress && !imgaddress.startsWith("Didnt") && imgaddress !== undefined && imgaddress !== null) && (
                  
                  <div id="bp-logo-div">
                    <picture>
                      <source type="image/webp" srcSet={`${process.env.REACT_APP_URL}/imgs${imgaddress}`} />
                      <img
                      src={`${process.env.REACT_APP_URL}/imgs${imgaddress}`}
                      alt="company-logo"
                    />
                    </picture>
                   
                  </div>
                )}
                <div id="bp-contents-div-user">
                  {resData.data.User_name?.trim() !== "" && (
                    <p id="company-name-bp">
                      {resData.data.User_name }
                    </p>
                  )}
                  {resData.data.user_branch?.trim() !== ""  && (
                    <p id="user-name-bp">{resData.data.user_branch}</p> 
                  )}
                  {resData.data.User_role?.trim() !== "" && (
                    <p id="userRole-bp">{resData.data.User_role}</p>
                  )}
                </div>
              </div>

              <div id="bp-social-link-section">
                {resData.data.User_mobile_number?.trim() !== "" && (
                  <div id="sep-icon-div">
                    <a
                      href={`tel:${resData.data.User_mobile_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button aria-label="call">
                        <CallIcon sx={{
                          fontSize:'38px'
                        }} />
                      </button>
                    </a>
                    
                  </div>
                )}
                {resData.data.whatsapp?.trim() !== "" && (
                 
                  <div id="sep-icon-div">
                    <a
                      href={`https://wa.me/91${resData.data.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        <button aria-label="whatsapp">
                        <img src={AssestsObj.whatsappIcon} alt="whatsapp" />
                        </button>
                    </a>
                 
                  </div>
                )}

                {resData.data.mail?.trim() !== "" && (
                  <div id="sep-icon-div">
                    <a
                      href={`mailto:${resData.data.mail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button aria-label="email">
                        <img src={AssestsObj.mailIcon} alt="mail" />
                      </button>
                    </a>
                    
                  </div>
                )}
                {resData.data.location?.trim() !== "" && (
                  <div id="sep-icon-div">
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        resData.data.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button aria-label="location">
                        <img src={AssestsObj.mapIcon} alt="location" />
                      </button>
                    </a>
              
                  </div>
                )}
              </div>

              <div id="bp-social-link-description" data-html2canvas-ignore="true" >
                {resData.data.User_mobile_number?.trim() !== "" && (
                  <div id="sep-icon-div-col">
                    <a
                      href={`tel:${resData.data.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button aria-label="call">
                        <CallIcon />
                      </button>
                    </a>
                    <p> {resData.data.phone} </p>
                  </div>
                )}

                {resData.data.whatsapp?.trim() !== "" && (
                  <div id="sep-icon-div-col">
                    <a
                      href={`https://wa.me/91${resData.data.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button aria-label="whatsapp">
                        <WhatsAppIcon />
                      </button>
                    </a>
                    <p> {resData.data.whatsapp} </p>
                  </div>
                )}

                {resData.data.User_mail?.trim() !== "" && (
                  <div id="sep-icon-div-col">
                    <a
                      href={`mailto:${resData.data.User_mail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button aria-label="mail">
                        <EmailIcon />
                      </button>
                    </a>
                    <p> {resData.data.User_mail} </p>
                  </div>
                )}

                {resData.data.location?.trim() !== "" && (
                  <div id="sep-icon-div-col">
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        resData.data.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button aria-label="location">
                        <PlaceIcon />
                      </button>
                    </a>
                    <p> {resData.data.location} </p>
                  </div>
                )}

                <div id="website-share" data-html2canvas-ignore="true">
                  <input
                    type="number"
                    value={whatsappnum}
                    onChange={savingWhatsappNum}
                    placeholder="Enter Whatsapp number"
                  />
                  <a
                    href={`https://wa.me/91${whatsappnum}?text=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button  aria-label="share-on-whatsapp">  <WhatsAppIcon sx={{
                      
                    }} /> Share on Whatsapp </button>
                  </a>
                </div>

                <div id="premium-social-links">
                  {resData.data.linkedin !== undefined &&
                    resData.data.linkedin?.trim() !== "" && (
                      <div>
                        <a
                          href={`https://www.linkedin.com/in/${resData.data.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="linkedin" id="linkedin-btn" >
                            <LinkedInIcon />
                          </button>
                        </a>
                      </div>
                    )}

                  {resData.data.facebook !== undefined &&
                    resData.data.facebook?.trim() !== "" && (
                      <div>
                        <a
                          href={`https://www.facebook.com/${resData.data.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="facebook" id="fb-btn">
                            <FacebookOutlinedIcon />
                          </button>
                        </a>
                      </div>
                    )}

                  {resData.data.instagram !== undefined &&
                    resData.data.instagram?.trim() !== "" && (
                      <div>
                        <a
                          href={`https://www.instagram.co/${resData.data.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="instagram" id="insta-btn">
                            <InstagramIcon />
                          </button>
                        </a>
                      </div>
                    )}

                  {resData.data.twitter !== undefined &&
                    resData.data.twitter?.trim() !== "" && (
                      <div>
                        <a
                          href={`https://x.com/in/${resData.data.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="twitter/X" id="twitter-btn">
                            <TwitterIcon />
                          </button>
                        </a>
                      </div>
                    )}
                 {resData.data.youtube !== undefined &&
                    resData.data.youtube?.trim() !== "" && (
                      <div>
                        <a
                          href={`https://www.youtube.com/c/${resData.data.youtube}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="youtube" id="youtube-btn">
                            <YouTubeIcon />
                          </button>
                        </a>
                      </div>
                    )}
                
                </div>

                <div id="pdf-download-btn-div" data-html2canvas-ignore="true" >
                <button className="button-59" aria-label="download-file" onClick={generateImg}> Download </button>                

                    <button className="button-59" onClick={redirectToweb} aria-label="edit"> Edit </button>

                    <button className="button-59" aria-label="add-user"> Delete this User </button>
                  

                </div>

                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
