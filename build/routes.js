"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homepage_controller_1 = require("./controller/homepage-controller");
const webhook_controller_1 = require("./controller/webhook-controller");
const routes = (app) => {
    app.get('/', homepage_controller_1.getHomepage);
    app.get('/webhook', webhook_controller_1.getWebHook);
    app.post('/webhook', webhook_controller_1.postWebHook);
};
exports.default = routes;
