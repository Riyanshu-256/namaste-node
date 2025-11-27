// to create server
const express = require("express");

// to create application
const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({
        firstName: "Riyanshu",
        lastName: "Sharma",
        city: "Koderma",
        age: 22
    })
});

app.post("/user", (req, res) => {
    // Save data to the database
    res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
});

// THIS WILL MATCH ALL THE HTTP METHOD API CALLS /test
// to handle request for "/" , "/test", "/hello"
app.use("/", (req, res) => {
    res.send("Hello from the empty soul");
});

app.use("/test", (req, res) => {
    res.send("Hello from the server");
});


app.use("/hello", (req, res) => {
    res.send("Hello what are you doing???");
});

// listen on port => so everybody connect to us
app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});
