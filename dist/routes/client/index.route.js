"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tour_route_1 = require("./tour.route");
const category_route_1 = require("./category.route");
const cart_route_1 = require("./cart.route");
const order_route_1 = require("./order.route");
const clientRoutes = (app) => {
    app.use("/tours", tour_route_1.tourRoutes);
    app.use("/categories", category_route_1.categoryRoutes);
    app.use("/cart", cart_route_1.cartRoutes);
    app.use("/order", order_route_1.orderRoutes);
};
exports.default = clientRoutes;
