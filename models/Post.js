import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    title: { type: String }
}, { versionKey: false })
mongoose.models={}
export default mongoose.model("Post", postSchema)