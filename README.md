# BamaZon

**BamaZon** is a cli node.js based shopping simulator. When the user, or pseudo-consumer, enters the site, he or she is shown a list of faux products. The consumer can then scroll down a list of the same items and choose a product to buy. If there is enough of the chosen product, it will be sold to the consumer, the price of the purchase will be displayed, and the quantity of the product purchased will be subtracted from the database. If the consumer requests an item that is not in stock, or if there is not enough of the item to fill the consumer's order, he or she will be given the option to re-order or to return at a later time.

Here is the list of products that opens the application:
![Screenshot (14)](images\Screenshot (14).png)

In this screenshot, the consumer purchases **200 roofing tiles**, later the amount of **roofing tiles** in the **mySQL database** goes from 5000 to 4800:
![Screenshot (17)](images\Screenshot (17).png)

Also, notice that there are three **fuel-injectors** available in the following database:
![Screenshot (18)](images\Screenshot (18).png)

After this transaction there will only be one **fuel-injector**:
![Screenshot (19)](images\Screenshot (19).png)
![Screenshot (20)](images\Screenshot (20).png)
Please note that there are still three **cat bath**s available in this snapshot of the database.

In the following example three **cat baths** are purchased. The consumer then returns to buy another **cat bath**, but sadly now there are none. This is reflected in the database:
![Screenshot (22)](images\Screenshot (22).png)
The initial transaction.

![Screenshot (23)](images\Screenshot (23).png)
Sadly, no more **cat baths**.

![Screenshot (24)](images\Screenshot (24).png)
A peek at the database confirms that there are indeed no more **cat baths**. :(

This program was enhanced by npm **Chalk**, a program that adds color to the command line. 


