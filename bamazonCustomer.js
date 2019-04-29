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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ids:" + res[i].item_id + "   ||   " + "Name:" + res[i].product_name + "   ||   " + "Prices:" + res[i].price);
        }
        promptUser();
    });
}

function promptUser() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the product you will like to purchase?",
                filter: Number,
            },
            {
                name: "unit",
                type: "input",
                message: "How many units of this product will you purchase?",
                filter: Number,
            },
        ])
        .then(function (answer) {
            var purchaseID = answer.id;
            var purchaseQuantity = answer.unit;
            connection.query(
                "SELECT * FROM products WHERE ?",
                {
                    item_id: purchaseID
                },
                function (err, res) {
                    if (err) throw err;
                    // To verify enough quantity
                    if (res[0].stock_quantity - purchaseQuantity >= 0) {
                        console.log("Congratulations, your item is in Stock!");
                        console.log("Your Grand Total for " + purchaseQuantity + " units of " + res[0].product_name + " is: $" + res[0].price * purchaseQuantity + " Thank you!");

                    //     connection.query(
                    //         "UPDATE products SET stock_quantity = stock_quantity - " + purchaseQuantity + "WHERE item_id =" + purchaseID);
                    // } else {
                    //     console.log("Insufficient quantity!");
                    // };
                    
                    connection.end();
                }
            )
            // start();
        });    
}






