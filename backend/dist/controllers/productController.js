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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.addProduct = exports.getProductById = exports.getProducts = void 0;
const supabase_1 = require("../config/supabase");
// ✅ Get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase.from("products").select("*");
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getProducts = getProducts;
// ✅ Get a product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { data, error } = yield supabase_1.supabase.from("products").select("*").eq("id", id).single();
        if (error) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getProductById = getProductById;
// ✅ Add a new product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, image, influencer, link } = req.body;
        const { data, error } = yield supabase_1.supabase.from("products").insert([{ name, price, image, influencer, link }]);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json(data);
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addProduct = addProduct;
// ✅ Delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { error } = yield supabase_1.supabase.from("products").delete().eq("id", id);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteProduct = deleteProduct;
