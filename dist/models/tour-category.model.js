"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const TourCategory = database_1.default.define('TourCategory', {
    tour_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'tours',
            key: 'id'
        }
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
}, {
    tableName: 'tours_categories',
    timestamps: false
});
exports.default = TourCategory;
