const fs = require("fs");
const https = require("https");

console.log("Hello World");

var a = 100;
var b = 100;

// API Call
https.get("https://dummyjson.com/products/1", (res) => {
    console.log("Fetched Data Successfully");
});

// To execute the code after milisecond
setTimeout(() => {
    console.log("setTimeout called after 5 seconds");
}, 5000);

// ASYNC FUNCTION
// To read the code of the path of file.txt
fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log("File Data :", data);
});


function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

var c = multiplyFn(a, b);

console.log("Multiplication result is :", c);