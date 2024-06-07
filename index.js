const express = require("express");
const CORS = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(CORS());
app.use(express.json());

const featuredRoutes = require("./routes/featured");
app.use("/api/featuredContent", featuredRoutes);

app.listen(PORT, () => {
    console.log(`The api server is running at: http://localhost:${PORT}`);
});