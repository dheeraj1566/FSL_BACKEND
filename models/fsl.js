import mongoose from "mongoose";
// import generatePassword from "../utilty/generatePassword.js";

const FslSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    aadharFront: { type: String, required: true },
    aadharBack: { type: String, required: true },

    laddress: { type: String, required: true },
    paddress: { type: String, required: true },

    fname: { type: String, required: true },
    fphone: { type: Number, required: true },

    areYoua: { type: String, required: true },
    qualification: { type: String },
    qualificationYear: { type: Number },
    college: { type: String },
    designation: { type: String },
    company: { type: String },

    Course: { type: String, required: true },
    knowus: { type: String, required: true },
    friendname: { type: String },

    Terms_condition: { type: Boolean, required: true },
    password: { type: String}
},
    { timestamps: true, versionKey: false });
const FslModel = mongoose.model("fsl", FslSchema);
export default FslModel;