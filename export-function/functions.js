const viewProducts = department => {
  const departments = [
    "| department_id | department_name | over_head_costs | product_sales | total_profit |",
    "| ------------- | --------------- | --------------- | ------------- | ------------ |"
  ];
  departments.push(
    department.map(
      department =>
        `| ${department.department_id}            | ${
          department.department_name
        }     | ${department.over_head_costs}           | ${
          department.product_sales
        }         | ${department.total_profit}        |`
    )
  );
  console.log(departments.join("\n"));
};

viewProducts([
  {
    department_id: 1,
    department_name: "Beverages",
    over_head_costs: 100,
    product_sales: 200,
    total_profit: 100
  }
]);
