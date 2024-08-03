const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capital: String,
  population: Number,
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
