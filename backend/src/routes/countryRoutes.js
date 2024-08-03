const express = require("express");
const router = express.Router();
const Country = require("../model/Country");

router.get("/", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, capital, population } = req.body;

  try {
    const newCountry = new Country({
      name,
      capital,
      population,
    });

    await newCountry.save();

    res.status(201).json(newCountry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
