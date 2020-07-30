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

//building the command line that allows a user to make data entries regarding their staff:
const userMenu = () => {
    inquirer.prompt([
        {//first is the department (name of department)
            name:"name"
        }
    ])
}


// connecting to our database
connection.connect((err)=> {
    if (err) throw err;
    console.log(`Now connected to MySQL at thread ${connection.threadID}!`);
    userMenu();
});