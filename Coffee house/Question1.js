// ###################################################################
// # Args       : _
// # Author     : Aadil Mugal
// # Email      : aadilshe786@gmail.com
// # TC         : O(n)
// # SC         : O(1)
// # Language   : JavaScript (ES6)
// ###################################################################

// Importing the module
const readline = require("readline-sync");

function isOdd(n) {
  return n & 1;
}

function rearrangeList(list) {
  const n = list.length;
  left = 0;
  right = n - 1;
  const MAX = list[right] + 1;

  for (i in list) {
    if (isOdd(i)) list[i] += (list[left++] % MAX) * MAX;
    else list[i] += (list[right--] % MAX) * MAX;
  }
}

function main() {
  list = [];
  console.log("Enter the total terms : ");
  let n = Number(readline.question());
  console.log(`Now enter the ${n} elements one by one :-`);
  while (n--) {
    let element = Number(readline.question());
    list.push(element);
  }
  const MAX = list[list.length - 1] + 1;

  rearrangeList(list);
  for (i in list) list[i] = Math.floor(list[i] / MAX);

  console.log(list);
}

main();
