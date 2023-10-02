-- Active: 1695739375777@@127.0.0.1@3306

-- Criação / inserções na tabela de usuarios --

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

DROP TABLE users;

DELETE FROM users AS deleteUserById WHERE id ='u003';

SELECT * FROM users AS GetAllUsers ;

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
        '26/09/2023'
    ), (
        'u003',
        'Beltrano',
        'beltrano@email.com',
        'beltrano123',
        '05/09/2023'
    ), (
        'u002',
        'Ciclano',
        'ciclano@email.com',
        'ciclano123',
        '12/09/2023'
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

SELECT * FROM products AS getAllProducts;

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

