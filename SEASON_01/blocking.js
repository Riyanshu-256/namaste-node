// This module helps you do security tasks like hashing passwords, generating keys, encryption etc
const crypto = require("crypto");

console.log("Hello World");

var a = 10786498;
var b = 20986;

// pbkdf2 => password base key decorative function
crypto.pbkdf2("password", "salt", 500000, 50, "sha512");
console.log("Key is generated");

setTimeout(() => {
    console.log("call me right now");
}, 0);  // It will called once main thread is empty

function multiplyFn(x, y) {
    const result = x * y;
    return result;
}

var c = multiplyFn(a, b);
console.log("Multiplication result is : ", c);