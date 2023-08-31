const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// REGISTERCONTROLLER==================================================================================
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send({
        success: "false",
        message: "All fields are required",
      });
    }

    //checking that user is alrady exisit or not
    const olduser = await User.findOne({ email });
    if (olduser) {
      return res.status(400).send({
        success: "false",
        message: "User is already registered Plese Login",
      });
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({
      success: true,
      message: "User Register Successfully",
      userdata: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
      errorrr: error.message,
    });
  }
};
// LOGINRCONTROLLER==================================================================================
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: "false",
        message: "All fields are required",
      });
    }

    // checking that user is present in the database or not
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    //verifying that the password is correct or not
    const passwordmatch = await bcrypt.compare(password, user.password);

    if (!passwordmatch) {
      return res.status(404).send({
        success: false,
        message: "Invlid Password",
      });
    }

    //Generating the jsontoken for login user
    const jwttoken = await jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      jwttoken,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      errorrr: error.message,
    });
  }
};

module.exports = { registerController, loginController };
