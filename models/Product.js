import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    photo: String,
    category: String,
    stripe_id: String
});

export default mongoose.model("Product", productSchema);
