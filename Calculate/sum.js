// Modules protects their variables and function from leaking

console.log("Sum module executed");

var x = "Hello World";

function calculateSum(a, b){
    const sum = a + b;

    console.log(sum);
}

// Exports x and calculateSum so other files can use them.
// Both method execute same output
module.exports = {x, calculateSum};

// module.exports.x = x;
// module.exports.calculateSum = calculateSum;