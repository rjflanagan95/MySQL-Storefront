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
  customerPrompt();
});

function customerPrompt() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("~~~~~~~~~~");
            console.log("Item ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: $" + res[i].price);
            console.log("Qty: " + res[i].stock_quantity);
            console.log("~~~~~~~~~~");
        }

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
        ]).then(function(response) {
            if (!response.itemInput || !response.qtyInput) {
                console.log("Please enter all information.");
                customerPrompt();
            }
            else if (isNaN(parseInt(response.itemInput))) {
                console.log("The item number must be an integer.");
                customerPrompt();
            }
            else if (isNaN(parseInt(response.qtyInput))) {
                console.log("The quantity must be an integer.");
                customerPrompt();
            }
            else {
                console.log("Searching for items...");
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(response.itemInput)) {
                        chosenItem = res[i];
                    }
                }

                var newQuantity = chosenItem.stock_quantity - response.qtyInput;
            
                if (chosenItem.stock_quantity > parseInt(response.qtyInput)) {
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ], function(error) {
                        if (error) throw error;
                        console.log("Items successfully purchased.");
                        var totalCost = (response.qtyInput) * (chosenItem.price);
                        console.log("Total cost: $" + totalCost);
                        connection.end();
                    });
                } else {
                    console.log("Not enough in stock.");
                    connection.end();
                }
            }
        });
    });
}