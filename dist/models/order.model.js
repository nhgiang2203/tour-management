"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Order = database_1.default.define('Order', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    note: {
        type: sequelize_1.DataTypes.TEXT("long")
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: "orders",
    timestamps: true
});
exports.default = Order;
