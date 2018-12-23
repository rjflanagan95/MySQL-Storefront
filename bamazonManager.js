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
    managerPrompt();
});

function managerPrompt() {
    inquirer.prompt([
        {
            name: "manager_cmd",
            message: "What action would you like to perform?",
            type: "list",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new item to store"]
        }
    ]).then(function(res) {
        if (res.manager_cmd === "View products for sale") {
            viewProducts();
        }
        else if (res.manager_cmd === "View low inventory") {
            viewLowInventory();
        }
        else if (res.manager_cmd === "Add to inventory") {
            addToInventory();
        }
        else if (res.manager_cmd === "Add new item to store") {
            addNewItem();
        }
    });
}

function viewProducts() {
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
        connection.end();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5", function(err, res) {
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
        connection.end();
    });
}

function addToInventory() {
    inquirer.prompt([
        {
            name: "product_id",
            message: "Item ID: ",
            type: "input"
        },
        {
            name: "new_stock_qty",
            message: "What is the new quantity in stock?",
            type: "input"
        }
    ]).then(function(response) {
        connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: response.new_stock_qty
            },
            {
                item_id: response.product_id
            }
        ], function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("Product successfully updated");
            }
            connection.end();
        });
    });
}
function addNewItem() {
    inquirer.prompt([
        {
            name: "product_name",
            message: "Product name: ",
            type: "input"
        },
        {
            name: "department_name",
            message: "Department name: ",
            type: "input"
        },
        {
            name: "product_price",
            message: "Product price: $",
            type: "input"
        },
        {
            name: "product_qty",
            message: "Product quantity: ",
            type: "input"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO products SET ?",
        {
            product_name: (response.product_name).toString(),
            department_name: (response.department_name).toString(),
            price: parseFloat(response.product_price),
            stock_quantity: parseFloat(response.product_qty)
        }, function(err, res) {
            if (err) throw err;
            console.log("Items successfully added");
            connection.end();
        });
    });
}