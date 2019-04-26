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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ids:" + res[i].item_id + "   ||   " + "Name:" + res[i].product_name + "   ||   " + "Prices:" + res[i].price);
        }
        connection.end();
    });
}


// function start() {
//     inquirer
//         .prompt({
//             name: "artist",
//             type: "input",
//             message: "What artist would you like to search for?"
//         })
//         .then(function (answer) {
//             connection.query(
//                 "SELECT * FROM Top5000 WHERE ?",
//                 {
//                     artist_name: answer.artist
//                 },
//                 function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log("Position:" + res[i].position + " | " + "Name:" + res[i].artist_name + " | " + "Title:" + res[i].title + " | " + "Year:" + res[i].song_year + " | " + "Ranking:" + res[i].world_ranking);
//                     }
//                     start();
//                 }
//             );
//         });
