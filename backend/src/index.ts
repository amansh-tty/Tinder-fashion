import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { clerkClient } from "@clerk/clerk-sdk-node"; // Ensure Clerk SDK is installed
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

import User from "./models/User";

// ✅ Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure Supabase Credentials Exist
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Supabase credentials are missing in .env");
  process.exit(1);
}

// ✅ Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend access
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});
app.post("/api/liked-products", async (req, res) => {
  try {
    const { product_id, user_id } = req.body;

    const { data, error } = await supabase
      .from("liked_products")
      .insert([{ product_id: product_id, user_id: user_id,liked_id:uuidv4() }])
      .select();
    console.log("dat >>", data, error);
    res.status(200).json({ message: "Product liked!" });
  } catch (err) {
    console.log("error while inserting product>>", err);
  }
});

// ✅ check user is present in Supabase
app.post("/api/user", async (req: Request, res: Response) => {
  try {
    const { email, clerk_id } = req.body;
    const { data, error } = await supabase
      .from("users")
      .insert([{ email: email, clerk_id: clerk_id }])
      .select();
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: "Error creating user" });
  }
});

// ✅ Fetch Products from Supabase
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Sign-In using Supabase Authentication
app.post("/api/auth/signin", async (req: any, res: any) => {
  try {
    const { email, name, clerkId } = req.body;

    if (!email || !name || !clerkId) {
      return res
        .status(400)
        .json({ error: "Email, name, and clerk_id are required" });
    }
    const { data, error } = await supabase
      .from("users")
      .insert([{ email: email, clerk_id: clerkId, name: name }])
      .select();
    console.log("data >>", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.get("/api/liked-products", async (req: Request, res: Response) => {
  try {
    let userId = req.query.userId;
    // const userId = parseInt(user_id);
    // const userId = parseInt(req.query.user_id as string, 10); // Convert to integer

    if (!userId) {
      console.error("❌ Error: Missing or invalid userId in request");
      return res.status(400).json({ error: "Valid User ID is required" });
    }

    console.log(`📢 Fetching liked products for user ID: ${userId}`);

    const { data, error } = await supabase
      .from("liked_products")
      .select("product_id, products(*)")
      .eq("user_id", userId); // Match integer user_id

    if (error) {
      console.error("❌ Supabase Query Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Liked Products Fetched:", data);
    res.json(data);
  } catch (err: any) {
    console.error("❌ Unexpected Error:", err.message);
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch liked products" });
  }
});

app.delete("/api/unlike-product", async (req, res) => {
  try {
    // const productId = req.params.id;
    const userId = req.query.userId;
    const productId = req.query.productId;
    // Remove product from the liked list

    
    const { error } = await supabase
      .from("liked_products")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    res.json({ success: true });
  } catch (error) {
    console.log('error while delting >>', error)
  }
});

app.get("/api/influencers", async (req: Request, res: Response) => {
  try {
    console.log("📢 Fetching all influencers...");

    const { data, error } = await supabase
      .from("influencers")
      .select("id, name, profile_image, bio, created_at")
      .order("created_at", { ascending: false }); // Optional: Sort by newest first

    if (error) {
      console.error("❌ Supabase Query Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Influencers Fetched:", data);
    res.json(data);
  } catch (err: any) {
    console.error("❌ Unexpected Error:", err.message);
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch influencers" });
  }
});

// ✅ Webhook: Sync Clerk Users with Supabase
app.post("/api/sync-clerk-user", async (req: Request, res: Response) => {
  try {
    const { id, email_addresses, created_at } = req.body;
    const email = email_addresses?.[0]?.email_address;

    if (!id || !email) {
      return res.status(400).json({ error: "Invalid Clerk user data" });
    }

    console.log("🔄 Syncing Clerk User:", { id, email });

    const { data, error } = await supabase
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
  } catch (error) {
    console.error("❌ Error syncing Clerk user:", error);
    res.status(500).json({ error: "Failed to sync Clerk user" });
  }
});
app.get("/api/profile", async (req, res) => {
  try {
    const clerkId = req.query.clerkId as string;
    if (!clerkId) {
      console.log("❌ Missing Clerk ID");
      return res.status(400).json({ error: "Clerk ID is required" });
    }

    console.log(`🔍 Fetching profile for Clerk ID: ${clerkId}`);

    const { data, error } = await supabase
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
  } catch (err: any) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
