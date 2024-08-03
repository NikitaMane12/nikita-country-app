const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const { userRouter } = require("./src/routes/authRoutes");
const countryRoutes = require("./src/routes/countryRoutes");
const favoriteRoutes = require("./src/routes/favoriteRoutes");
const historyRoutes = require("./src/routes/historyRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/countries", countryRoutes);
app.use("/api/post", countryRoutes);

app.use("/api/favorites", favoriteRoutes);
app.use("/api/F", favoriteRoutes);
app.use("/api/history", historyRoutes);

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8080;
console.log("MongoDB URI:", uri);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
