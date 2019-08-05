const mysql = require('mysql');
const inquirer = require('inquirer');

const viewItems = require('./export-function/viewItems');
const actions = require('./export-function/actions');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345Mkk',
  database: 'bamazon_db'
});

connection.connect(function(err) {
  if (err) throw err;
  supervisorFunction();
});

const supervisorFunction = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What do you want to do?',
      choices: ['View Product Sales by Department', 'Create New Department']
    })
    .then(ans => {
      if (ans.action === 'View Product Sales by Department') {
        viewItems.viewDepartments();
        setTimeout(() => supervisorFunction(), 100);
      } else {
        actions.createNewDept();
      }
    });
};

module.exports = { supervisorFunction };
