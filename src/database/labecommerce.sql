-- Active: 1696544298299@@127.0.0.1@3306

-- Criação / inserções na tabela de usuarios --

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE users;

DELETE FROM users AS deleteUserById WHERE id ='u003';

SELECT * FROM users AS GetAllUsers ;

SELECT id  FROM users WHERE id ='u001';

UPDATE users SET name='Luan' WHERE id='u003';

INSERT INTO
    users AS createUser(
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Fulano',
        'fulano@email.com',
        'fulano123',
        datetime('now', 'localtime')
    ), (
        'u003',
        'Beltrano',
        'beltrano@email.com',
        'beltrano123',
        datetime('now', 'localtime')
    ), (
        'u002',
        'Ciclano',
        'ciclano@email.com',
        'ciclano123',
        datetime('now', 'localtime')
    );

SELECT * FROM users AS getUserByQuery WHERE name LIKE '%cl%';

-- Criação / inserções na tabela de produtos --

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

DELETE FROM products AS deleteProductsById WHERE id ='prod001';

DROP TABLE products;

SELECT * FROM products;

INSERT INTO
    products AS createProducts(
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod001',
        'Mouse gammer',
        250.0,
        'Melhor mouse do mercado!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'prod002',
        'Monitor',
        1550.0,
        'Melhor monitor do mercado!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'prod003',
        'Cadeira gammer',
        1100.0,
        'Cadeira Gammer do Mercado!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'prod004',
        'Web cam ',
        150.0,
        'Resolução 4k!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    );

SELECT *
FROM
    products AS getProductsByQuery
WHERE name LIKE '%gammer%';

UPDATE products
SET
    id = 'prod010',
    name = 'Monitor Gammer',
    price = 240.00,
    description = '160hz',
    image_url = 'https://picsum.photos/seed/Mouse%20gamer/400'
WHERE id = 'prod003';

-- Purchases --

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchases;

INSERT INTO purchases
VALUES (
        'p001',
        'u001',
        1500,
        datetime('now', 'localtime')
    ), (
        'p002',
        'u002',
        1986,
        datetime('now', 'localtime')
    );

INSERT INTO purchases
VALUES (
        'p003',
        'u003',
        150,
        datetime('now', 'localtime')
    );

SELECT * FROM purchases;

UPDATE purchases SET total_price = 500 WHERE id = 'p003';

SELECT
    users.id,
    purchases.id,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM users
    INNER JOIN purchases ON users.id = purchases.buyer;

--Table REFERENCES

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchases_products;

SELECT * FROM purchases_products;

INSERT INTO purchases_products
VALUES ('p001', 'prod002', 4), ('p002', 'prod001', 3), ('p003', 'prod004', 4);

SELECT
    pur.buyer AS Usuario,
    pur.created_at AS dataDaCompra,
    prod.name AS Produto,
    prod.description,
    purchases_products.product_id,
    purchases_products.purchase_id,
    purchases_products.quantity,
    pur.total_price
FROM purchases_products
    LEFT JOIN purchases AS pur ON purchases_products.purchase_id = pur.id
    INNER JOIN products AS prod ON purchases_products.product_id = prod.id;

UPDATE purchases_products
SET product_id = 'prod002'
WHERE purchase_id = 'p001';

SELECT   
'products.id',
'products.name',
'products.price',
'products.description',
'products.image_url',
'purchases_products.quantity'
FROM purchases_products 
INNER JOIN products ON products.id = purchases_products.product_id 
WHERE purchases_products.purchase_id = 'p003';