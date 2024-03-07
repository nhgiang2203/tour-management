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
exports.detail = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const database_1 = __importDefault(require("../../config/database"));
const sequelize_1 = require("sequelize");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugCategory = req.params.slugCategory;
    const tours = yield database_1.default.query(`
    SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE 
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active'
  `, { type: sequelize_1.QueryTypes.SELECT });
    tours.forEach(item => {
        if (item['images']) {
            item['images'] = JSON.parse(item['images']);
            item['image'] = item['images'][0];
        }
        item['price_special'] = parseInt(item['price_special']);
    });
    res.render('client/pages/tours/index', {
        pageTitle: "Danh sách tours",
        tours: tours
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tourDetail = yield tour_model_1.default.findOne({
        where: {
            slug: req.params.slugTour,
            deleted: false,
            status: 'active'
        },
        raw: true
    });
    tourDetail["images"] = JSON.parse(tourDetail["images"]);
    tourDetail["price_special"] = tourDetail["price"] * (1 - tourDetail["discount"] / 100);
    res.render('client/pages/tours/detail', {
        pageTitle: "Chi tiết tour",
        tourDetail: tourDetail
    });
});
exports.detail = detail;
