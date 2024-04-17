// backend/routes/dataRoutes.js

const express = require("express");
const router = express.Router();
const SampleData = require("../models/SampleData");

// Import raw sample data set to a DB Collection
router.post("/import", async (req, res) => {
  try {
    const rawData = req.body;
    await SampleData.insertMany(rawData);
    res.status(201).json({ message: "Raw data imported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sample data
router.get("/", async (req, res) => {
  try {
    const data = await SampleData.find().sort({ ts: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
