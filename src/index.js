require("dotenv").config();
const express = require("express");
const cors = require("cors");

const adsRoutes = require("./routes/ads.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ads", adsRoutes);

app.get("/", (req, res) => {
  res.send("AdSpy Personal Backend OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
