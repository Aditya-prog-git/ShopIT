import express from "express";
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
<<<<<<< HEAD
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderControllers.js";
=======
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, updateOrder, getSales } from "../controllers/orderControllers.js";
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);
<<<<<<< HEAD
=======
router.route("/admin/get_sales").get(isAuthenticatedUser, authorizeRoles("admin"), getSales);
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router.route("/admin/orders/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);



export default router;