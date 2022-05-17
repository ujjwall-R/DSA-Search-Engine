const express = require("express");
const searchRoutes = require("./routes/search");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// import cors from "cors";
const cors = require("cors");

app.use(cors());

app.use(searchRoutes);

app.listen(PORT, () => {
  console.log("Server is on port", PORT);
});
