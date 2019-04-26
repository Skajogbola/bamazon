-- create database
CREATE DATABASE bamazon;

USE bamazon;

-- create table
CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name varchar(100) NULL,
department_name varchar(100) NULL,
price decimal(10,2) NULL,
stock_quantity int NULL,
PRIMARY KEY (item_id)
);

-- insert values
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Dove Shampoo', 'Cosmetics', 5.75, 500),
		('Dove Conditioner', 'Cosmetics', 6.25, 627),
		('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 600),
		('Brawny Paper Towels', 'Grocery', 4.99, 400),
        ('Shoprite Ziploc ', 'Grocery', 4.25, 400),
        ('Roma Tomatoes', 'Produce', 3.25, 800),
        ('Haberano Pepper', 'Produce', 1.35, 853),
        ('Granny Smith Apples', 'Produce', 0.35, 800),
        ('Pampers Diapers', 'Baby', 47.99, 180),
        ('David Patio', 'Outdoors', 859.30, 425);
        




