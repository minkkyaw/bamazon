const addSpace = (str, length) => {
  while (str.length < length) {
    str = str + " ";
  }
  return str;
};

const viewDepartment = departments => {
  const showDepartments = [
    "| department_id | department_name | over_head_costs | product_sales | total_profit |",
    "| ------------- | --------------- | --------------- | ------------- | ------------ |"
  ];
  showDepartments.push(
    departments.map(
      department =>
        `| ${addSpace(
          department.department_id < 10
            ? "0" + department.department_id
            : department.department_id + "",
          13
        )} | ${addSpace(department.department_name + "", 15)} | ${addSpace(
          department.over_head_costs + "",
          15
        )} | ${addSpace(department.product_sales + "", 13)} | ${addSpace(
          department.total_profit + "",
          12
        )} |`
    )
  );
  console.log(showDepartments.join("\n"));
};

const viewProducts = products => {
  const showProducts = [
    "| item_id | product_name | department_name | price | stock_quantity |",
    "| ------- | ------------ | --------------- | ----- | -------------- |"
  ];
  showProducts.push(
    products.map(
      product =>
        `| ${addSpace(
          product.item_id < 10 ? "0" + product.item_id : product.item_id + "",
          7
        )} | ${addSpace(product.product_name + "", 12)} | ${addSpace(
          product.department_name + "",
          15
        )} | ${addSpace(product.price + "", 5)} | ${addSpace(
          product.stock_quantity + "",
          13
        )} |`
    )
  );
  console.log(showProducts.join("\n"));
};

const viewLowInventory = products => {
  const lowInventory = products.fileter(product => product.stock_quantity < 5);
  const showProducts = [
    "| item_id | product_name | department_name | price | stock_quantity |",
    "| ------- | ------------ | --------------- | ----- | -------------- |"
  ];
  if (lowInventory.length === 0) return console.log("No low Inventory");
  showProducts.push(
    lowInventory.map(
      product =>
        `| ${addSpace(
          product.item_id < 10 ? "0" + product.item_id : product.item_id + "",
          7
        )} | ${addSpace(product.product_name + "", 12)} | ${addSpace(
          product.department_name + "",
          15
        )} | ${addSpace(product.price + "", 5)} | ${addSpace(
          product.stock_quantity + "",
          13
        )} |`
    )
  );
  console.log(showProducts.join("\n"));
};
