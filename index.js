const express = require("express");
const { set, connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("colors");

const app = express();
app.use(express.json());
app.use(cors());

set("strictQuery", false);
connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is connected".bgGreen.white))
  .catch(() => console.log("MongoDB is not connected".bgRed.white));

// Router import
const Doctor = require("./routes/doctorRoutes");
const Client = require("./routes/client");
const Room = require("./routes/roomRoutes");
const { dailyReports } = require("./routes/dailyReports");
const { reports } = require("./routes/reports");

app.use("/admin", Doctor);
app.use("/rooms", Room);
app.use("/client", Client);
app.use("/dailiyReports", dailyReports);
app.use("/reports", reports);

app.get("/", async (req, res) => {
  res.json("<h1>App is running</h1>");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () =>
  console.log(`Server listening => http://localhost:${PORT}`.bgCyan)
);
