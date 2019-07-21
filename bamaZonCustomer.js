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

    console.log("------------------------------------------------------------------------------------------")
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | Merchandise: " + res[i].product_name + " | Department: " + res[i].department_name + " |   $" + res[i].price_to_customer + " | ");
    }
    console.log("-------------------------------------------------------------------------------------------");
  });

}