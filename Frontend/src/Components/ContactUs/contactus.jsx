import "./contactus.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
export default function ContactUs() {
  return (
    <div id="contact-us-container">
      <div id="contact-us-main">
        <div id="contact-us-div">
          <div id="contact-us-contents">
            <p id="contact-us-header-txt">Contact us</p>
            <div id="contact-us-grid">
              <div id="contact-us-about-section">
                <div id="contact-us-subdiv">
                  <h1 style={{ color: "white", marginBottom: "20px" }}>            
                    E digicard
                  </h1>
                  <div id="contact-us-main-row">
                  <div id="contact-us-icon-row">
                    <div id="icon-div-contact">
                      <LocationOnIcon />
                    </div>
                    <div id="contact-us-row-texts">
                      <p id="about-text-contact"> Address </p>
                      <p id="contact-abpout-details-txt"> Madurai </p>
                    </div>
                  </div>
                  <div id="contact-us-icon-row">
                    <div id="icon-div-contact">
                      <CallIcon />
                    </div>
                    <div id="contact-us-row-texts">
                      <p id="about-text-contact"> Call </p>
                      <p id="contact-abpout-details-txt">1234567890</p>
                    </div>
                  </div>
                  <div id="contact-us-icon-row">
                    <div id="icon-div-contact">
                      <MailOutlineIcon />
                    </div>
                    <div id="contact-us-row-texts">
                      <p id="about-text-contact"> Mail </p>
                      <p id="contact-abpout-details-txt"> mail@gmail.in </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <div id="contact-form-section">
               
                <div id="contact-form-subdiv">
                <form>
                  <p> Send Message </p>
                  <input type="text" id="username" placeholder="Enter Name" />
                  <div id="contact-us-input-box-row">
                    <input
                    inputMode='numeric'
                      type="text"
                      id="usernumber"
                      placeholder="Enter Number"
                    />
                    <input
                      type="email"
                      id="usermail"
                      placeholder="Enter Mail"
                    />
                  </div>
                  <textarea placeholder="Enter Message" rows={7} ></textarea>
                  <button>Send</button>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
