const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const adminAuth = require("../middleware/adminAuth");

router.post("/", adminAuth, upload.single("image"), (req, res) => {
  try {
    res.json({ url: req.file.path });
  } catch {
    res.status(500).json({ message: "আপলোড হয়নি" });
  }
});

module.exports = router;
