import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
<<<<<<< HEAD
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
=======
import Order from "../models/order.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

//create new product => /api/v1/products
export const getProducts = catchAsyncErrors( async(req, res, next) => {
    const resPerPage = 4;

    const apiFilters = new APIFilters(Product, req.query).search().filters();   

    let products = await apiFilters.query;
    let filteredProducts = products.length;

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();

    res.status(200).json({
        filteredProducts,
        resPerPage,
        products,
    });
})

//create new product => /api/v1/admin/products
export const newProduct = catchAsyncErrors( async(req, res) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        product
    });
})

//get single product by ID => /api/v1/products/:id
export const getSingleProduct = catchAsyncErrors( async(req, res, next) => {
<<<<<<< HEAD
    const product = await Product.findById(req.params.id);
=======
    const product = await Product.findById(req.params.id).populate('reviews.user');
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(201).json({
        product
    });
})

<<<<<<< HEAD
=======
//get products - ADMIN => /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors( async(req, res, next) => {
    const products = await Product.find();

    res.status(201).json({
        products,
    });
})

>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
//update single product by ID => /api/v1/products/:id
export const updateSingleProduct = catchAsyncErrors( async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(201).json({
        product
    });
})

<<<<<<< HEAD
=======
//upload product images => /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors( async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    const uploader=async (image) => upload_file(image, "shopit/products");

    const urls=await Promise.all((req?.body?.images).map(uploader));

    product?.images?.push(...urls);
    await product?.save();

    res.status(201).json({
        product
    });
})

>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
//delete single product by ID => /api/v1/products/:id
export const deleteSingleProduct = catchAsyncErrors( async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    await Product.findByIdAndDelete(req.params.id);

<<<<<<< HEAD
=======
    //delete images associated with product
    for(let i=0; i<product?.images?.length; i++){
        await delete_file(product?.images[i].public_id);
    }

>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
    res.status(201).json({
        product
    });
});

//create/update product review => /api/v1/reviews
export const createProductReview = catchAsyncErrors( async(req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
    });
});

//Get product review => /api/v1/reviews
export const getProductReview = catchAsyncErrors( async(req, res, next) => {
<<<<<<< HEAD
    const product = await Product.findById(req.query.id);
=======
    const product = await Product.findById(req.query.id).populate("reviews.user");
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(201).json({
        reviews: product.reviews,
    });
})

//Delete product review => /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors( async(req, res, next) => {

<<<<<<< HEAD
    const product = await Product.findById(req.query.productId);
=======
    const product = await Product.findById(req.body.productId);
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    const reviews = product.reviews.filter(
<<<<<<< HEAD
        (rev) => rev._id.toString() !== req.query.id.toString()
=======
        (rev) => rev._id.toString() !== req.body.id.toString()
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
    );

    const numOfReviews = reviews.length;

    const ratings = numOfReviews === 0 ? 0 :  product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

<<<<<<< HEAD
    await Product.findByIdAndUpdate(req.query.productId, {
=======
    await Product.findByIdAndUpdate(req.body.productId, {
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
        reviews,
        ratings,
        numOfReviews,
    }, { new: true }
    );

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
    });
<<<<<<< HEAD
});
=======
});

//can user review => /api/v1/can_review
export const canUserReview = catchAsyncErrors( async(req, res, next) => {
    const order= await Order.find({
        user: req.user._id,
        "orderItems.product": req.query.productId,
    })

    if(order.length === 0){
        return res.status(201).json({
            canReview: false,
        });
    }

    res.status(201).json({
        canReview: true,
    });
})
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
