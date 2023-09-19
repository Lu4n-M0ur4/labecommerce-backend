"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = require("./dataBase");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
});
app.get('/users', (req, res) => {
    try {
        res.status(200).send(dataBase_1.users);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
});
app.get('/products', (req, res) => {
    try {
        res.status(200).send(dataBase_1.products);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
});
app.get('/products/search', (req, res) => {
    const q = req.query.q;
    try {
        if (!q) {
            res.statusCode = 404;
            throw new Error('Digite pelo menos um caracter para buscar!!!');
        }
        const productsFiltered = dataBase_1.products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));
        const productFiltered = (0, dataBase_1.getProductsByName)(q);
        res.status(200).send(productFiltered);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
});
app.get('/users/search', (req, res) => {
    const q = req.query.q;
    try {
        if (!q) {
            res.statusCode = 404;
            throw new Error('Digite pelo menos um caracter para buscar!!!');
        }
        const userByName = (0, dataBase_1.getUsersByName)(q);
        res.status(200).send(userByName);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
});
app.post('/users', (req, res) => {
    try {
        const { id, name, email, password } = req.body;
        if (!req.body) {
            res.statusCode = 404;
            throw new Error("Sua requisição necessita de um body");
        }
        (0, dataBase_1.createUser)(id, name, email, password);
        res.status(201).send('Cadastro realizado com sucesso');
    }
    catch (error) {
        if (error instanceof Error) {
            error.message;
        }
    }
});
app.post('/products', (req, res) => {
    const { id, name, price, description } = req.body;
    (0, dataBase_1.createProducts)(id, name, price, description);
    res.status(201).send('Produto cadastro realizado com sucesso');
});
app.delete('/users/:id', (req, res) => {
    const userIdToDelete = req.params.id;
    const results = (0, dataBase_1.deleteUserById)(userIdToDelete);
    res.status(200).send('User deleted successfully');
});
app.delete('/products/:id', (req, res) => {
    const productsIdToDelete = req.params.id;
    const results = (0, dataBase_1.deleteProductById)(productsIdToDelete);
    res.status(200).send('Product deleted successfully');
});
app.put('/users/:id', (req, res) => {
    const userIdToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    (0, dataBase_1.updateUser)(userIdToEdit, newId, newName, newEmail, newPassword);
    res.status(200).send({ message: 'User updated successfully' });
});
app.put('/products/:id', (req, res) => {
    const productsIdToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    (0, dataBase_1.updateProducts)(productsIdToEdit, newId, newName, newPrice, newDescription);
    res.status(200).send({ message: 'Product updated successfully' });
});
//# sourceMappingURL=index.js.map