import express from 'express';
import mongod from './db/mongo-db.js';
import mongoose from 'mongoose';
import UserRouter from './controllers/user_controller.js'
import ProductRouter from './controllers/product_controller.js'
import stripeMethods from './services/stripe.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(mongod.getUri()).then(() => {
    const app = express();

    app.use(express.static('public'))

    app.use(cors());
    app.use(express.json());
    
    app.get("/health", (req,res) => {
        res.send("Alive");
    });

    app.use("/users", UserRouter);

    app.use("/products", ProductRouter);

    app.post("/shopping-car/checkout", async (req, res) => {
        const { items } = req.body;
        const line_items = items.map((e) => {
            return {
                quantity: e.quantity,
                price: e.product.stripe_id
            }
        });
        const paymentLink = await stripeMethods.createPaymentLink({line_items});
        res.send(paymentLink);
    })

    app.listen(process.env.PORT);
}).catch(() => {
    console.log("Erro ao conectar no banco")
})


