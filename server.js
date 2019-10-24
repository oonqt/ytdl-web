const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { port } = require("./config.json");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(({}, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

app.use("/", express.static(path.join("static", "web")))

app.use("/api/convert", require("./routes/convert"));

app.use(({}, res) => {
    res.sendFile(path.join(__dirname, "static", "codes", "404.html"));
});

app.listen(port, () => console.log("Listening on port", port));