var nodemailer = require("nodemailer");

const USER_NAME_GMAIL = "songtuan20012@gmail.com";
const APP_PASSWORD_HARD_CODE = "fwtahtrfwytyyymy"; // SET-UP FOR songtuan20012@gmail.com

class SendEmailController {
  sendEmail(req, res) {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: USER_NAME_GMAIL,
        pass: APP_PASSWORD_HARD_CODE,
      },
    });

    var mailOptions = {
      from: "songtuan20012@gmail.com",
      to: "plstuan.ityu@gmail.com, phamtuan1152001@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy - pham le song tuan - hihi!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send({
          retCode: 0,
          retText: "Send email successfully!",
          retData: info,
        });
      }
    });
  }
}

module.exports = new SendEmailController();
