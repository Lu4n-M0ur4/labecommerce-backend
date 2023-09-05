"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByName = exports.getProductsByName = exports.getAllProducts = exports.createProducts = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: 'u001',
        name: 'Fulano',
        email: 'fulano@email.com',
        password: 'fulano123',
        createdAt: new Date().toISOString().valueOf(),
    },
    {
        id: 'u002',
        name: 'Ciclano',
        email: 'ciclano@email.com',
        password: 'ciclano123',
        createdAt: new Date().toISOString().valueOf(),
    },
    {
        id: 'u003',
        name: 'Beltrano',
        email: 'beltrano@email.com',
        password: 'beltrano123',
        createdAt: new Date().toISOString().valueOf(),
    },
];
exports.products = [
    {
        id: 'prod001',
        name: 'Mouse gamer',
        price: 250.0,
        description: 'Melhor mouse do mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    },
    {
        id: 'prod002',
        name: 'Monitor',
        price: 1550.0,
        description: 'Melhor monitor do mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    },
    {
        id: 'prod003',
        name: 'Cadeira gamer',
        price: 1100.0,
        description: 'Cadeira Gamer do Mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    },
];
const createUser = (id, name, email, password) => {
    const newUsers = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString().valueOf(),
    };
    exports.users.push(newUsers);
    return 'Cadastro Realizado com sucesso';
};
exports.createUser = createUser;
const getAllUsers = () => exports.users.map((user) => {
    return user;
});
exports.getAllUsers = getAllUsers;
const createProducts = (id, name, price, description) => {
    const newProducts = {
        id,
        name,
        price,
        description,
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    };
    exports.products.push(newProducts);
    return 'Cadastro Realizado com sucesso';
};
exports.createProducts = createProducts;
const getAllProducts = () => exports.products.map((products) => {
    return products;
});
exports.getAllProducts = getAllProducts;
const getProductsByName = (name) => {
    return exports.products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
};
exports.getProductsByName = getProductsByName;
const getUsersByName = (name) => {
    return exports.users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
};
exports.getUsersByName = getUsersByName;
//# sourceMappingURL=dataBase.js.map