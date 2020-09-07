const mysql = require("mysql");
const cTable = require("console.table");
const inq = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootroot",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

function view() {
    inq.prompt([
        {
            type: "list",
            message: "Select which table to view:",
            name: "view",
            choices: ["Employees", "Roles", "Departments"]
        }
    ]).then(response => {
        switch (response.view) {
            case "Employees":
                connection.query("SELECT * FROM employee", function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    prompt();
                });
                break;
            case "Roles":
                connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    prompt();
                });
                break;
            case "Departments":
                connection.query("SELECT * FROM department", function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    prompt();
                });
                break;
        };
    });
};


function prompt() {
    inq.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "toDoAction",
            choices: ["View...", "Add...", "Update..."]
        }
    ]).then(response => {
        switch (response.toDoAction) {
            case "View...":
                view();
                break;
            case "Add...":
                //add function
                break;
            case "Update...":
                //update function
                break;
            default:
                //view function
                break;
        };
    });
};

prompt();