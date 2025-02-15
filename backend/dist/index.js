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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
// ✅ Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// ✅ Ensure Supabase Credentials Exist
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error("❌ Supabase credentials are missing in .env");
    process.exit(1);
}
// ✅ Initialize Supabase Client
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// ✅ Enable CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Allow frontend access
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// ✅ Middleware
app.use(express_1.default.json());
// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Server is running! 🚀");
});
app.post("/api/liked-products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, user_id } = req.body;
        const { data, error } = yield supabase
            .from("liked_products")
            .insert([{ product_id: product_id, user_id: user_id }])
            .select();
        console.log('dat >>', data, error);
        res.status(200).json({ message: "Product liked!" });
    }
    catch (err) {
        console.log('error while inserting product>>', err);
    }
}));
// ✅ check user is present in Supabase
app.post("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, clerk_id } = req.body;
        const { data, error } = yield supabase
            .from("users")
            .insert([{ email: email, clerk_id: clerk_id }])
            .select();
    }
    catch (err) {
        console.error("❌ Error creating user:", err);
        res.status(500).json({ error: "Error creating user" });
    }
}));
// ✅ Fetch Products from Supabase
app.get("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase.from("products").select("*");
        if (error)
            throw error;
        res.json(data);
    }
    catch (err) {
        console.error("❌ Error fetching products:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
}));
// ✅ Sign-In using Supabase Authentication
app.post("/api/auth/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, clerkId } = req.body;
        if (!email || !name || !clerkId) {
            return res
                .status(400)
                .json({ error: "Email, name, and clerk_id are required" });
        }
        const { data, error } = yield supabase
            .from("users")
            .insert([{ email: email, clerk_id: clerkId, name: name }])
            .select();
        console.log("data >>", data);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            error: "Server error",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
}));
app.get("/api/liked-products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.query.userId;
        // const userId = parseInt(user_id);
        // const userId = parseInt(req.query.user_id as string, 10); // Convert to integer
        if (!userId) {
            console.error("❌ Error: Missing or invalid userId in request");
            return res.status(400).json({ error: "Valid User ID is required" });
        }
        console.log(`📢 Fetching liked products for user ID: ${userId}`);
        const { data, error } = yield supabase
            .from("liked_products")
            .select("product_id, products(*)")
            .eq("user_id", userId); // Match integer user_id
        if (error) {
            console.error("❌ Supabase Query Error:", error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log("✅ Liked Products Fetched:", data);
        res.json(data);
    }
    catch (err) {
        console.error("❌ Unexpected Error:", err.message);
        res
            .status(500)
            .json({ error: err.message || "Failed to fetch liked products" });
    }
}));
app.get("/api/influencers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📢 Fetching all influencers...");
        const { data, error } = yield supabase
            .from("influencers")
            .select("id, name, profile_image, bio, created_at")
            .order("created_at", { ascending: false }); // Optional: Sort by newest first
        if (error) {
            console.error("❌ Supabase Query Error:", error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log("✅ Influencers Fetched:", data);
        res.json(data);
    }
    catch (err) {
        console.error("❌ Unexpected Error:", err.message);
        res
            .status(500)
            .json({ error: err.message || "Failed to fetch influencers" });
    }
}));
// ✅ Webhook: Sync Clerk Users with Supabase
app.post("/api/sync-clerk-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id, email_addresses, created_at } = req.body;
        const email = (_a = email_addresses === null || email_addresses === void 0 ? void 0 : email_addresses[0]) === null || _a === void 0 ? void 0 : _a.email_address;
        if (!id || !email) {
            return res.status(400).json({ error: "Invalid Clerk user data" });
        }
        console.log("🔄 Syncing Clerk User:", { id, email });
        const { data, error } = yield supabase
            .from("users")
            .upsert([{ clerk_id: id, email, created_at }], {
            onConflict: "clerk_id"
        });
        if (error) {
            console.error("❌ Database error:", error.message);
            throw error;
        }
        console.log("✅ Clerk User Synced:", data);
        res.status(200).json({ message: "User synced successfully", data });
    }
    catch (error) {
        console.error("❌ Error syncing Clerk user:", error);
        res.status(500).json({ error: "Failed to sync Clerk user" });
    }
}));
app.get("/api/profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clerkId = req.query.clerkId;
        if (!clerkId) {
            console.log("❌ Missing Clerk ID");
            return res.status(400).json({ error: "Clerk ID is required" });
        }
        console.log(`🔍 Fetching profile for Clerk ID: ${clerkId}`);
        const { data, error } = yield supabase
            .from("users")
            .select("liked_products, followed_influencers")
            .eq("clerk_user_id", clerkId)
            .single();
        if (error) {
            console.log("❌ Supabase Error:", error);
            return res.status(500).json({ error: error.message });
        }
        console.log("✅ User Data Fetched:", data);
        res.json(data);
    }
    catch (err) {
        console.error("❌ Server Error:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
}));
// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
