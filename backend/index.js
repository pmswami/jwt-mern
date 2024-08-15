const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
    res.send("PONG");
});

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});