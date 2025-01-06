import "./faq.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState  } from "react";

export default function FrequentlyAskedQuestions() {
  const [currentIndex, setIndex] = useState({
    sectionInd: null,
    questionInd: null,
  });
  const [showAllSections, setShowAllSections] = useState(false);

  const FAQarray = [
    {
      section: "Account & Setup",
      questions: [
        {
          question: "Do I need an account to create a DigiCard?",
          answer:
            "Yes, you'll need to sign up for an account to create and manage your digital business card. This ensures your information is securely stored and easily accessible.",
        },
        {
          question: "How do I create my DigiCard?",
          answer:
            "Simply sign up, choose a design template, add your contact information (name, phone number, email, etc.), and customize your card with logos, colors, and other details. You can create your card in just a few minutes.",
        },
        {
          question:
            "Can I create multiple cards for different purposes (e.g., personal and professional)?",
          answer:
            "Yes, you can create multiple digital cards for different uses, such as personal and business",
        },
      ],
    },
    {
      section: "Customization",
      questions: [
        {
          question: "How do I update my contact details on DigiCard?",
          answer:
            "You can update your contact details at any time by logging into your DigiCard account and editing your information. Any changes will be reflected on your card immediately.",
        },
        {
          question: "Can I add my social media profiles to my DigiCard?",
          answer:
            "Yes, adding links to your social media profiles (LinkedIn, Instagram, Facebook, etc.) is available with the Premium Plan. This feature helps make your card more interactive and connected to your online presence.",
        },
      ],
    },
    {
      section: "Sharing & Accessibility",
      questions: [
        {
          question: "How do I share my DigiCard?",
          answer:
            "You can share your card via email, SMS, WhatsApp, or any messaging app. You can also generate a QR code for easy scanning and sharing at events.",
        },
        {
          question:
            "Can I share my card with someone who doesn’t have the DigiCard app?",
          answer:
            "Yes, DigiCard can be shared with anyone, even if they don’t have the app. You can send your card via a link, email, or QR code, which recipients can view in any web browser.",
        },
        {
          question: "Can I send my DigiCard through text message (SMS)?",
          answer:
            "Yes, you can easily share your DigiCard via text message by sending a link to your card.",
        },
        {
          question: "Is my DigiCard accessible offline?",
          answer:
            "You can save your DigiCard to your phone or device, making it accessible offline. However, to share it, an internet connection is required.",
        },
      ],
    },
    {
      section: "Security & Privacy",
      questions: [
        {
          question: "Is my personal information secure on DigiCard?",
          answer:
            "Yes, we take your privacy seriously. DigiCard uses encryption to protect your data, and we do not share your information with third parties without your permission.",
        },
        {
          question: "Will my information be shared with third parties?",
          answer:
            "No, your personal information is only shared with the contacts you send your card to, and only if you choose to include it on your card.",
        },
      ],
    },
    {
      section: "Plans & Pricing",
      questions: [
        {
          question: "What is included in the Free Plan?",
          answer:
            "The Free Plan includes the ability to create one card with your name, address, contact information, and logo. However, you cannot add social media links or create multiple cards with this plan.",
        },
        {
          question: "What is included in the Basic Plan?",
          answer:
            "The Basic Plan (₹99 - 1 year) allows you to create up to 5 cards, edit your information, and add logos. Social media links and the ability to create more than 5 cards are not available in the Basic Plan.",
        },
        {
          question: "What is included in the Premium Plan?",
          answer:
            "The Premium Plan (₹699 - 1 year) includes all features of the Basic Plan plus social media links, the ability to create up to 10 cards.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No, there are no hidden fees. We provide clear pricing and a free card so you can try before committing.",
        },
      ],
    },
    {
      section: "Additional Features",
      questions: [
        {
          question: "Can I create a business card for my entire company?",
          answer:
            "Yes, DigiCard offers a business solution where you can create and manage digital cards for your entire team or company from a single account. Perfect for businesses that want a cohesive brand image across all employees.",
        },
        {
          question: "Can I add a logo or company branding to my DigiCard?",
          answer:
            "Yes, you can easily add your company’s logo, color scheme, and branding to your card to maintain a consistent professional image.",
        },
      ],
    },
  ];

  function showAnswers(section, question) {
    setIndex((prev) => {
      if (prev.questionInd === question && prev.sectionInd === section) {
        return { sectionInd: null, questionInd: null };
      }
      return { sectionInd: section, questionInd: question };
    });
  }

  function toggleSections() {
    setShowAllSections(!showAllSections);
  }

  return (
    <div id="faq-container">
      <div id="faq-main">
        <div id="faq-div">
          <p id="faq-header-txt">FAQ</p>
          <div id="faq-colums-div">
            {FAQarray.slice(0, showAllSections ? FAQarray.length : 1).map(
              (item, ind) => {
                return (
                  <div id="faq-main-div" key={ind}>
                    <p id="faq-section-header"> {item.section} </p>
                    <div id="faq-questions-div">
                      {item.questions.map((str, index) => {
                        return (
                          <div
                            key={index}
                            id="sep-question-div"
                            onClick={() => showAnswers(ind, index)}
                          >
                            <div id="question-div-2">
                              <p id="faq-question"> {str.question} </p>
                              <div id="mui-iconarrow-down">
                                {currentIndex.sectionInd === ind &&
                                currentIndex.questionInd === index ? (
                                  <KeyboardArrowUpIcon
                                    sx={{
                                      color: "#00a3e0",
                                    }}
                                  />
                                ) : (
                                  <KeyboardArrowDownIcon
                                    sx={{
                                      color: "#00a3e0",
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                            {currentIndex.sectionInd === ind &&
                              currentIndex.questionInd === index && (
                                <div id="answer-div" >
                                  <p> {str.answer} </p>
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
            <div id="read-more-btn">
              <button onClick={toggleSections}>
                
                {showAllSections ? "Read Less" : "Read More..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
