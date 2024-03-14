"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../dist/db");
// nome nulo
const create = (customer, callback) => {
    const queryString = `
    INSERT INTO Customer (name, password, email) 
    VALUES (?, ?, ?)
    `;
    db_1.db.query(queryString, [
        customer.name,
        customer.password,
        customer.email
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (customerId, callback) => {
    const queryString = `
        SELECT * FROM Customer WHERE id=?;
        `;
    db_1.db.query(queryString, customerId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const customer = {
            id: row.id,
            name: row.name,
            password: row.password,
            email: row.email
        };
        callback(null, customer);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
        SELECT * FROM Customer;
    `;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const customers = [];
        rows.forEach(row => {
            const customer = {
                id: row.id,
                name: row.name,
                password: row.password,
                email: row.email
            };
            customers.push(customer);
        });
        callback(null, customers);
    });
};
exports.findAll = findAll;
//não estou conseguindo fazer o put
const update = (customer, callback) => {
    const queryString = `
        UPDATE Customer 
        SET name=?, password=?, email=? 
        WHERE id=?`;
    db_1.db.query(queryString, [
        customer.name,
        customer.password,
        customer.email
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
/*
{
  "orderId": 1,
  "product": {
    "id": 2
  },
  "productQuantity": 3
}

*/
const deleteCustomer = (customerId, callback) => {
    const queryString = `DELETE FROM Customer WHERE id=?`;
    db_1.db.query(queryString, [customerId], (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteCustomer = deleteCustomer;
