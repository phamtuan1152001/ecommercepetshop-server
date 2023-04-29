const config = require("../../config/AuthConfig");
const db = require("../../app/models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  signup(req, res, next) {
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
          .send({ message: "Failed! Username is already in use!" });
        return;
      } else {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
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

                  res.send({ message: "User was registered successfully!" });
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

                res.send({ message: "User was registered successfully!" });
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
