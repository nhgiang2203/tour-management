"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.order = void 0;
const order_model_1 = __importDefault(require("../../models/order.model"));
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const order_item_model_1 = __importDefault(require("../../models/order-item.model"));
const generate_1 = require("../../helpers/generate");
const order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const dataOrder = {
        code: "OD00000030",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: 'initial'
    };
    const order = yield order_model_1.default.create(dataOrder);
    const orderId = order.dataValues.id;
    const code = (0, generate_1.generateOrderCode)(orderId);
    yield order_model_1.default.update({
        code: code
    }, {
        where: {
            id: orderId
        }
    });
    for (const item of data.cart) {
        const dataItem = {
            tourId: item.tourId,
            orderId: orderId,
            quantity: item.quantity
        };
        const infoTour = yield tour_model_1.default.findOne({
            where: {
                id: item.tourId,
                deleted: false,
                status: 'active'
            },
            raw: true
        });
        dataItem["price"] = infoTour["price"];
        dataItem["discount"] = infoTour["discount"];
        dataItem["timeStart"] = infoTour["timeStart"];
        yield order_item_model_1.default.create(dataItem);
    }
    res.json({
        code: 200,
        message: "Đặt hàng thành công",
        orderCode: code
    });
});
exports.order = order;
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCode = req.query.orderCode;
    const order = yield order_model_1.default.findOne({
        where: {
            code: orderCode,
            deleted: false
        },
        raw: true
    });
    const ordersItem = yield order_item_model_1.default.findAll({
        where: {
            orderId: order["id"]
        },
        raw: true
    });
    for (const item of ordersItem) {
        item["price_special"] = item["price"] * (1 - item["discount"] / 100);
        item["total"] = item["quantity"] * item["price_special"];
        const tourInfo = yield tour_model_1.default.findOne({
            where: {
                id: item["tourId"],
            },
            raw: true
        });
        item["title"] = tourInfo["title"];
        item["image"] = JSON.parse(tourInfo["images"])[0];
        item["slug"] = tourInfo["slug"];
    }
    order["total_price"] = ordersItem.reduce((sum, item) => sum + item["total"], 0);
    res.render('client/pages/order/success', {
        pageTitle: "Đặt hàng thành công",
        order: order,
        ordersItem: ordersItem
    });
});
exports.success = success;
