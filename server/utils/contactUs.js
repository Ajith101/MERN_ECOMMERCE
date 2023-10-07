const nodemailer = require("nodemailer");

const contactUs = async (mail, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let details = {};
    details = {
      from: process.env.MAIL_ID,
      to: process.env.MAIL_ID,
      subject: "Contact Email",
      html: `<p>From :<b>${mail.email}</b> <br/> Name: <b>${mail.name} </b> <br/> Message :<b>${mail.message}</b> <br/>`,
    };
    await transporter.sendMail(details, async (err) => {
      if (err) {
        res.status(400).json(err);
        // res.status(400).json({ message: "Something went wrong" });
      } else {
        res.status(200).json({ message: "Message successfully send" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = contactUs;
