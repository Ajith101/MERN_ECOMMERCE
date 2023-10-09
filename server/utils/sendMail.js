const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const sendMail = async (mail, operation, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 900000)}`;
    const hashOTP = await bcrypt.hash(otp, 10);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let details = {};
    if (operation === "signup") {
      details = {
        from: process.env.MAIL_ID,
        to: mail,
        subject: "Mail verification",
        text: `Your opt for verifying your account is ${otp}`,
      };
    } else if (operation === "forgotPassword") {
      details = {
        from: process.env.MAIL_ID,
        to: mail,
        subject: "Forgot Password",
        html: `<p>Note the OTP <p>
      <p>Enter this OTP <b>${otp}</b> in the app to verify your account</p>`,
      };
    }
    await transporter.sendMail(details, async (err) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
      } else {
        await userModel.updateOne({ email: mail }, { $set: { otp: hashOTP } });
        res.status(200).json({ message: "OTP sended" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = sendMail;
