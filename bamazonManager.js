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

                // case "Add to Inventory":
                //     addInventory();
                //     break;

                // case "Add New Product":
                //     addProduct();
                //     break;

                // case "exit":
                //     connection.end();
                //     break;
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
    connection.query("SELECT * FROM products WHERE stock_quantity < 190", 
    function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Low Inventory!!!");
            console.log("ids:" + res[i].item_id + "   ||   " + "Name:" + res[i].product_name);
        }
        start();
    });
}