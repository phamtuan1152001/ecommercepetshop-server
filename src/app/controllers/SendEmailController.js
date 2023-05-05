var nodemailer = require("nodemailer");

const USER_NAME_GMAIL = "petshopecommerce301@gmail.com";
// petshopecommerce301@gmail.com
// 22052023
const APP_PASSWORD_HARD_CODE = "oelntfgcqbaypmrg"; // SET-UP FOR petshopecommerce301@gmail.com

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
    // to: "plstuan.ityu@gmail.com, phamtuan1152001@gmail.com",
    var mailOptions = {
      from: "songtuan20012@gmail.com",
      to: "phamtuan1152001@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy - pham le song tuan - hihi! - 1105",
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
