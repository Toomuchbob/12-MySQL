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

function add() {
    inq.prompt([
        {
            type: "list",
            message: "Select which table to add to:",
            name: "add",
            choices: ["Employees", "Roles", "Departments"]
        }
    ]).then(response => {
        switch (response.add) {
            case "Employees":
                connection.query("SELECT * FROM role", (err, res) => {
                    if (err) throw err;
                    const roles = res.map(e => e.title);

                    inq.prompt([
                        {
                            type: "input",
                            message: "Enter First Name: ",
                            name: "first_name"
                        }, {
                            type: "input",
                            message: "Enter Last Name: ",
                            name: "last_name"
                        }, {
                            type: "list",
                            message: "Select a role: ",
                            name: "title",
                            choices: roles
                        }
                    ]).then(data => {
                        const role = res.filter(e => {
                            if (e.title === data.title) {
                                return e.id;
                            };
                        });
                        connection.query("INSERT INTO employee SET ?",
                            {
                                first_name: data.first_name,
                                last_name: data.last_name,
                                role_id: role[0].id
                            },
                            (err, res) => {
                                if (err) throw err;
                            });
                    });
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
                add();
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
