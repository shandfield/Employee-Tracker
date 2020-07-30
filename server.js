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
//!Ask brian: I have it set up to go from department, straight into role then once done goes into employee- is that the best way? 
const createEmployee= () => {
    inquirer.prompt([//two stitch cases
        {
            type: "list",
            name: "action",
            message: "Which table would you like to work on?",
            choices:["Department", "Role","Employee","Exit"] 
        }
    ]).then(({ action})=>{
        switch (action){
            case "Department":
                departmentInfo();
                break;
            case "Role":
                roleInfo();
                break;
            case "Employee":
                employeeInfo();
                break;
            default:
                connection.end();
        }
    })
};

const departmentInfo = () => {
    inquirer.prompt([
        {//first is the department (name of department)
            name:"name",
            message: "What is the name of the Department?"
        }
    ]).then(({name}) => {
        connection.query("INSERT INTO department SET ?", {name},
        (err, result) => {
            if (err) throw err;
            console.log (`Successfully add ${name} into the department table.`),
            roleInfo();
        }
      )
    })
};

//this starts the role table, with values of title,salary and department_id 
const roleInfo = () => {
    inquirer.prompt ([ 
         {
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
        }
    ]).then(({title, salary, department_id}) => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title,
                salary,
                department_id
            },
            (err, result) => {
                if (err) throw err;
                console.log(`Successfully created a role table.`);
                employeeInfo();
            }
        )
    })
};

//starts the employee table values of first_name,last_name, role_id, manager_id
const employeeInfo = () => {
    inquirer.prompt ([
            {
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
                message: "What is the manager ID? If not a manager, type in 0.",
            }
    ]).then(({first_name, last_name, role_id, manager_id}) => {
        connection.query(
            "INSERT INTO employee SET ?", 
            {
                first_name,
                last_name,
                role_id,
                manager_id
            },
            (err, result) => {
                if (err) throw err;
                console.log (`Successfully created employee table with information entered.`),
                userMenu();
            }
        )
    })
};
      
//!just to view all employees using 3 tables 
const viewEmployee = () => {

}

    //*!when doing this function: remember you have three data tables and need to specify where the update is going (department, role or employee) and what information from those tables is being updated!
        function updateEmployee() {
          
          }


// connecting to our database
connection.connect((err)=> {
    if (err) throw err;
    console.log(`Now connected to MySQL at thread ${connection.threadID}!`);
    userMenu();
});