import mongoose, { Mongoose } from 'mongoose';
const userSchema = new mongoose.Schema({
    username:{type:String},
    email: { type: String },
    password: { type: String },
}, { versionKey: false })
export default mongoose.models.User || mongoose.model("User", userSchema)