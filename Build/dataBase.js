"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducts = exports.updateUser = exports.deleteProductById = exports.deleteUserById = exports.getUsersByName = exports.getProductsByName = exports.getAllProducts = exports.createProducts = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
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
    return exports.products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
};
exports.getProductsByName = getProductsByName;
const getUsersByName = (name) => {
    return exports.users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
};
exports.getUsersByName = getUsersByName;
const deleteUserById = (id) => {
    const userIndex = exports.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
        exports.users.splice(userIndex, 1);
    }
};
exports.deleteUserById = deleteUserById;
const deleteProductById = (id) => {
    const productIndex = exports.products.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
        exports.products.splice(productIndex, 1);
    }
};
exports.deleteProductById = deleteProductById;
const updateUser = (userIdToEdit, newId, newName, newEmail, newPassword) => {
    const user = exports.users.find((user) => user.id === userIdToEdit);
    if (user) {
        user.id = newId || user.id;
        user.name = newName || user.name;
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
    }
};
exports.updateUser = updateUser;
const updateProducts = (userIdToEdit, newId, newName, newPrice, Description) => {
    const product = exports.products.find((product) => product.id === userIdToEdit);
    if (product) {
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.price = isNaN(Number(newPrice)) ? product.price : newPrice;
        product.description = Description || product.description;
    }
};
exports.updateProducts = updateProducts;
//# sourceMappingURL=dataBase.js.map