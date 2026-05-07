import express from 'express';
// import { getProducts, newProduct, getSingleProduct, updateSingleProduct, deleteSingleProduct, createProductReview, getProductReview, deleteReview } from '../controllers/productControllers.js';
import { getProducts, getAdminProducts, newProduct, getSingleProduct, updateSingleProduct, deleteSingleProduct, createProductReview, getProductReview, deleteReview, canUserReview, uploadProductImages } from '../controllers/productControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/admin/products').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/products').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
.get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/products/:id/upload_images').put(isAuthenticatedUser, authorizeRoles('admin'), uploadProductImages)
router.route('/admin/products/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateSingleProduct);
router.route('/admin/products/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSingleProduct);
router.route('/reviews').put(isAuthenticatedUser, createProductReview).get(isAuthenticatedUser, getProductReview);
router.route('/admin/reviews').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview);
router.route('/can_review').get(isAuthenticatedUser, canUserReview);


export default router;   