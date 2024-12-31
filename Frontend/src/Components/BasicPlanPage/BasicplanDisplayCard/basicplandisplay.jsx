import "./basicplandisplay.css";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AssestsObj } from "../../../Assests/assests.js";
import Loader from "../../Reusable_components/Loader/loader.jsx";
import Toaster from "../../Reusable_components/Toaster/toaster.jsx";
import Modal from "../../Reusable_components/Modal/modal.jsx";
import { QRCodeSVG } from 'qrcode.react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Snackbar from "../../Reusable_components/Snackbar/snackbar.jsx";

import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import html2canvas from "html2canvas";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function BasicPlanDisplayDetails() {
  const [isLoading, setLoading] = useState(true);
  const divCapture = useRef(null);
  const [resData, setResData] = useState({
    data: {},
    isFound: false,
  });
  const [showsnack,setsnack] = useState({
    show : false , msg : ''
  })
  const [whatsappnum, setWhatappnum] = useState("");
  const qrcodeEl = useRef(null);
  const { id, companyName } = useParams();
  const [errobjRes, setErrobjRes] = useState({
    isErr: false,
    msg: "",
  });

  const [currentURL,setCurrentURL] = useState({
    modal : false , url : ''
  })

  const [delRes, setDelRes] = useState({
    isDeleted: false,
    msg: "",
  });
  const [errobjDel, seterrobjDel] = useState({
    isErr: false,
    msg: "",
  });
  const [modalLoading, setModalLoad] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBoxStyle = {
    opacity: '1',
    borderRadius: '12px',
    position: 'fixed',
    display: 'flex',
    padding: '20px',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    width: '350px',
    minHeight: '150px',
    height: 'auto',
    backgroundColor: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '100',
  };
  

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

  function modalON() {
    setModalOpen(true);
  }
  function errDelFalse() {
    seterrobjDel({
      isErr: false,
      msg: "",
    });
  }

  function setresDelFalse() {
    setDelRes({
      isDeleted: false,
      msg: "",
    });
  }

  function modalOFF() {
    setModalOpen(false);
    errDelFalse();
    setresDelFalse();
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
      link.download = `digicard-${resData.data.Companyname}.png`;
      link.click();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (id === null || !id || id === "null") {
      setErrobjRes({
        isErr: true,
        msg: "Error occured Please Try again",
      });
      return;
    }
    async function fetchData() {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_URL}/getDigi/${companyName}/${id}`,
          {
            withCredentials: true,
          }
        );
        if (!res) {
          throw new Error("Error occured pls try again");
        }
        if (res.data.isfound === true) {
          setResData({
            isFound: true,
            data: res.data.data1,
          });
          ErrorFalse();
        }
      } catch (e) {
        console.error(e)
        let errMsg = e.message || "An error occured";

        if (e.response) {
          errMsg = e.response.data;
        }
        setErrobjRes({
          isErr: true,
          msg: errMsg,
        });
        setResFalse();
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  function savingWhatsappNum(e) {
    setWhatappnum(e.target.value);
  }

  async function DeleteCard() {
    setModalLoad(true);
    if (id === null || !id || id === "null") {
      seterrobjDel({
        isErr: true,
        msg: "Error occured Please Try again",
      });
      return;
    }
    try {
      let res = await axios.delete(`${process.env.REACT_APP_URL}/deleteCard` , {
        data : {
          userID : id , companyname : companyName
        },
        withCredentials : true
      } , );
      if(!res){
        throw new Error("An Error occured Try Again");
      }
   
      if(res.data.isDeleted === true){
        setDelRes({
          isDeleted : true , msg : res.data.msg
        })
      }
      errDelFalse()
     
    } catch (e) {
    
      let errmsg = e.message || "An Error occured";
      if (e.response) {
        errmsg = e.response.data;
      }
      seterrobjDel({
        isErr: true,
        msg: errmsg,
      });
      setresDelFalse();
    }
    finally{
      setModalLoad(false)
    }
  }

  function getURL(){
    setCurrentURL({
      modal : true , url : decodeURIComponent( window.location.href)
    })
  }

  function closeURL(){
    setCurrentURL({
      modal : false , url : ''
    })
  }

  async function shareQRtoWhatsapp(){
    if(qrcodeEl.current){
      const canvas = await html2canvas(qrcodeEl.current);
      const newFile = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });     
        const data = {
          files: [
            new File([newFile], 'image.png', {
              type: newFile.type,
            }),
          ],
          title: 'Image',
          text: 'Check out this',
        }
        
        try{
          if(!navigator.canShare(data)){
            console.error("Can't share");
          }
          await navigator.share(data)
      }catch(e){
        console.log(e)
      }

    }
  }

  function copyToClip(){
    try{
      navigator.clipboard.writeText(decodeURIComponent(window.location.href));
      setsnack({
        show : true , msg : 'Copied to Clipboard'
      })
    }catch(e){
      setsnack({
        show : true , msg : 'Failed To Copy'
      })
    }
  }
  function offsnack(){
    setsnack({
      msg : '' , show : false
    })
  }
 
  return (
    <div id="bp-comp-container">
      {
        showsnack.show && <Snackbar onClose={offsnack} AutoHideDuration={3000} sbWidth="150px" >
          <p> {showsnack.msg} </p>
        </Snackbar>
      }
      {
        currentURL.modal && <Modal onClose={closeURL} modalBoxStyle={{...modalBoxStyle , height : 'auto'}} >
          <div ref={qrcodeEl} ><QRCodeSVG value={currentURL.url || window.location.href} size={200} />
          </div>
          <div id="qr-share-buttons" >
            <button onClick={shareQRtoWhatsapp} > <WhatsAppIcon /> </button>
            <button onClick={copyToClip} > <ContentPasteIcon /> </button>
          </div>
        </Modal>
      }

      {modalOpen && (
        <Modal 
          headerText="Are you sure that you want to delete ?"
          onClose={modalOFF} modalBoxStyle={ modalBoxStyle} 
        >
          <div id="two-del-buttons">
            <button disabled={modalLoading} onClick={DeleteCard}>
              
              {modalLoading ? <Loader size={10} color="#fff" /> : "Yes"}
            </button>
            <button onClick={modalOFF}>No</button>
          </div>
          {

            delRes.isDeleted &&  <Toaster
            message={delRes.msg}
            type="success"
            onClose={setresDelFalse}
             AutoHideDuration={5000}
            MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
            minwidthToaster="50px"
            fontColor="white"
            iconColor="white"
          />
          }
          {
            errobjDel.isErr && <Toaster
            message={errobjDel.msg}
            type="error"
            onClose={errDelFalse}
            AutoHideDuration={5000}
            MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
            minwidthToaster="50px"
            fontColor="white"
            iconColor="white"
          />
          }
        </Modal>
      )}

      {isLoading && <Loader size={100} loaderMargin="100px 0" />}

     
        <div id="bp-cmp-div">
          <div id="bp-comp-main">
            {resData.isFound && (
              <div id="bp-comp-contents" ref={divCapture}>
                <div id="bp-section1-page">
                  {!resData.data.img.includes("Didnt") && (
                    <div id="bp-logo-div">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${process.env.REACT_APP_URL}/imgs${resData.data.img}`}
                        />
                        <img
                          src={`${process.env.REACT_APP_URL}/imgs${resData.data.img}`}
                          alt="company-logo"
                        />
                      </picture>
                    </div>
                  )}
                  <div id="bp-contents-div-user">
                    {resData.data.Companyname.trim() !== "" &&
                      resData.data.Companyname !== undefined && (
                        <p id="company-name-bp">{resData.data.Companyname}</p>
                      )}
                    {resData.data.name.trim() !== "" &&
                      resData.data.name !== undefined && (
                        <p id="user-name-bp">{resData.data.name}</p>
                      )}
                    {resData.data.UserRole.trim() !== "" &&
                      resData.data.UserRole !== undefined && (
                        <p id="userRole-bp">{resData.data.UserRole}</p>
                      )}
                  </div>
                </div>

                <div id="bp-social-link-section">
                  {resData.data.phone.trim() !== "" &&
                    resData.data.phone !== undefined && (
                      <div id="sep-icon-div">
                        <a
                          href={`tel:${resData.data.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="call">
                            <CallIcon
                              sx={{
                                fontSize: "38px",
                              }}
                            />
                          </button>
                        </a>
                      </div>
                    )}
                  {resData.data.whatsapp.trim() !== "" &&
                    resData.data.whatsapp !== undefined && (
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

                  {resData.data.mail.trim() !== "" &&
                    resData.data.mail !== undefined && (
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
                  {resData.data.location.trim() !== "" &&
                    resData.data.location !== undefined && (
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

                <div id="bp-social-link-description">
                  {resData.data.phone.trim() !== "" &&
                    resData.data.phone !== undefined && (
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

                  {resData.data.website.trim() !== "" &&
                    resData.data.website !== undefined && (
                      <div id="sep-icon-div-col">
                        <a
                          href={
                            resData.data.website.startsWith("http://") ||
                            resData.data.website.startsWith("https://")
                              ? resData.data.website
                              : `https://${resData.data.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="website-link">
                            <LanguageIcon />
                          </button>
                        </a>
                        <p> {resData.data.website} </p>
                      </div>
                    )}

                  {resData.data.whatsapp.trim() !== "" &&
                    resData.data.whatsapp !== undefined && (
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

                  {resData.data.mail.trim() !== "" &&
                    resData.data.mail !== undefined && (
                      <div id="sep-icon-div-col">
                        <a
                          href={`mailto:${resData.data.mail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button aria-label="mail">
                            <EmailIcon />
                          </button>
                        </a>
                        <p> {resData.data.mail} </p>
                      </div>
                    )}

                  {resData.data.location.trim() !== "" &&
                    resData.data.location !== undefined && (
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
                      <button aria-label="share-on-whatsapp">
                        
                        <WhatsAppIcon sx={{}} /> Share on Whatsapp
                      </button>
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
                            <button aria-label="linkedin" id="linkedin-btn">
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

                  <div id="pdf-download-btn-div" data-html2canvas-ignore="true">
                  <button
                      className="button-59"
                      onClick={getURL}
                      aria-label="add-user"
                    >
                      
                      Generate QR Code
                    </button>
                   

                    <button
                      className="button-59"
                      aria-label="download-file"
                      onClick={generateImg}
                    >
                      
                      Download
                    </button>

                    <a
                      href={`/editDigi/${companyName}/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="button-59" aria-label="edit">
                        
                        Edit
                      </button>
                    </a>

                    

                    <button
                      className="button-59"
                      aria-label="add-user"
                      onClick={modalON}
                    >
                      
                      Delete
                    </button>
                    {resData.data.personal === false && (
                      <>
                        <a
                          href={`/addUser/${companyName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="button-59" aria-label="add-user">
                            
                            Add a User
                          </button>
                        </a>
                        <a
                          href={`/showUser/${companyName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="button-59" aria-label="add-user">
                            
                            Show All Users
                          </button>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
   

      {errobjRes.isErr && (
        <Toaster
          message={errobjRes.msg}
          type="error"
          onClose={ErrorFalse}
          AutoHideDuration={5000}
          MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
          minwidthToaster="50px"
          fontColor="white"
          iconColor="white"
        />
      )}
    </div>
  );
}
