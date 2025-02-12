import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { Product } from "../models/Product";

// ✅ Get all products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get a product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Add a new product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, image, influencer, link }: Product = req.body;
    const { data, error } = await supabase.from("products").insert([{ name, price, image, influencer, link }]);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
