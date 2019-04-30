var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Folaranmi1@5252",
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
        for (var i = 0; i < res.length; i++) {
            console.log("ids:" + res[i].item_id + "   ||   " + "Name:" + res[i].product_name + "   ||   " + "Prices:" + res[i].price + "   ||   " + "Quantities:" + res[i].stock_quantity);
        }
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
                for (var i = 0; i < res.length; i++) {
                    console.log("============================================= Low Bamazon Inventory (5 or Less in Stock) ===============================================");
                    console.log("ids:" + res[i].item_id + "   ||   " + "Name:" + res[i].product_name);
                };
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
            connection.query('SELECT stock_quantity FROM products WHERE ?', {
                item_id: answer.productID
            }, function(err, res) {
                if (err) throw err;
                itemStock = res[0].stock_quantity;
                itemStock = parseInt(itemStock)
        
            connection.query(
                "UPDATE products SET stock_quantity=? WHERE item_id =?",
                [
                    {
                        stock_quantity: itemStock + answer.productNumber
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
                message: "Please enter the item name of the new product."
            },
            {
                type: "input",
                name: "department",
                message: "Please enter which department name of which the new product belongs.",
            },
            {
                type: "input",
                name: "price",
                message: "Please enter the price of the new product (0.00).",
            },
            {
                type: "input",
                name: "quantity",
                message: "Please enter the stock quantity of the new product.",
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