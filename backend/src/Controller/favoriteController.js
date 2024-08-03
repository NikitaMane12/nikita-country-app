const Favorite = require("../model/Favorite");

const addFavorite = async (req, res) => {
  const { country } = req.body;
  const userId = req.user._id;

  const favoriteExists = await Favorite.findOne({ user: userId, country });

  if (favoriteExists) {
    return res.status(400).json({ message: "Country already in favorites" });
  }

  const favorite = await Favorite.create({ user: userId, country });

  res.status(201).json(favorite);
};

const getFavorites = async (req, res) => {
  const userId = req.user._id;

  const favorites = await Favorite.find({ user: userId });

  res.json(favorites);
};

module.exports = { addFavorite, getFavorites };
