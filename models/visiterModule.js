import mongoose from "mongoose";

const VisiterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    qualification: { type: String, require: true },
},
    { timestamps: true });
const VisiterModel = mongoose.model("fslVisitor", VisiterSchema);
export default VisiterModel;