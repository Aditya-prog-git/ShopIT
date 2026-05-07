import mongoose from "mongoose";
import products from "./data.js";
<<<<<<< HEAD
=======
import User from "../models/user.js";
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
import Product from "../models/product.js";

const seedProducts = async () => {
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/shopit-v2");

<<<<<<< HEAD
    await Product.deleteMany();
    console.log("Products deleted");

    await Product.insertMany(products);
    console.log("Products added");
=======
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
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

    process.exit();
  } 
  catch(error) {
    console.log(error.message);
    process.exit();
  }
}

seedProducts();