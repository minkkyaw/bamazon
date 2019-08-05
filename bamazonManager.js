// const inquirer = require('inquirer');
// const mysql = require('mysql');

// const viewItems = require('./export-function/viewItems');
// const actions = require('./export-function/actions');

// let connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '12345Mkk',
//   database: 'bamazon_db'
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   connection.query('SELECT * FROM products', (err, res) => {
//     if (err) throw err;
//     managerFunction(res);
//   });
// });

// const managerFunction = res => {
//   inquirer
//     .prompt({
//       name: 'action',
//       type: 'list',
//       message: 'What would you like to do?',
//       choices: [
//         'View Products for Sale',
//         'View Low Inventory',
//         'Add to Inventory',
//         'Add New Product',
//         'Exit'
//       ]
//     })
//     .then(ans => {
//       switch (ans.action) {
//         case 'View Products for Sale':
//           viewItems.viewProducts(res);
//           break;
//         case 'View Low Inventory':
//           viewItems.viewLowInventory(res);
//           break;
//         case 'Add to Inventory':
//           actions.addToInventory();
//           break;
//         case 'Add New Product':
//           actions.addNewProduct();
//           break;
//         default:
//           connection.end();
//           break;
//       }
//     });
// };

// module.exports = { managerFunction };
