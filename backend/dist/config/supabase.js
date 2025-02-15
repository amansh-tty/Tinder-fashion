"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
// ✅ Load environment variables BEFORE using process.env
dotenv_1.default.config();
// ✅ Fix process.env undefined issue in ES Modules
if (typeof process === "undefined") {
    throw new Error("❌ process is not defined! Make sure you're running this in Node.js.");
}
// ✅ Explicitly define the environment variables
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
if (!supabaseUrl || !supabaseKey) {
    throw new Error("❌ Supabase URL or Key is missing from environment variables.");
}
// ✅ Create the Supabase client
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
