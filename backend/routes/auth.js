import express from 'express';
import { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUsersDetails, updateUsersDetails, deleteUsersDetails, uploadAvatar } from '../controllers/authControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout); 
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route('/admin/users/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUsersDetails).put(isAuthenticatedUser, authorizeRoles('admin'), updateUsersDetails).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUsersDetails);
router.route('/me/upload_avatar').put(isAuthenticatedUser, uploadAvatar);

export default router;   