"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomepage = void 0;
const getHomepage = (req, res) => {
    res.render('homepage.ejs');
};
exports.getHomepage = getHomepage;
