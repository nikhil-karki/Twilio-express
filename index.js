const express = require("express");
const bodyParser = require("body-parser");
const sendSMS = require("./twilio");

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userDatabase = [];

// create user endpoint

app.post("/users", (req, res) => {
  const { email, password, phone } = req.body;
  const user = { email, password, phone };
  console.log("user---", user);
  userDatabase.push(user);

  const welcomeMessage = "Welcome to nik! your verification code is 54875";

  sendSMS(user.phone, welcomeMessage);

  res.status(201).send({
    message:
      "Account created successfully, kindly check your phone to activate your account",
    data: user,
  });
});

app.listen(port, () => {
  console.log("Server started listening at", port);
});

module.exports = app;
