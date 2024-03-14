-- Criar o banco de dados:
CREATE DATABASE OnlineStore;

--PARA OS QUE USAM WORKBENCH:
-- CREATE SCHEMA OnlineStore;

-- Usar o banco:
USE OnlineStore;

CREATE TABLE Product(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    description VARCHAR(256),
    instock_quantity INT,
    price DECIMAL(8, 2) 
)

CREATE TABLE Customer(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    password VARCHAR(256),
    email VARCHAR(256) UNIQUE
)

CREATE TABLE ProductOrder(
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_id INT,
    product_quantity INT,
    CONSTRAINT FK_Product_Order
    FOREIGN KEY (product_id) REFERENCES Product(id),
    CONSTRAINT FK_Customer_Order
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
)

--- Exemplo de Insert

INSERT INTO Product (name, description, instock_quantity, price) 
VALUES ("Apple Macbook Pro", "15 inch, i7, 16GB RAM", 5, 667.00);

INSERT INTO Customer (name, password, email)
VALUES ("Pedro", "jujutsukaisen", "pedrinhootaku@gmail.com");

INSERT INTO ProductOrder (product_id, customer_id, product_quantity)
VALUES (1, 1, 1);


INSERT INTO Product VALUES (2, "Samsung Galaxy S20", "6.2 inch, 5G, 128GB", 10, 799.00);
INSERT INTO Customer VALUES (2, "Michael", "39df87nvmh76dn28fhskg0w4n2o", "michael@example.com");
INSERT INTO ProductOrder VALUES (2, 2, 1, 1);

INSERT INTO Product VALUES (3, "Sony PlayStation 5", "8K HDR, 825GB SSD, Blu-ray", 3, 499.00);
INSERT INTO Customer VALUES (3, "Sophia", "m2kj3f8h92h89hdu9s832nj230ss", "sophia@example.com");
INSERT INTO ProductOrder VALUES (3, 3, 1, 1);