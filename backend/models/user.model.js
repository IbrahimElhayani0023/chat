import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum:["male","female"],
    },
    thamb: {
        type: String,
        default: "",
    },
},
    { timestamps: true });

 const User = mongoose.model("User", userSchema);
export default User;