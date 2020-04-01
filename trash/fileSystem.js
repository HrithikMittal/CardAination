const fs = require("fs");
const fileName = "./file.txt";

// fs.watch(fileName, () => {
//   console.log("There is some change in file");
// });

console.log("Hello This is Step 1");

// fs.readFile(fileName, (err, message) => {
//   if (err) {
//     console.log("Error is ", err.message);
//   } else {
//     console.log(message.toString());
//   }
// });

const filetext = fs.readFileSync(fileName);
console.log(filetext.toString());

console.log("Hello This is Step 2");
