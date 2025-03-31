const router = require("express").Router();
const usermodel = require("../model/usermodel");
const bcrypt = require("bcrypt");
const emailvalidate = require("email-validator");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      success: false,
      message: "Every field is mandatory",
    });
  }

  const emailvalidatemain = emailvalidate.validate(email);
  if (!emailvalidatemain) {
    return res.status(400).send({
      success: false,
      message: "enter valid email",
    });
  }

  try {
    const checkuser = await usermodel.findOne({ email });
    if (checkuser) {
      return res.status(400).send({
        success: false,
        message: "Email already exists",
      });
    }

    const decodepass = await bcrypt.hash(password, 10);
    const savedatatodb = new usermodel({ name, email, password: decodepass });
    await savedatatodb.save();
    return res.status(200).send({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const emailvalidatemain = emailvalidate.validate(email);
  if (!emailvalidatemain) {
    return res.status(400).send({
      success: false,
      message: "enter valid email",
    });
  }

  try {
    const emailchecksignin = await usermodel.findOne({ email });
    if (!emailchecksignin) {
      return res.status(400).send({
        success: false,
        message: "Email not found",
      });
    }

    if (emailchecksignin.isblocked) {
      return res.status(400).send({
        success: false,
        message: "Your account is blocked",
      });
    }

    const compareppassword = await bcrypt.compare(
      password,
      emailchecksignin.password
    );
    if (!compareppassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: emailchecksignin._id }, "you key");
    return res.status(200).send({
      success: true,
      message: "User signin successfully",
      token,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/getuser", async (req, res) => {
  try {
    const user = await usermodel.find({});
    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
