import PendingVerifyUser from "../../models/PendingVerifyUser"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import crypto from "crypto"

// Accepts email returns token
const handler = async (req, res) => {
    if (req.method != 'POST') {
        res.status(405).send({ error: 'Only POST request allowed' })
        return
    }
    const body = JSON.parse(req.body)
    if (!body.email) {
        res.status(400).send({ error: 'Email required' })
        return
    }
    let user = await User.findOne({ email: body.email })
    if (user) {
        res.status(400).send({ message: 'An user with the email already exists' })
        return
    }
    let token = crypto.randomBytes(20).toString('hex')
    await PendingVerifyUser.updateOne({ email: body.email }, { email: body.email, token: token }, { upsert: true })
    res.status(200).send({ success: true, token: token })
}
export default connectDb(handler)