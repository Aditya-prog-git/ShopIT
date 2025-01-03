import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/shopit-v2");

    await Product.deleteMany();
    console.log("Products deleted");

    await Product.insertMany(products);
    console.log("Products added");

    process.exit();
  } 
  catch(error) {
    console.log(error.message);
    process.exit();
  }
}

seedProducts();