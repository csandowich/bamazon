create database bamazon;
use bamazon;
create table products(
item_id int not null auto_increment,
product_name varchar(50) not null,
department_name varchar(30) not null,
price decimal(7,2) not null,
stock_quantity int(3) not null,
primary key(item_id)

);

select * from products;
insert into products (product_name, department_name, price, stock_quantity)values ("Destiny", "Video Games", 59.99, 50),
("Destiny 2", "Video Games", 59.99, 200),
("The Bible", "Books", 20.00, 60),
("Harry Potter and the Sorcerer's Stone", "Books", 23.00, 100),
("Pokemon Booster Pack", "Toys", 3.99, 36),
("Fidget Spinner", "Toys", 4.99, 50),
("Mens Romper", "Apparel", 40.99, 10),
("Blue Socks", "Apparel", 9.99, 10),
("Deodorant", "Personal Care", 6.59, 15),
("Toothpaste", "Personal Care", 2.99, 20);
select * from products;
UPDATE products SET stock_quantity = 50  WHERE item_id = 1;
