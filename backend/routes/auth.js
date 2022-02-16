const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "hwae7swgfaswyefw372234@##$2wde34def4";
//Using for Authentication Api: /api/auth/createuser
router.post(
  "/createuser",
  // Validation for incoming request
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Finding the unique User to remove duplicacy
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // if user is not already registered then create a new user
      let salt = await bcrypt.genSaltSync(10);
      let secured = await bcrypt.hashSync(req.body.password, salt);
      user = User.create({
        name: req.body.name,
        password: secured,
        email: req.body.email,
      });
      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({ error: "Please Enter Unique Email", message: err.message });
      // });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      res.send(500).send("something went wrong");
    }
  }
);
//login route for authentication
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password string cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      //main password comparision
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
// Route 3: for Fetching user data after log-in
router.post('/getuser',fetchuser, async (req,res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
})
router.get("/", (req, res) => {
  res.send("<h1>Gel Weprl sfa </h1>");
});
module.exports = router;
