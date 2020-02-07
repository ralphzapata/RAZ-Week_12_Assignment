
// Connections
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "hntg3kpD",
  database: "employeeTracker_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    start();
  });


   // CHOICES
   let MainChoicesOptions = [
    "Add Employee",
    "View all Employee",
    "Remove Employee",
    "Update Employee",
    "Update Employee Manager",
    "View Roles",
    "Add Roles",
    "Remove Roles",
    "View Department",
    "Add Department",
    "exit"
    ];

    let DepartmentChoicesOptions = [
    "Solutions Consulting",
    "Sales",
    "Engineering",
    "Human Resources",
    "Commercial",
    "IT Service Desk",
    "Accounting",
    "Delivery",
    "Purchasing",
    "Executives",
    ];


   // Main Choice 
function start() {
    inquirer
      .prompt({
        name: "userInput",
        type: "list",
        message: "What would you like to do?",
        choices: MainChoicesOptions
      })
      .then(function(answer) {   
        switch(answer.userInput) {

          case 'Add Employee':
            AddEmployee();
            break;

          case 'View all Employee':
              ViewEmployee();
            break;    

          case 'Remove Employee':
              RemoveEmployee();
            break;   
            
          case 'Update Employee':
              UpdateEmployee();
            break;   
              
          case 'Update Employee Manager':
              UpdateManager();
            break;   
              
          case 'View Roles':
              ViewRoles();
            break; 

          case 'Add Roles':
              AddRoles();
            break; 

          case 'Remove Roles':
            RemoveRoles();
            break;   

        
          case 'View Department':
            ViewDepartment();
            break;  
            
          case 'Add Department':
                AddDepartment();
            break;  
                

          case 'EXIT':
            connection.end();
            break;        
       }
    });
  }


// function AddEmployee()
function AddEmployee() {
    inquirer
      .prompt([
        {
          name: "firstname",
          type: "input",
          message: "What is the employee first name?"
        },
        {
          name: "lastname",
          type: "input",
          message: "What is the employee last name?"
        },
        {
          name: "roleid",
          type: "input",
          message: "What is the role's ID?",
          },
        {
          name: "managerid",
          type: "input",
          message: "What is the Manager's ID?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.employeeid,
            manager_id: answer.managerid
          },
          function(err) {
            if (err) throw err;
            console.log("You successfully added the Employee!");
            start();
          }
        );
      });
  }

  // function ViewEmployee()
  function ViewEmployee() {
    connection.query(
      "SELECT * FROM employee",
      function(err, result) {
        if (err) throw err;
        console.table(result);
        start();
      }
    );
  }



  // function  RemoveEmployee()
  function  RemoveEmployee() {
    connection.query(
      "DELETE FROM employee SET ?",
      function(err, result) {
        if (err) throw err;
        console.log("You successfully deleted an Employee!");
        start();
      }
    );
  }

  // function AddRoles()
function AddRoles() {
    inquirer
      .prompt([
        {
          name: "titlename",
          type: "input",
          message: "What is the Role name?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the Annual Salary?"
        },
        {
          name: "department_id",
          type: "input",
          message: "What is the Department id?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.titlename,
            salary: answer.salary,
            department_id: answer.department_id || 0
          },
          function(err) {
            if (err) throw err;
            console.log("You successfully added a Role!");
            start();
          }
        );
      });
  }

    // function ViewRoles()
    function ViewRoles() {
        connection.query(
          "SELECT * FROM role",
          function(err, result) {
            if (err) throw err;
            console.table(result);
            start();
          }
        );
      }


          // function ViewDepartment()
    function ViewDepartment() {
        connection.query(
          "SELECT * FROM department",
          function(err, result) {
            if (err) throw err;
            console.table(result);
            start();
          }
        );
      }

      // function AddDepartment()
function AddDepartment() {
    inquirer
      .prompt([
        {
          name: "department_id",
          type: "list",
          message: "What is the Department id?",
          choices: DepartmentChoicesOptions,
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.department_id
          },
          function(err) {
            if (err) throw err;
            console.log("You successfully added a Department!");
            start();
          }
        );
      });
  }