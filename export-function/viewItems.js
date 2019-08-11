/* eslint-disable prefer-template */
const mysql = require('mysql');

const bamazonManager = require('./../bamazonManager');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345Mkk',
  database: 'bamazon_db'
});

const addSpace = (str, length) => {
  while (str.length < length) {
    str = str + ' ';
  }
  return str;
};

const addSpaceBefore = (str, length) => {
  while (str.length < length) {
    str = ' ' + str;
  }
  return str;
};

const viewProductsCustomer = products => {
  const showProducts = [
    '| item_id | product_name      | price |',
    '| ------- | ----------------- | ----- |'
  ];

  products.map(product =>
    showProducts.push(
      `| ${addSpace(
        product.item_id < 10 ? '0' + product.item_id : product.item_id + '',
        7
      )} | ${addSpace(product.product_name + '', 17)} | ${addSpaceBefore(
        product.price + '',
        5
      )} |`
    )
  );
  console.log(showProducts.join('\n'));
};

const viewInvoice = products => {
  if (products.length === 0) {
    console.log(`Thank you for visiting bamazon!`);
  } else {
    const showInvoice = [
      '| item_id | product_name      | price   | quantity | amount    |',
      '| ------- | ----------------- | ------- | -------- | --------- |'
    ];

    products.map(product =>
      showInvoice.push(
        `| ${addSpace(
          product.item_id < 10 ? '0' + product.item_id : product.item_id + '',
          7
        )} | ${addSpace(product.product_name + '', 17)} | ${addSpaceBefore(
          product.price.toFixed(2) + '',
          7
        )} | ${addSpaceBefore(product.quantity + '', 8)} | ${addSpaceBefore(
          product.product_sales.toFixed(2) + '',
          9
        )} |`
      )
    );
    let total_quantity = products
      .map(product => product.quantity)
      .reduce((x, y) => x + y);
    let total_product_sales = products
      .map(product => product.product_sales)
      .reduce((x, y) => x + y);
    showInvoice.push(
      '| ------- | ----------------- | ------- | -------- | --------- |',
      `| ${addSpace('Taxes', 7)} | ${addSpace('', 17)} | ${addSpaceBefore(
        '',
        7
      )} | ${addSpaceBefore('', 8)} | ${addSpaceBefore(
        (total_product_sales * 0.08).toFixed(2) + '',
        9
      )} |`,
      `| ${addSpace('Total', 7)} | ${addSpace('', 17)} | ${addSpaceBefore(
        '',
        7
      )} | ${addSpaceBefore(total_quantity + '', 8)} | ${addSpaceBefore(
        (total_product_sales * 1.08).toFixed(2) + '',
        9
      )} |`
    );
    console.log(showInvoice.join('\n'));
  }
};

const viewProducts = products => {
  const showProducts = [
    '',
    '| item_id | product_name    | department_name      | price | stock_quantity |',
    '| ------- | --------------- | -------------------- | ----- | -------------- |'
  ];
  products.map(product =>
    showProducts.push(
      `| ${addSpace(
        product.item_id < 10 ? '0' + product.item_id : product.item_id + '',
        7
      )} | ${addSpace(product.product_name + '', 15)} | ${addSpace(
        product.department_name + '',
        20
      )} | ${addSpace(product.price + '', 5)} | ${addSpace(
        product.stock_quantity + '',
        14
      )} |`
    )
  );
  console.log(showProducts.join('\n'));
  // console.log(bamazonManager);
};

const viewLowInventory = products => {
  let lowInventory = products.filter(product => product.stock_quantity < 5);
  const showProducts = [
    '',
    '| item_id | product_name    | department_name      | price | stock_quantity |',
    '| ------- | --------------- | -------------------- | ----- | -------------- |'
  ];
  lowInventory.map(product =>
    showProducts.push(
      `| ${addSpace(
        product.item_id < 10 ? '0' + product.item_id : product.item_id + '',
        7
      )} | ${addSpace(product.product_name + '', 15)} | ${addSpace(
        product.department_name + '',
        20
      )} | ${addSpace(product.price + '', 5)} | ${addSpace(
        product.stock_quantity + '',
        14
      )} |`
    )
  );
  console.log(showProducts.join('\n'));
};

const viewDepartments = () => {
  connection.query('SELECT * FROM departments', (err, departments) => {
    if (err) throw err;
    const showDepartments = [
      '',
      '| department_id | department_name      | over_head_costs | product_sales | total_profit |',
      '| ------------- | -------------------- | --------------- | ------------- | ------------ |'
    ];

    departments.map(department =>
      showDepartments.push(
        `| ${addSpace(
          department.department_id < 10
            ? '0' + department.department_id
            : department.department_id + '',
          13
        )} | ${addSpace(department.department_name + '', 20)} | ${addSpace(
          department.over_head_costs + '',
          15
        )} | ${addSpace(department.product_sales + '', 13)} | ${addSpace(
          department.total_profit + '',
          12
        )} |`
      )
    );
    console.log(showDepartments.join('\n'));
  });
};

module.exports = {
  addSpace,
  addSpaceBefore,
  viewDepartments,
  viewLowInventory,
  viewProducts,
  viewProductsCustomer,
  viewInvoice
};
