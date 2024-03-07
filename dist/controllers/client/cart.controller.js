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
exports.listJson = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const index = (req, res) => {
    res.render('client/pages/cart/index', {
        pageTitle: "Trang giỏ hàng"
    });
};
exports.index = index;
const listJson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = req.body;
    for (const tour of tours) {
        const infoTour = yield tour_model_1.default.findOne({
            where: {
                id: tour.tourId,
                deleted: false,
                status: 'active'
            },
            raw: true
        });
        tour["info"] = infoTour;
        tour["image"] = JSON.parse(infoTour["images"])[0];
        tour["price_special"] = infoTour["price"] * (1 - infoTour["discount"] / 100);
        tour["total"] = tour["quantity"] * tour["price_special"];
    }
    res.json({
        tours: tours
    });
});
exports.listJson = listJson;
