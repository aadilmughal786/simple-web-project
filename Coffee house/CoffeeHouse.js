// ###################################################################
// # Project    : Coffee House using OOPs paradigm
// # Args       : _
// # Author     : Aadil Mugal
// # Email      : aadilshe786@gmail.com
// # TC         : _
// # SC         : _
// # Language   : JavaScript (ES6)
// ###################################################################

// Importing the module
const readline = require("readline-sync");

// Order class to contain the details of order
class Order {
  constructor(type, milk, cream, latte, quantity) {
    this.type = type;
    this.milk = milk;
    this.cream = cream;
    this.latte = latte;
    this.quantity = quantity;
    this.typeArray = ["Espresso", "Cappuccino", "Latte"];
    this.prizes = [
      [60, 75, 100],
      [80, 90, 125],
      [100, 125, 150],
    ];
  }

  getOrderInfo() {
    if (this.isValidOrder()) {
      let cup = this.quantity > 1 ? "cups" : "cup";
      console.log(
        `\n${this.quantity} ${cup} of ${this.typeArray[this.type - 1]} coffee`
      );
      console.log(
        `contains milk  : ${this.milk ? "Yes" : "No "}  | prize ${
          this.prizes[this.type - 1][0]
        } per cup`
      );
      console.log(
        `contains cream : ${this.cream ? "Yes" : "No "}  | prize ${
          this.prizes[this.type - 1][1]
        } per cup`
      );
      console.log(
        `contains latte : ${this.latte ? "Yes" : "No "}  | prize ${
          this.prizes[this.type - 1][2]
        } per cup`
      );
    } else {
      console.log("Not a valid order");
    }

    console.log("--------------------------------------");
  }

  isValidOrder() {
    if (this.type > 3 || this.type < 1) return false;
    else if (this.quantity < 1) return false;
    else if (!this.milk && !this.cream && !this.latte) return false;
    return true;
  }

  getOrderprize() {
    if (this.isValidOrder()) {
      let milkPrize = this.milk ? this.prizes[this.type - 1][0] : 0;
      let creamPrize = this.cream ? this.prizes[this.type - 1][1] : 0;
      let lattePrize = this.latte ? this.prizes[this.type - 1][2] : 0;

      return this.quantity * (milkPrize + creamPrize + lattePrize);
    } else {
      // Not a valid order
      return -1;
    }
  }
}

// Coffee house to process orders
class CoffeeHouse {
  constructor(listOfOrders) {
    this.ordersList = listOfOrders;
  }

  getValidOrders() {
    let count = 0;
    for (order of this.ordersList) {
      if (order.isValidOrder()) count++;
    }
    return count;
  }

  getNoneValidOrders() {
    let count = 0;
    for (let order of this.ordersList) {
      if (!order.isValidOrder()) count++;
    }
    return count;
  }

  getTotalPrize() {
    let totalprize = 0;
    for (let order of this.ordersList) {
      let prize = order.getOrderprize();
      if (prize > 0) totalprize += prize;
    }
    return totalprize;
  }

  getDetailedBill() {
    for (let order of this.ordersList) {
      if (order.isValidOrder()) order.getOrderInfo();
    }
  }
}

// Intro of app
function welcome() {
  console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
  console.log("┃ Welcome to the coffee House                   ┃");
  console.log("┃ Never trust anyone who doesn't drink coffee.  ┃");
  console.log("┃      ☕ Devloped By : Aadil Mugal             ┃");
  console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");
}

// End test of app
function end() {
  console.log("_________________");
  console.log("< have a nice day >");
  console.log(" -----------------");
  console.log("           ^__^");
  console.log("           (oo)_______");
  console.log("           (__)       )/\\");
  console.log("               ||----w |");
  console.log("               ||     ||");
}

// Get the order for user
function getOrder() {
  console.log("Choose type of coffee");
  console.log("1.Espresso\n2.Cappuccino\n3.Latte");
  let type = Number(readline.question());
  console.log("Enter the quantity");
  let quantity = Number(readline.question());
  console.log("Would you like to add milk? (y/n)");
  let milk = readline.question() == "y" ? true : false;
  console.log("Would you like to add cream? (y/n)");
  let cream = readline.question() == "y" ? true : false;
  console.log("Would you like to add latte? (y/n)");
  let latte = readline.question() == "y" ? true : false;

  let order = new Order(type, milk, cream, latte, quantity);
  return order;
}

// Entery point of our app
function main() {
  welcome();
  // getting the data from user
  let again = true;
  let orders = [];
  while (again) {
    let order = getOrder();
    orders.push(order);
    console.log("Do you want to order more? (y/n) ");
    again = readline.question() == "y" ? true : false;
  }

  // process the ordrs in coffee house
  let coffieHouse = new CoffeeHouse(orders);
  console.log("\nyou detailed bill is here\n------------------------------");
  coffieHouse.getDetailedBill();
  console.log(`Total amount : ${coffieHouse.getTotalPrize()} rupees\n\n`);

  // Bye Bye
  end();
}

main();
