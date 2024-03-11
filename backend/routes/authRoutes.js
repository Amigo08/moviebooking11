const Admin = require("../models/Admin");
const User = require("../models/User");

const router = require("express").Router();

// USER REGISTRATION
router.post("/register", async (req, res) => {
  const newUser = User(req.body);
  newUser.save().then((data) => {
    res.send({
      message: "User Registration Success",
      success: true,
      userData: data,
    });
  });
});

// USER LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const isUser = await User.findOne({ email });

  if (!isUser) {
    return res.send({ message: "Invalid Credentials", success: false });
  }

  if (isUser && password === isUser.password) {
    const userData = {
      role: isUser.role,
      id: isUser._id,
      name: isUser.name,
    };

    return res.send({
      message: "Login Success",
      success: true,
      userData,
    });
  } else {
    return res.send({ message: "Invalid Credentials", success: false });
  }
});

// ADMIN LOGIN
router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  const isAdmin = await Admin.findOne({ email });

  if (!isAdmin) {
    return res.send({ message: "Invalid Credentials", success: false });
  }

  if (isAdmin && password === isAdmin.password) {
    const adminData = {
      role: isAdmin.role,
      id: isAdmin._id,
      name: isAdmin.name,
    };

    return res.send({
      message: "Login Success",
      success: true,
      adminData,
    });
  } else {
    return res.send({ message: "Invalid Credentials", success: false });
  }
});

// CREATE ADMIN
router.get("/create/:id", (req, res) => {
  const { id } = req.params;

  if (id !== "amigozz") {
    return res.send("Cannot GET /api/auth/create/" + id);
  }

  const newAdmin = new Admin({
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "admin",
  });

  newAdmin.save().then((data) => {
    res.send(data);
  });
});

module.exports = router;
