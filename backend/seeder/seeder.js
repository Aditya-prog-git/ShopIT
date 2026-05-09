import mongoose from "mongoose";
import dotenv from 'dotenv';
import products from "./data.js";
import User from "../models/user.js";
import Product from "../models/product.js";

//load env variables
dotenv.config({ path: './config/config.env' });

const seedProducts = async () => {
  try{
    console.log('Connecting to database...');
    await mongoose.connect("mongodb+srv://adityadbuser:aditya%40123@shopit.o4bwsk2.mongodb.net/?appName=Shopit-v2");
    console.log('Connected successfully');

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

    // Create second admin user
    let adminUser2 = await User.findOne({ email: 'admin2@shopit.com' });
    if (!adminUser2) {
      adminUser2 = new User({
        name: 'Admin Two',
        email: 'admin2@shopit.com',
        password: 'admin@123',
        role: 'admin'
      });
      await adminUser2.save();
      console.log('Second admin user created');
    }

    // Create regular user
    let regularUser = await User.findOne({ email: 'user@shopit.com' });
    if (!regularUser) {
      regularUser = new User({
        name: 'John Doe',
        email: 'user@shopit.com',
        password: 'user@123',
        role: 'user'
      });
      await regularUser.save();
      console.log('Regular user created');
    }

    // Create another regular user
    let regularUser2 = await User.findOne({ email: 'Kushagra@shopit.com' });
    if (!regularUser2) {
      regularUser2 = new User({
        name: 'Kushagra data',
        email: 'Kushagra@shopit.com',
        password: 'kush@123',
        role: 'user'
      });
      await regularUser2.save();
      console.log('Second regular user created');
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