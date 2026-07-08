const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "ভুল পাসওয়ার্ড" });
  }
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
};
