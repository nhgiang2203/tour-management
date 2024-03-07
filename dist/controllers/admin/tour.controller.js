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
exports.createPost = exports.create = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const generate_1 = require("../../helpers/generate");
const tour_category_model_1 = __importDefault(require("../../models/tour-category.model"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = yield tour_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    tours.forEach(item => {
        if (item["images"]) {
            item["image"] = JSON.parse(item["images"])[0];
        }
        item["price_special"] = item["price"] * (1 - item["discount"] / 100);
    });
    res.render('admin/pages/tours/index', {
        pageTitle: "Danh sách tour",
        tours: tours
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.findAll({
        where: {
            deleted: false,
            status: 'active'
        },
        raw: true
    });
    res.render('admin/pages/tours/create', {
        pageTitle: "Trang thêm mới",
        categories: categories
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countTour = yield tour_model_1.default.count();
    const code = (0, generate_1.generateTourCode)(countTour);
    if (req.body.position == "") {
        req.body.position = countTour + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }
    const dataTour = {
        title: req.body.title,
        code: code,
        images: JSON.stringify(req.body.images),
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position,
        status: req.body.status,
        information: req.body.information,
        schedule: req.body.schedule,
    };
    console.log(dataTour);
    const tour = yield tour_model_1.default.create(dataTour);
    const tourId = tour["id"];
    const dataTourCategory = {
        tour_id: tourId,
        category_id: req.body.category_id
    };
    yield tour_category_model_1.default.create(dataTourCategory);
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/tours`);
});
exports.createPost = createPost;
