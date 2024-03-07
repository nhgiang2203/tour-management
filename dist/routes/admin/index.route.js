"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_route_1 = require("./category.route");
const system_1 = require("../../config/system");
const tour_route_1 = require("./tour.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const PATH_ADMIN = `/${system_1.systemConfig.prefixAdmin}`;
    app.use(PATH_ADMIN + '/categories', category_route_1.categoryRoutes);
    app.use(PATH_ADMIN + '/tours', tour_route_1.tourRoutes);
    app.use(PATH_ADMIN + '/upload', upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
