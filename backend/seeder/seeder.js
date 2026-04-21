import mongoose from "mongoose";
import products from "./data.js";
import User from "../models/user.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/shopit-v2");

    // Create or get admin user
    let adminUser = await User.findOne({ email: 'admin@shopit.com' });
    if (!adminUser) {
      adminUser = new User({
        name: 'Admin',
        email: 'admin@shopit.com',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created');
    }

    await Product.deleteMany();
    console.log("Products deleted");

    // Add user to all products
    const productsWithUser = products.map(product => ({
      ...product,
      user: adminUser._id
    }));

    await Product.insertMany(productsWithUser);
    console.log("Products added with user"); 

    process.exit();
  } 
  catch(error) {
    console.log(error.message);
    process.exit();
  }
}

seedProducts();