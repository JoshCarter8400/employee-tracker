const fs = require("fs");
const inquirer = require("inquirer");
const connection = require("./db/database");

let questions = [
  {
    type: "list",
    name: "name",
    message: "What would you like to do?",
    choices: [
      "Update Employee Manager",
      "View all employees",
      "Add Employee",
      "Remove Employee",
      "View all employees by manager",
      "View all employees by department",
      "Update employee role",
    ],
  },
];
inquirer.prompt(questions).then((choice) => {
  switch (choice.name) {
    case "Add Employee":
      addEmployee();
      break;
    default:
      console.log("Please make a choice");
  }
});

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
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct() AFTER the INSERT completes
          addEmployee();
        }
      );
    });
};
