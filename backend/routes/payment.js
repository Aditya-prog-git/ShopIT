import express from 'express';
const router = express.Router();

import { isAuthenticatedUser } from '../middlewares/auth.js';
<<<<<<< HEAD
import { stripeCheckoutSession } from '../controllers/paymentControllers.js';

router.route("/payment/checkout_session").post(isAuthenticatedUser, stripeCheckoutSession);

=======
import { stripeCheckoutSession, stripeWebhook } from '../controllers/paymentControllers.js';

router.route("/payment/checkout_session").post(isAuthenticatedUser, stripeCheckoutSession);

router.route("/payment/webhook").post(stripeWebhook);

>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

export default router;   