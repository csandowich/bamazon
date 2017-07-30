var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  productList();
});
var productList = function() {
  connection.query('SELECT * FROM products', function(err, res) {
    // console.log(err);
    // console.log(res);
    var list = {
      titles: ['item_id', 'product_name', 'depamrent_name', 'price', 'stock_quantity']
    };
    // var list2 =
    console.log('These are the products you can purchase!');
    console.log('\n');

    console.log(JSON.stringify(list.titles).trim());
    console.log('\n');
    for (i = 0; i < res.length; i++) {
      console.log(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
    }
    console.log("______________________________________________________________________");
    start();
  });
};
var start = function() {
  inquirer.prompt([{
      name: "product",
      type: "input",
      message: "Which item_id (1-10) do you want to buy?",
      validate: function(num) {
        if (isNaN(num) === false) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      name: "quantity",
      type: "input",
      message: "How much would you like to buy of that item_id?",
      validate: function(num) {
        if (isNaN(num) === false) {
          return true;
        } else {
          return false;
        }
      }
    }

  ]).then(function(answer) {

    // console.log(answer.quantity);
    //var userChoice = "SELECT * FROM products WHERE item_id=?";
    connection.query("SELECT * FROM products", [answer.item_id], function(err, res) {
      //console.log(answer.product);
      // console.log(res[0].stock_quantity);
      var stockQuantity = res[0].stock_quantity;
      var price = res[0].price;
      var productName = res[0].product_name;
      console.log(productName);
      console.log('\n');
      if (stockQuantity < answer.quantity) {
        console.log('We do not have that many! Please pick a lower quantity.');
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

        productList();

      } else {
          var totalCost = answer.quantity * price;
          var newStock = stockQuantity - answer.quantity;
        console.log(" Your total cost was "+totalCost+" Thankyou for shopping!");
        console.log("");
      }

      var item = answer.product;
      // var totalCost = answer.quantity * price;
      // var newStock = stockQuantity - answer.quantity;
      // console.log(newStock);
      // console.log(answer.product);
      // console.log(item);
      connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStock, item],
        function(err, res) {
          if (err) {
            throw err;
          }


          moreStuff();
        });




    });


  });
};

var moreStuff = function (){
    inquirer.prompt([{
        name: "buyMore",
        type: "confirm",
        message: "Would you like buy anything else?",
    }]).then(function (answer) {

        if (answer.buyMore === true) {
            productList();
                }
        else {
          console.log('Have a nice day!');
          connection.end(function(err) {
          console.log('Goodbye.');
          });
                  }
        });
};



// connection.end(function(err) {
// console.log('Goodbye.');
// });
