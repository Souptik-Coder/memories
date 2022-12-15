import PendingVerifyUser from "../../models/PendingVerifyUser"
import connectDb from "../../middleware/mongoose"
import CryptoJS from "crypto-js"
import User from "../../models/User"


// Accepts token and user details to create account
const handler = async (req, res) => {
    if (req.method != 'POST') {
        res.status(405).send({ message: 'Only POST request allowed' })
        return
    }
    const body = JSON.parse(req.body)
    if (!body.token && !body.password && !body.username) {
        res.status(400).send({ message: 'Token or password missing' })
        return
    }
    let token = body.token
    let pendingVerifyUser = await PendingVerifyUser.findOne({ token: token })
    if (pendingVerifyUser == null) {
        res.status(400).send({ message: 'Email verification link seems to be invalid' })
        return
    }
    let encryptedPassword = CryptoJS.AES.encrypt(body.password, process.env.SECRET_KEY).toString();
    let user = User({ username: body.username, email: pendingVerifyUser.email, password: encryptedPassword })
    user.save()
    res.status(200).send({ success: true })
    pendingVerifyUser.delete()
}
export default connectDb(handler)