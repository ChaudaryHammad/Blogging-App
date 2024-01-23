const { Router } = require("express");
const router = Router();
const User = require("../models/user");
router.get("/signin", async (req, res) => {
  res.render("signin");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/signin", async (req, res) => {
  res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    res.cookie("token", token, { httpOnly: true }).redirect("/");
  } catch (error) {
    return res.render("signin", { error: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
