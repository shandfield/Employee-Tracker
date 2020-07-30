const mysql = require("mysql");
const inquirer = require("inquirer");

// setting up our database connection (but not connecting yet!)
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeetracker_db"
});


//using this code!!
// const start = async () => {
//     // pausing to get the user's requested action
//     const { action } = await inquirer.prompt({
//         name: "action",
//         type: "list",
//         message: "Would you like to [POST] an auction or [BID] on an auction?",
//         choices: ["POST", "BID", "EXIT"]
//     });

//     // ...after the await above finishes, calling the appropriate function
//     switch (action) {
//         case "POST":
//             return postAuction();
//         case "BID":
//             return bidAuction();
//         default:
//             connection.end();
//     }

// connecting to our database
connection.connect((err)=> {
    if (err) throw err;
    console.log(`Now connected to MySQL at thread ${connection.threadID}!`)