// To import the module => It helps you to create server (Request & response)
const http = require("http");

// To create server
const server = http.createServer(function (req, res) {

    if (req.url === "/getSecretData"){
        res.end("There is no secret data");
    } else {
    res.end("Hello World");  // data send back to the user
    }
});

server.listen(3000);