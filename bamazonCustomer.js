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

// let productsBought = [];

// connection.connect(function(err) {
//   if (err) throw err;
//   connection.query('SELECT * FROM products', (err, res) => {
//     if (err) throw err;
//     customerFunction(res);
//   });
// });

// const customerFunction = res => {
//   inquirer
//     .prompt([
//       {
//         name: 'action',
//         type: 'list',
//         message: 'What do you want to do?',
//         choices: ['Buy Product', 'Exit']
//       }
//     ])
//     .then(ans => {
//       if (ans.action === 'Exit') {
//         viewItems.viewInvoice(productsBought);
//         setTimeout(() => connection.end(), 5000);
//       } else {
//         viewItems.viewProductsCustomer(res);

//         inquirer
//           .prompt([
//             {
//               name: 'id',
//               type: 'number',
//               message: 'What product(id) would you like to buy?',
//               validate: value => (isNaN(value) ? false : true)
//             },
//             {
//               name: 'quantity',
//               type: 'number',
//               message: 'How many would you like to buy?',
//               validate: value => (isNaN(value) ? false : true)
//             }
//           ])
//           .then(response => {
//             actions.buyProduct(response.id, response.quantity, productsBought);
//             setTimeout(() => customerFunction(res), 1000);
//           });
//       }
//     });
// };
