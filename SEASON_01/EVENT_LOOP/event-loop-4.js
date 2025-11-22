const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");

  setTimeout(() => console.log("2nd timer"), 0);

  setImmediate(() => console.log("2nd setImmediate"));
});

process.nextTick(() => {
  process.nextTick(() => console.log("inner nextTick"));
  console.log("nextTick");
});

console.log("Last line of the file.");