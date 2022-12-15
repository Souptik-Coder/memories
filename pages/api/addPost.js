import Post from "../../models/Post"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.query.title === undefined)
        res.status(400).json({error: "Request must contain query field title"})
    else {
        let post = new Post({title: req.query.title})
        await post.save()
        res.status(200).json({success:"Post added succesfully"})
    }
}
export default connectDb(handler)
