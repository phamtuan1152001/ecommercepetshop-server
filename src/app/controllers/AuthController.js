const config = require("../../config/AuthConfig");
const db = require("../../app/models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var nodemailer = require("nodemailer");
const USER_NAME_GMAIL = "petshopecommerce301@gmail.com";
const APP_PASSWORD_HARD_CODE = "oelntfgcqbaypmrg";

class AuthController {
  signup(req, res, next) {
    const sendEmailActive = (code, userMail) => {
      // console.log("code", code);
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
        from: "petshopecommerce301@gmail.com",
        to: userMail,
        subject: "Code Active Account",
        text: `Your code active account is ${code}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("error", error);
          // res.send({
          //   retCode: 0,
          //   retText: "Send email unsuccessfully!",
          //   retData: null,
          // });
          return;
        } else {
          // res.send({
          //   retCode: 0,
          //   retText: "Send email successfully!",
          //   retData: null,
          // });
          // console.log("info", info);
          return;
        }
      });
    };

    User.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res
          .status(400)
          .send({ message: "Failed! Your email is already in use!" });
        return;
      } else {
        const { username, password, fullName, phone, address, statusActive } =
          req.body || {};
        const codeActive = Math.floor(Math.random() * 900000) + 100000;

        const user = new User({
          username: username,
          password: bcrypt.hashSync(password, 8),
          fullName,
          phone,
          address,
          codeActive,
          statusActive, // 0 is not active, 1 is active
        });

        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (req.body.roles) {
            Role.find(
              {
                name: { $in: req.body.roles },
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                user.roles = roles.map((role) => role._id);
                user.save((err) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  // Send email
                  sendEmailActive(codeActive, username);

                  res.send({
                    retCode: 0,
                    retText: "User was registered successfully!",
                    retData: null,
                  });
                });
              }
            );
          } else {
            Role.findOne({ name: "user" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                // Send email
                sendEmailActive(codeActive, username);

                res.send({
                  retCode: 0,
                  retText: "User was registered successfully!",
                  retData: null,
                });
              });
            });
          }
        });
      }
    });
  }

  signin(req, res, next) {
    User.findOne({
      username: req.body.username,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          // expiresIn: 86400, // 24 hours // không càn set time expired cho token
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          retCode: 0,
          retText: "Login successfully!",
          retData: {
            id: user._id,
            username: user.username,
            // email: user.email,
            roles: authorities,
            accessToken: token,
          },
        });
      });
  }
}

module.exports = new AuthController();
