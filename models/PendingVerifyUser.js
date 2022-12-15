import mongoose from 'mongoose';
const pendingVerifyUserSchema = new mongoose.Schema({
    email: { type: String },
    token:{type:String}
}, { versionKey: false })
mongoose.models={}
export default mongoose.model("PendingVerifyUser", pendingVerifyUserSchema)