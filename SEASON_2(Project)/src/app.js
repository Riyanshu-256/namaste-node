// to create server
const express = require("express");

// to create application
const app = express();

// to handle request
app.use("/test", (req, res) => {
    res.send("Hello from the server");
});

app.use("/", (req, res) => {
    res.send("Hello from the empty soul");
});

app.use("/hello", (req, res) => {
    res.send("Hello what are you doing???");
});

// listen on port => so everybody connect to us
app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});
