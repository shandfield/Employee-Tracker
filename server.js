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
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Create", "View", "Update","Exit"]
        }
    ]).then(({ action })=> {
        switch (action){
            case "Create":
            //console.log ("create!!"); //testing node connection and clear
                createEmployee();
                break;
            case "View":
               // console.log ("view!!"); //testing node connection and clear
                viewEmployee();
                break;
            case "Update":
                //console.log ("update!!"); //testing node connection and clear
                updateEmployee();
                break;
            default:
               //console.log ("Anything further?"); 
                connection.end();
        }
    })
};

const createEmployee= () => {
    connection.query("SELECT * FROM department", (err, items) => {
        if (err) throw err; 
            inquirer.prompt([
                {//first is the department (name of department)
                    name:"name",
                    message: "What is the name of the Department?"
                },
            ]).then(({name}))
        })
    };





        {//this starts the role table, with values of title,salary and department_id 
            name:"title",
            message: "What is the title of the employee?"
        },
        {
            name: "salary",
            message: "What is the currently salary of the employee?",
            validate: function (val){
                //used to verify that a number was entered in
                if (isNaN(val)){
                    return `${val} is not a number.`
                } 
               return true;
            }
        },
        {
            name: "department_id",
            message: "What is the department ID of this employee?",
            validate: function (val){
                //used to verify that a number was entered in
                if (isNaN(val)){
                    return `${val} is not a number.`
                } 
               return true;
            }
        },
        {//starts the employee table values of first_name,last_name, role_id, manager_id
            name: "first_name",
            message: "What is the employees first name?"
        },
        {
            name: "last_name",
            message: "What is the employees last name?"
        },
        {
            name: "role_id",
            message: "What is the role ID?",
            validate: function (val){
                //used to verify that a number was entered in
                if (isNaN(val)){
                    return `${val} is not a number.`
                } 
               return true;
            }
        },
        {
            name: "manager_id",
            message: "What is the manager ID? If not manager, leave blank.",
            validate: function (val){
                //used to verify that a number was entered in
                if (isNaN(val)){
                    return `${val} is not a number.`
                } 
               return true;
            }
        }
    ])
}


// connecting to our database
connection.connect((err)=> {
    if (err) throw err;
    console.log(`Now connected to MySQL at thread ${connection.threadID}!`);
    userMenu();
});