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

SELECT * FROM users;

INSERT INTO
    users(
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
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u002',
        'Ciclano',
        'ciclano@email.com',
        'ciclano123',
        '12/09/2023'
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u003',
        'Beltrano',
        'beltrano@email.com',
        'beltrano123',
        '05/09/2023'
    );

-- Criação / inserções na tabela de produtos -- 

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );



SELECT * FROM products;

INSERT INTO
    products(
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
    );

INSERT INTO
    products(
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod002',
        'Monitor',
        1550.0,
        'Melhor monitor do mercado!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    );

INSERT INTO
    products(
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod003',
        'Cadeira gammer',
        1100.0,
        'Cadeira Gammer do Mercado!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    );

INSERT INTO
    products(
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod004',
        'Teclado Mecanico',
        1000.0,
        'Melhor teclado 60% do mercado',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    );

INSERT INTO
    products(
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod005',
        'Web cam ',
        150.0,
        'Resolução 4k!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    );