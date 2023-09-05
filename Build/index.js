"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = require("./dataBase");
const initProjet = (num) => {
    for (let i = 0; i < num; i++) {
        setTimeout(() => {
            console.log(`Carregando dataBase em..... ${num - i}`);
        }, i * 1000);
    }
};
setTimeout(() => {
    console.table(dataBase_1.users);
    console.table(dataBase_1.products);
    console.log((0, dataBase_1.createUser)('u001', 'Claudia', 'claudia@email.com', 'ZéDaManga'));
    console.log((0, dataBase_1.createProducts)('prod004', 'Microfone', 350, 'Melhor experiencia de audio'));
    console.table((0, dataBase_1.getAllUsers)());
    console.table((0, dataBase_1.getAllProducts)());
    console.table((0, dataBase_1.getProductsByName)('C'));
    console.table((0, dataBase_1.getUsersByName)('CLAUDIA'));
}, 4000);
initProjet(3);
//# sourceMappingURL=index.js.map