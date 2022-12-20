"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//setting up parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//setting up ejs views
app.use(express_1.default.static('./src/public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
    (0, routes_1.default)(app);
});
