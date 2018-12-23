# MySQL-Storefront

## Customer View
### How to Use
Run the command `node bamazoncustomer.js` in the command line. You will be shown a list of available products and their prices. Next you will be asked to specify the item ID and quantity of the product you wish to purchase. If the quantity you wish to purchase in stock, the database will be updated and you will be shown the total price. If the quantity is not available, you will be asked to make another selection.

## Manager View
### How to Use
Run the command `node bamazonmanager.js` in the command line. You will be shown a list of command options.

* "View products for sale"
-Shows all items for sale, including price and quantity

* "View low inventory"
-Shows all items for sale with fewer than 5 units left in stock

* "Add to inventory"
-Change the total quantity in stock for a particular item

* "Add new item to store"
-Add an entirely new item to the store