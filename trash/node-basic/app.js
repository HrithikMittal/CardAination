// console.log("Hello from node js");

var { sum } = require("../helper.js");

// var let const
// console.log(process);

const total = sum(2, 3);
console.log(total);

var url = "https://adhikanshmittal@gmail.com";
var [network, temp] = url.split("//");

console.log(network);
var [address, host] = temp.split("@");
console.log(address);
console.log(host);
