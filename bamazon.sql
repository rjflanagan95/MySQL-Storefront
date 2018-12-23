DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Kitchen Appliances", 60, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fondue Maker", "Kitchen Appliances", 45, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cordless Vacuum", "Home Electronics", 65, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Machine", "Kitchen Appliances", 180, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hiking Backpack", "Sporting Goods", 50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomba", "Home Electronics", 200, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mountain Bike", "Sporting Goods", 600, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4K TV", "Home Electronics", 400, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Full Mattress", "Furniture and Bedding", 360, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Large Rug", "Furniture and Bedding", 130, 100);

SELECT * FROM products