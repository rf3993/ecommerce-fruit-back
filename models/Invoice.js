import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema({
    invoiceId: String,
    total: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

const Invoice = mongoose.model("Invoices", invoiceSchema);

export default Invoice;