import "./features.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import BusinessIcon from "@mui/icons-material/Business";
import ImageIcon from "@mui/icons-material/Image";
import CallIcon from "@mui/icons-material/Call";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LinkIcon from "@mui/icons-material/Link";

export default function Feautures() {
  const cardFeatures = [
    {
      frontText: "Create Your Digital Card",
      description:
        "Easily create digital cards for both personal and business use. Customize card details, add logos, and personalize the design.",
      icon: (
        <AddIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Edit Your Card Anytime",
      description:
        "Modify your card whenever needed, updating contact details, design, and other important information to keep it current.",
      icon: (
        <EditIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Share Your Card Effortlessly",
      description:
        "Share your digital card instantly via WhatsApp, generate a scannable QR code, or provide links to your social media and website.",
      icon: (
        <ShareIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Company & Personal Cards",
      description:
        "Create digital cards for personal use or for your entire organization. Perfect for business professionals, teams, and companies.",
      icon: (
        <RecentActorsIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Manage Company Member Cards",
      description:
        "Create cards for your entire company, add team members, and manage their digital cards all from a central account.",
      icon: (
        <BusinessIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Add Custom Logo",
      description:
        "Brand your digital card by adding your company’s logo, ensuring a professional and cohesive look across all employee cards.",
      icon: (
        <ImageIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Contact Information with Click-to-Call",
      description:
        "Include phone numbers, email addresses, and locations. Allow users to click to call or email directly from your digital card.",
      icon: (
        <CallIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Generate QR Codes for Easy Sharing",
      description:
        "Generate unique QR codes that can be scanned to quickly access and save your contact details from your digital card.",
      icon: (
        <QrCodeIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
    {
      frontText: "Add Website & Social Links",
      description:
        "Include links to your website and social media profiles, making it easier for others to connect with you online.",
      icon: (
        <LinkIcon
          sx={{
            fontSize: { xs : '30px' , md : '50px' , lg : '50px' , xl : '50px' },
            color: "#1f7b6c",
          }}
        />
      ),
    },
  ];

  return (
    <div id="features-container">
      <div id="features-div">
        <div id="features-main">
          <p id="features-header-txt">Features</p>
          <div id="features-cards-div">
            {cardFeatures.map((item, ind) => {
              return (
                <div className="card" key={ind}>
                  <div className="card-inner">
                    <div className="card-front">
                      {item.icon}
                      <p> {item.frontText} </p>
                    </div>
                    <div className="card-back">
                      <p> {item.description} </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
