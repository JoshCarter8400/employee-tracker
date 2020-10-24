const fs = require("fs");
const inquirer = require("inquirer");
const connection = require("./db/database");

let questions = [
  {
    type: "list",
    name: "name",
    message: "What would you like to do?",
    choices: [
      "view all roles",
      "View all employees",
      "Add an Employee",
      "Add a department",
      "Add a role",
      "View all departments",
      "Update employee role",
    ],
  },
];
inquirer.prompt(questions).then((choice) => {
  switch (choice.name) {
    case "Add Employee":
      addEmployee();
      break;
    case "View Department":
      viewDepartment();
      break;
    default:
      console.log("Please make a choice");
  }
});

const viewDepartment = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Please choose your position",
        choices: ["Guard", "Forward", "Center"],
      },
    ])
    .then((questions) => {
      const query = connection.quey("SELECT * FROM department");
      viewDepartment();
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
    .then((questions) => {
      const query = connection.query("INSERT INTO department set ?");
      addDepartment();
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter first name.",
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
    .then((answers) => {
      const query = connection.query(
        "INSERT into employee set ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee inserted!\n");
          // Call addEmployee() AFTER the INSERT completes
          addEmployee();
        }
      );
    });
};
