var inquirer = require("inquirer");

var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    console.log("***************** WELCOME TO BAMAZON ****************");
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View Products for Sale":
                    productForSale();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function productForSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['ID', 'Product Name', 'Price', 'Quantities']
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        start();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",
        function (err, res) {
            if (err) throw err;
            if (res.length === 0) {
                console.log("There are currently no items with Low Inventory!")
                start();
            } else {
                var table = new Table({
                    head: ['ID', 'Product Name']
                });
                for (var i = 0; i < res.length; i++) {
                    table.push([res[i].item_id, res[i].product_name]);
                }
                console.log(table.toString());
                start();
            }
        });
}

function addInventory() {
    inquirer
        .prompt([
            {
                name: "productID",
                type: "input",
                message: "Please enter the ID number you would like to add to inventory?"
            },
            {
                name: "productNumber",
                type: "input",
                message: "How many units of this item would you like to add?"
            },
        ])
        .then(function (answer) {
            connection.query('SELECT * FROM products WHERE item_id =?', [answer.productID],
                function (err, res) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: res[0].stock_quantity + parseInt(answer.productNumber)
                            },
                            {
                                item_id: answer.productID
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log("======Item has been sucessfully updated to your inventory=======");
                            start();
                        });
                })
        })
}

function addProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Please enter the item name of the new product:"
            },
            {
                type: "input",
                name: "department",
                message: "Please enter which department name of which the new product belongs:",
            },
            {
                type: "input",
                name: "price",
                message: "Please enter the price of the new product (0.00):",
            },
            {
                type: "input",
                name: "quantity",
                message: "Please enter the stock quantity of the new product:",
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Your item: " + answer.name + " has been added sucessfully!!");
                    start();
                }
            );
        });
}