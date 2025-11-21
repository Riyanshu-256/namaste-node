console.log("Hello World");

var a = 1078698;
var b = 20986;

// This is a async function. So, the code will be execute when call stack is empty. If stack is not empty, it will execute after stack is empty
setTimeout(() => {
    console.log("call me ASAP");
}, 0);

setTimeout(() => {
    console.log("call me after 3 seconds");
}, 3000);

function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

var c = multiplyFn(a, b);

console.log("Multiplication result is : ", c);
