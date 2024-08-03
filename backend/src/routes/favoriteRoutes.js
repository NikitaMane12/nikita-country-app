const express = require("express");
const {
  addFavorite,
  getFavorites,
} = require("../Controller/favoriteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/F", async (req, res) => {
  const { user, country } = req.body;

  if (!user || !country) {
    return res.status(400).json({ message: "User and country are required" });
  }

  try {
    const favorite = new Favorite({
      user,
      country,
    });

    await favorite.save();
    res.status(201).json({ message: "Favorite added successfully", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ user: userId }).populate("user");
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
