import { BasicProduct, Product } from "../types/product";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2";
// "errorMessage": "Unknown column 'instockQuantity' in 'field list'"
export const create = (product: Product, callback: Function) => {
    const queryString = `
    INSERT INTO Product (name, description, instock_quantity, price) 
    VALUES (?, ?, ?, ?)
    `;

    db.query(
        queryString,
        [
            product.name,
            product.description,
            product.instockQuantity,
            product.price
        ],
        (err, result) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

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

export const findOne = (productId: number, callback: Function) => {
    const queryString = `
        SELECT * FROM Product WHERE id=?;
        `

    db.query(queryString, productId, (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        const product: Product = {
            id: row.id,
            name: row.name,
            description: row.description,
            instockQuantity: row.instockQuantity,
            price: row.price
        };
        callback(null, product);
    });
};

export const findAll = (callback: Function) => {
    const queryString = `
        SELECT * FROM Product;
    `;

    db.query(queryString, (err, result) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket[]>result;
        const products: Product[] = [];

        rows.forEach(row => {
            const product: Product = {
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

export const update = (product: Product, callback: Function) => {
    const queryString = `
    UPDATE Product 
    SET name=:name, description=:description, instock_quantity=:instock_quantity, price=:price
    WHERE id=:id`;

    db.query(
        queryString,
        {
            name: product.name,
            description: product.description,
            instock_quantity: product.instockQuantity,
            price: product.price,
            id: product.id
        },
        (err, result) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
};

export const deleteProduct = (productId: number, callback: Function) => {
    const queryString = `DELETE FROM Product WHERE id=?`;

    db.query(queryString, [productId], (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};