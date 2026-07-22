const express = require("express");

const router = express.Router();

const {
  createLead,
  getAllLeads,
  deleteLead,
} = require("../controllers/leadController");

router.post("/", createLead);

router.get("/", getAllLeads);

router.delete("/:id", deleteLead);

module.exports = router;
