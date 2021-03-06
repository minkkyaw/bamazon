const inquirer = require('inquirer');
const mysql = require('mysql');

const viewItems = require('./viewItems');
const bamazonManager = require('./../bamazonManager');
const bamazonSupervisor = require('./../bamazonSupervisor');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345Mkk',
  database: 'bamazon_db'
});

const buyProduct = (id, quantity, productsBought) => {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;
    let currProduct = res.find(product => product.item_id === id);

    if (currProduct.stock_quantity < quantity) {
      console.log('Not enough quantity');
    } else {
      currProduct.product_sales = currProduct.price * quantity;
      const { item_id, product_name, price, product_sales } = currProduct;
      productsBought.find(product => product.item_id === currProduct.item_id)
        ? productsBought.forEach(product => {
            if (product.item_id === currProduct.item_id) {
              product.quantity += quantity;
              product.product_sales += currProduct.product_sales;
            }
          })
        : productsBought.push({
            item_id,
            product_name,
            price,
            quantity,
            product_sales
          });
      connection.query('UPDATE products SET ?,? WHERE ?', [
        { stock_quantity: currProduct.stock_quantity - quantity },
        { product_sales: currProduct.product_sales },
        { item_id: id }
      ]);
      connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;

        const [product_sale, total_profit] = res
          .filter(
            department =>
              department.department_name === currProduct.department_name
          )
          .map(department => {
            return [
              department.product_sales + currProduct.product_sales,
              department.total_profit + currProduct.product_sales
            ];
          })[0];
        connection.query('UPDATE departments SET ? WHERE ?', [
          { product_sales: product_sale },
          { department_name: currProduct.department_name }
        ]);
        connection.query('UPDATE departments SET ? WHERE ?', [
          { total_profit: total_profit },
          { department_name: currProduct.department_name }
        ]);
      });
    }
  });
};

const addToInventory = () => {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'product_name',
          type: 'list',
          message: 'What product do you want to add?',
          choices: () => {
            let choices = [];
            res.map(product => choices.push(product.product_name));
            return choices;
          }
        },
        {
          name: 'stock_quantity',
          type: 'number',
          message: 'How many do you want to add?',
          validate: input => (!isNaN(input) ? true : false)
        }
      ])
      .then(ans => {
        const { product_name, stock_quantity } = ans;
        let total_stock =
          res
            .filter(product => product.product_name === product_name)
            .map(product => product.stock_quantity)[0] + stock_quantity;
        connection.query('UPDATE products SET ? WHERE ?', [
          { stock_quantity: total_stock },
          { product_name: product_name }
        ]);
      })
      .then(() => {
        connection.query('SELECT * FROM products', (err, products) => {
          if (err) throw err;
          viewItems.viewProducts(products);
        });
      });
  });
};

const addNewProduct = () => {
  connection.query('SELECT * FROM products', (err, products) => {
    if (err) throw err;

    connection.query('SELECT * FROM departments', (err, departments) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: 'product_name',
            type: 'input',
            message: 'What product do you want to add?'
          },
          {
            name: 'department_name',
            type: 'list',
            message: 'What is the department of the product?',
            choices: () => {
              let choices = [];
              departments.map(department =>
                choices.push(department.department_name)
              );
              return choices;
            }
          },
          {
            name: 'price',
            type: 'number',
            message: 'What is the price amount of the product?',
            validate: input => (!isNaN(input) ? true : false)
          },
          {
            name: 'stock_quantity',
            type: 'number',
            message: 'How many do you want to add?',
            validate: input => (!isNaN(input) ? true : false)
          }
        ])
        .then(ans => {
          const { product_name, department_name, price, stock_quantity } = ans;
          connection.query('INSERT INTO products SET ?', {
            product_name: product_name,
            department_name: department_name,
            price: price,
            stock_quantity: stock_quantity
          });
        })
        .then(() => {
          setTimeout(() => {
            connection.query('SELECT * FROM products', (err, products) => {
              if (err) throw err;
              viewItems.viewProducts(products);
            });
            // setTimeout(() => bamazonManager.managerFunction(products), 100);
          }, 600);
        });
    });
  });
};

const createNewDept = () => {
  connection.query('SELECT * FROM departments', (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'department_name',
          type: 'input',
          message: 'What is the name of the new department?',
          validate: input =>
            !departments.some(
              dept => dept.department_name.toLowerCase() === input
            )
              ? true
              : 'already had this department!'
        },
        {
          name: 'over_head_costs',
          type: 'number',
          message: 'What is the over_head_costs of the new department?',
          validate: input => (isNaN(input) ? 'Not a number!' : true)
        }
      ])
      .then(ans => {
        connection.query('INSERT INTO departments SET ?', {
          department_name: ans.department_name
            .toLowerCase()
            .replace(/(^|\s)\S/, x => x.toUpperCase()),
          over_head_costs: ans.over_head_costs,
          total_profit: -ans.over_head_costs
        });
        setTimeout(() => viewItems.viewDepartments(), 500);
      });
    // .then(() => bamazonSupervisor.supervisorFunction());
  });
};

module.exports = { buyProduct, addToInventory, addNewProduct, createNewDept };
