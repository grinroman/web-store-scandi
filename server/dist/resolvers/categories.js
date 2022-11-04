"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../data");
var type_1 = require("../data/type");
var categoriesResolver = function () {
    var result = data_1.products.reduce(function (categories, product) {
        var category = product.getCategory();
        if (!categories[category]) {
            categories[category] = {
                name: category,
                products: []
            };
        }
        var _a = categories, _b = category, products = _a[_b].products;
        products.push(product);
        return categories;
    }, {});
    return __spreadArray([
        {
            name: type_1.Category.all,
            products: data_1.products
        }
    ], Object.values(result), true);
};
exports.default = categoriesResolver;
