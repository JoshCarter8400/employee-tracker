const fs = require("fs");
const inquirer = require("inquirer");

const cTable = require("console.table");
const db = require("./db/class");
const { connection, updateRole } = require("./db/class");
const menuPrompt = function () {
  let questions = [
    {
      type: "list",
      name: "name",
      message: "What would you like to do?",
      choices: [
        "View all roles",
        "View all employees",
        "Add an Employee",
        "Add a department",
        "Add a role",
        "View all Departments",
        "Update employee role",
      ],
    },
  ];
  inquirer.prompt(questions).then((choice) => {
    switch (choice.name) {
      case "Add an Employee":
        addEmployee();
        break;
      case "View all Departments":
        viewDepartment();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Update employee role ID":
        updateRole();
      default:
        console.log("Please make a choice");
    }
  });
};

menuPrompt();

const viewDepartment = () => {
  db.viewDepartment().then(([rows]) => {
    console.table(rows);
    menuPrompt();
  });
};

const viewEmployees = () => {
  db.viewEmployees().then(([rows]) => {
    console.table(rows);
  });
};

const viewRoles = () => {
  db.viewRoles().then(([rows]) => {
    console.table(rows);
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter first name.",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter last name.",
      },
      {
        type: "input",
        name: "role_id",
        message: "Please enter role ID.",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Please enter manager ID.",
      },
    ])
    .then((res) => {
      db.addEmployee({
        first_name: res.first_name,
        last_name: res.last_name,
        role_id: res.role_id,
        manager_id: res.manager_id,
      });
      console.log("Employee was successfully added");

      menuPrompt();
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department would you like to add?",
        choices: ["Bulls", "Sonics", "Cavs", "Rockets", "Knicks", "Lakers"],
      },
    ])
    .then((res) => {
      db.addDepartment({
        name: res.department,
      });
      console.log("Department added successfully");
      menuPrompt();
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role you would like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role you would like to add?",
      },
      {
        type: "input",
        name: "department",
        message:
          "What is the  department id of the role you would like to add?",
      },
    ])
    .then((res) => {
      db.addRole({
        title: res.title,
        salary: res.salary,
        department_id: res.department,
      });
      console.log("Role was added successfully");
      menuPrompt();
    });
};

const updateRole = () => {
  viewEmployees();
  inquirer
    .prompt({
      type: "list",
      type: "role",
      message: "Please select the new role ID for your employee",
      choices: ["1", "2", "3"],
    })
    .then((res) => {
      db.updateRole({
        role_id: res.role,
      });
      console.log("Role was successfully updated");
      menuPrompt();
    });
};
