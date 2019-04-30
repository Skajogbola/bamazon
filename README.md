# Bamazon

## Description

This application implements a simple command line based storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together with the npm [mysql](https://www.npmjs.com/package/mysql) package. The application presents two interfaces: **customer** and **manager**.

### Customer Interface

The customer interface allows the user to view the current inventory of store items include the ids, names, and prices of products for sale. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. 

![order_purchase](https://github.com/Skajogbola/bamazon/blob/master/images/customer.PNG)

If the desired quantity is not available, the app logs a phrase "Insufficient quantity!", and then prevent the order from going through.

![order_purchase](https://github.com/Skajogbola/bamazon/blob/master/images/customerB.PNG)

To run the customer interface please follow the steps below:

	git clone git@github.com:Skajogbola/bamazon.git
	cd bamazon
	npm install
	node bamazonCustomer.js

### Manager Interace

The manager interface presents a list of four options, as below. 

	? Please select an option: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product
	  exit
	  
The **View Products for Sale** option allows the user to view the current inventory of store items: item IDs, product name, price, and the quantity available in stock. 

![order_purchase](https://github.com/Skajogbola/bamazon/blob/master/images/manager1.PNG)

The **View Low Inventory** option shows the user the items which currently have fewer than 5 units available.

![order_purchase](https://github.com/Skajogbola/bamazon/blob/master/images/manager2.PNG)

The **Add to Inventory** option allows the user to select a given item ID and add additional inventory to the target item.

![order_purchase](https://github.com/Skajogbola/bamazon/blob/master/images/manager3.PNG)

The **Add New Product** option allows the user to enter details about a new product which will be entered into the database upon completion of the form.

![order_purchase](https://github.com/Skajogbola/bamazon/blob/master/images/manager4a.PNG)

![order_purchase](https://github.com/Skajogbola/bamazon/blob/master/images/manager4b.PNG)

To run the manager interface please follow the steps below:

	git clone git@github.com:Skajogbola/bamazon.git
	cd bamazon
	npm install
	node bamazonManager.js
