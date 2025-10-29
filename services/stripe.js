import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeMethods = {
    addProduct: async (productParams) => {
        return await stripe.products.create(productParams);
    },
    createPaymentLink: async (paymentLinkParams) => {
        return await await stripe.paymentLinks.create(paymentLinkParams);
    }
}

export default stripeMethods;