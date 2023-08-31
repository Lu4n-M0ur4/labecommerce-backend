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
}, 4000);
initProjet(3);
//# sourceMappingURL=index.js.map