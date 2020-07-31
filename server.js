const mysql = require("mysql");
const inquirer = require("inquirer");
//const cTable = require('console.table'); //*will need to look more into this 

// setting up our database connection (but not connecting yet!)
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeetracker_db"
});

//building the command line that allows a user to make data entries regarding their staff:
//*when working back on this add a deletion function with code
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
      
//asking user which table they would like to view, there are three
const viewEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Which table would you like to view?",
            choices:["Department", "Role","Employee","Exit"] 
        }
    ]).then(({ action})=>{
        switch (action){
            case "Department":
                departmentView();
                break;
            case "Role":
                roleView();
                break;
            case "Employee":
                employeeView();
                break;
            default:
                connection.end();
        }
    })
};
//made functions for each of the views 
const departmentView = () => {
    console.log ("Showing information by Department... \n");
    connection.query("SELECT * FROM department", (err,res)=>{
        if (err) throw err;
        console.log(res);
        userMenu();
    });
};
const roleView = () => {
    console.log ("Showing information by role... \n");
    connection.query("SELECT * FROM role", (err,res)=>{
        if (err) throw err;
        console.log(res);
        userMenu();
    });
};
const employeeView = () => {
    console.log ("Selecting all employees... \n");
    connection.query("SELECT * FROM employee", (err,res)=>{
        if (err) throw err;
        console.log(res);
        userMenu();
    });
};
      

    // this is just updating employee table
const updateEmployee =() => {
        connection.query("SELECT * FROM employee", (err, person) =>{
            if (err) throw err;
            inquirer.prompt ([
                {//selecting which employee the user wants to updats
                    type: "rawlist",
                    name: "name",
                    message: "Which employee would you like to update?",
                    choices: person.map(employee => employee.first_name + employee.last_name)
                },
                {//asks the user what the new role_id is
                    name: "role_id",
                    message: "What is the new role ID for this employee?",
                    validate: function (val){
                        //used to verify that a number was entered in
                        if (isNaN(val)){
                            return `${val} is not a number.`
                        } 
                       return true;
                    }
                }
            ]).then(({role_id}) => {
               // const match = person.find(employee => employee.name === name);
                if (role_id != this.role_id){
                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                       [
                        {role_id},
                        {id: role_id},
                       ],
                        (err, res) => {
                            if (err) throw err;
                            console.log (res.affectedRows+ "employee role updated.\n");
                            userMenu();
                        }           
                    )     
               }
            })
    });
};

// connecting to our database
connection.connect((err)=> {
    if (err) throw err;
    console.log("Now connected to MySQL!")
    userMenu();
});