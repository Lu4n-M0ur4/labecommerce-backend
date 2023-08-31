"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdAt = void 0;
const createdAt = () => {
    const newDate = new Date();
    const dateFormatter = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'full',
            timeStyle: "short"
        }).format(date);
    };
    return dateFormatter(newDate);
};
exports.createdAt = createdAt;
//# sourceMappingURL=utils.js.map