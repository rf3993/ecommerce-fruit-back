import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    username: String,
    encrypted_password: String,
    invoces: [{ type: Schema.Types.ObjectId, ref: "Invoice" }]
});

export default mongoose.model("User", userSchema);