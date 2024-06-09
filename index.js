const express = require("express");
const CORS = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.static(__dirname + "/public"));
app.use(CORS());
app.use(express.json());

const featuredRoutes = require("./routes/featured");
app.use("/api/featuredContent", featuredRoutes);

const categoryRoutes = require("./routes/category");
app.use("/api/categories", categoryRoutes);

const contentRoutes = require("./routes/content");
app.use("/api/content", contentRoutes);

app.listen(PORT, () => {
    console.log(`The api server is running at: http://localhost:${PORT}`);
});