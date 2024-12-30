import { UsersAuthModel } from "../../Models/UsersAuth.js";
import bcrypt from "bcrypt";
import { GenerateJWTtoken } from "../../Utils/generateToken.js";
import { sendMail } from "../../Utils/mailservise.js";

export const SignupDetails = async (req, res) => {
  let data = req.body;
  let finaldata;
  if (!data) {
    return res.status(400).send("An Error occured Try Again");
  }
  if (!data.password || data.password.trim() === "") {
    return res.status(400).send("Enter your password");
  }

  if (!data.username || data.username.trim() === "") {
    return res.status(400).send("Enter your username");
  }

  if (!data.mail || data.mail.trim() === "") {
    return res.status(400).send("Enter your Mail");
  }
  if (data.password.length < 8) {
    return res.status(400).send("Password must have atleast 8 characters");
  }
  if (data.password.length > 20) {
    return res.status(400).send("Password should less than 20 characters");
  }
  try {
    let valFindbyName = await UsersAuthModel.findOne({
      username: data.username,
    });
    let valFindbyMail = await UsersAuthModel.findOne({ mail: data.mail });
    if (valFindbyName) {
      return res.status(400).send("User with this name already exists");
    }
    if (valFindbyMail) {
      return res.status(400).send("User with this mail already exists");
    }
    let salt = await bcrypt.genSalt(10);
    let passwordHasing = await bcrypt.hash(data.password, salt);
    finaldata = new UsersAuthModel({
      username: data.username,
      mail: data.mail,
      password: passwordHasing,
      isVerified: false,
    });
    await finaldata.save();
    const mailAns = await sendMail(
      "from nodemailer",
      data.mail,
      `<h1> Edigicard </h1> 
            <h2>Note : </h2> <p> If you didnt verify within 24 hours your account will be deleted and you need to sign up again </p>
            <a href='user/verify/${finaldata._id}' target='_blank' rel='referrer noopener' > Click here  </a>
            `
    );
    if (mailAns === "Mail send Successfully") {
      return res.status(200).json({
        isCreated: true,
        msg: "An mail has been send please verify",
      });
    }
    if (mailAns === "Mail not send , Try Again") {
      return res.status(400).send("Mail not send Please Try again");
    }
  } catch (e) {
    return res.status(400).send(e.message || "Server Error");
  }
};
