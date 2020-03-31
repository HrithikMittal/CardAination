const fs = require("fs");
const fileName = "./file.txt";

fs.watch(fileName, () => {
  console.log("There is some change in file");
});
