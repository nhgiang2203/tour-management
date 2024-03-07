"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTourCode = exports.generateOrderCode = void 0;
const generateOrderCode = (number) => {
    const code = `OD${String(number).padStart(8, '0')}`;
    return code;
};
exports.generateOrderCode = generateOrderCode;
const generateTourCode = (number) => {
    const code = `TOUR${String(number).padStart(6, '0')}`;
    return code;
};
exports.generateTourCode = generateTourCode;
