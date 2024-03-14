"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../dist/db");
// "errorMessage": "Unknown column 'instockQuantity' in 'field list'"
const create = (product, callback) => {
    const queryString = `
    INSERT INTO Product (name, description, instock_quantity, price) 
    VALUES (?, ?, ?, ?)
    `;
    db_1.db.query(queryString, [
        product.name,
        product.description,
        product.instockQuantity,
        product.price
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
/*
{
    "product": {
        "name": "Xburguer",
        "description": "Hamburgão gotosinho",
        "instockQuantity": 100,
        "price": 25.99
    }
}
*/
const findOne = (productId, callback) => {
    const queryString = `
        SELECT * FROM Product WHERE id=?;
        `;
    db_1.db.query(queryString, productId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const product = {
            id: row.id,
            name: row.name,
            description: row.description,
            instockQuantity: row.instockQuantity,
            price: row.price
        };
        callback(null, product);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
        SELECT * FROM Product;
    `;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const products = [];
        rows.forEach(row => {
            const product = {
                id: row.id,
                name: row.name,
                description: row.description,
                instockQuantity: row.instockQuantity,
                price: row.price
            };
            products.push(product);
        });
        callback(null, products);
    });
};
exports.findAll = findAll;
const update = (product, callback) => {
    const queryString = `
    UPDATE Product 
    SET name=:name, description=:description, instock_quantity=:instock_quantity, price=:price
    WHERE id=:id`;
    db_1.db.query(queryString, {
        name: product.name,
        description: product.description,
        instock_quantity: product.instockQuantity,
        price: product.price,
        id: product.id
    }, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
const deleteProduct = (productId, callback) => {
    const queryString = `DELETE FROM Product WHERE id=?`;
    db_1.db.query(queryString, [productId], (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteProduct = deleteProduct;
