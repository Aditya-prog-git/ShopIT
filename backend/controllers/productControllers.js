import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

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
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(201).json({
        product
    });
})

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

//delete single product by ID => /api/v1/products/:id
export const deleteSingleProduct = catchAsyncErrors( async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    await Product.findByIdAndDelete(req.params.id);

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
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(201).json({
        reviews: product.reviews,
    });
})

//Delete product review => /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors( async(req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;

    const ratings = numOfReviews === 0 ? 0 :  product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, { new: true }
    );

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
    });
});