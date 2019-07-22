var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "popsjuly1",
  database: "BamaZon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  readProducts();
});

function readProducts() {
  /*console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });*/

  connection.query("SELECT * FROM products", function (err, res) {

    console.log("------------------------------------------------------------------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | Merchandise: " + res[i].product_name + " | Department: " + res[i].department_name + " |   $" + res[i].price_to_customer + " | ");
    }
    console.log("-------------------------------------------------------------------------------------------");
  });
  purchase();
}

function purchase() {

  var chosenItem;
  var chooseId;
  var chosenQuantity;

  connection.query("SELECT * FROM products", function (err, res) {

    inquirer
      .prompt([{
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var j = 0; j < res.length; j++) {
              choiceArray.push(res[j].item_id + " " + res[j].product_name);
            }
            return choiceArray;
          },
          message: "Welcome BamaZon customer, which item would you like to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?"
        }
      ])

      .then(function (answer) {
        // get the information of the chosen item
        chosenItem = answer.choice;
        chooseId = chosenItem.slice(2);
        chosenQuantity = answer.quantity;
        purchArr = [];
        for (var k = 0; k < res.length; k++) {
          if (res[k].product_name === chooseId && res[k].stock_quantity <= 0 || res[k].stock_quantity - chosenQuantity <= 0) {
            console.log("I am so sorry, we only have " + res[k].stock_quantity + " " + chooseId + " in stock.");
            notEnough();
             break;
          } else if (res[k].product_name === chooseId && res[k].stock_quantity >= 0 && res[k].stock_quantity - chosenQuantity >= 0) {
            purchArr.push("$" + (res[k].price_to_customer * chosenQuantity).toFixed(2));
            console.log("Your total for " + chosenQuantity + "  " + chooseId + "(s) is: " + purchArr);
            moMoney();
            break;
          } else {
            myExit();
          }
        }


      });
  });

  //connection.query("SELECT * FROM products WHERE product_name = " + chooseID, function (err, res) {
  // if (err) throw err;
  // console.log(res);
  // });

}

function notEnough() {
  inquirer
    .prompt([{
      name: "stayOrGo",
      type: "list",
      message: "Would you like to re-order, or would you prefer to wait until more are in stock?",
      // choices: ["Yes, I would like to re-order please.", "Thank-you, but maybe I will come back at another time."]
      choices: ["stay", "go"]
    }])

    .then(function (answer) {
      if (answer.stayOrGo === "stay") {
        //(answer.stayOrGo === "Yes, I would like to re-order please.") {
        console.log("Ok, here is our merchandise list again.");
        purchase();
      } else //(answer.stayOrGo === "Thank-you, but maybe I will come back at another time.")
      {
        console.log("I am sorry that we could not help you today, but please come back soon!");
        myExit();
      }
    });

}

function moMoney() {
  inquirer
    .prompt([{
      name: "saveOrSpend",
      type: "list",
      message: "Can I help you with anything else?",
      //choices: ["Yes, I would like to see that merchandise list again, please.", "No, thank-you, I am good."]
      choices: ["save", "spend"]
    }])
    .then(function (answer) {
      if (answer.saveOrSpend === "spend") {
        //(answer.saveOrSpend === "Yes, I would like to see that merchandise list again, please.") {
        console.log("Of course, here it is: ");
        purchase();
      } else //(answer.saveOrSpend === "No, thank-you, I am good.")
      {
        console.log("Well thank you for your business, and please come back soon!");
        myExit();
      }
    
    });
}

function myExit() {
  console.log("Good-bye and thank you for choosing BamaZon!");
  connection.end();
}