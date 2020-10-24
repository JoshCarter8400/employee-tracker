const connection = require("./database");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  viewDepartment() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  viewEmployees() {
    return this.connection.promise().query("SELECT * FROM employees");
  }

  viewRoles() {
    return this.connection.promise().query("SELECT * FROM role");
  }

  addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT into employees set ?", employee);
  }

  addDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT into department set ?", department);
  }

  addRole(role) {
    return this.connection.promise().query("INSERT into role SET ?", role);
  }

  updateRole(update) {
    return this.connection
      .promise()
      .query("UPDATE employee SET ? WHERE ?", update);
  }
}

module.exports = new DB(connection);
