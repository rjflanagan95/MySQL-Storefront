var mysql = require("mysql");
var inquirer = require("inquirer");
const keys = require("./keys");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: keys.mysqlpassword.pw,
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("~~~~~~~~~~");
        console.log("Item ID: " + res[i].item_id);
        console.log("Product Name: " + res[i].product_name);
        console.log("Department: " + res[i].department_name);
        console.log("Price: $" + res[i].price);
        console.log("~~~~~~~~~~");
    }
    customerPrompt();
  });
}

function customerPrompt() {
    inquirer.prompt([
        {
            name: "itemInput",
            message: "Enter the Item ID of the item you would like to buy.",
            type: "input"
        },
        {
            name: "qtyInput",
            message: "Enter the quantity you would like to buy.",
            type: "input"
        }
    ]).then(function(res) {
        if (!res.itemInput || !res.qtyInput) {
            console.log("Please enter all information.");
            customerPrompt();
        }
        else if (isNaN(parseInt(res.itemInput))) {
            console.log("The item number must be an integer.");
            customerPrompt();
        }
        else if (isNaN(parseInt(res.qtyInput))) {
            console.log("The quantity must be an integer.");
            customerPrompt();
        }
        else {
            console.log("Searching for items...");
            stockSearch();
        }
    });
}

function stockSearch() {
    connection.end();
}