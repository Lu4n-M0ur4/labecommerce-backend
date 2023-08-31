"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = void 0;
const utils_1 = require("./utils");
exports.users = [
    {
        id: 'u001',
        name: 'Fulano',
        email: 'fulano@email.com',
        password: 'fulano123',
        createdAt: (0, utils_1.createdAt)(),
    },
    {
        id: 'u002',
        name: 'Ciclano',
        email: 'ciclano@email.com',
        password: 'ciclano123',
        createdAt: (0, utils_1.createdAt)(),
    },
    {
        id: 'u003',
        name: 'Beltrano',
        email: 'beltrano@email.com',
        password: 'beltrano123',
        createdAt: (0, utils_1.createdAt)(),
    },
];
exports.products = [
    {
        id: 'prod001',
        name: 'Mouse gamer',
        price: 250.00,
        description: 'Melhor mouse do mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    },
    {
        id: 'prod001',
        name: 'Monitor',
        price: 1550.00,
        description: 'Melhor monitor do mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    },
    {
        id: 'prod001',
        name: 'Cadeira gamer',
        price: 1100.00,
        description: 'Cadeira Gamer do Mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    },
];
//# sourceMappingURL=dataBase.js.map