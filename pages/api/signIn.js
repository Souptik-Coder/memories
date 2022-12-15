import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import CryptoJS from "crypto-js"
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
// Accepts email returns token
const handler = async (req, res) => {
    if (req.method != 'POST') {
        res.status(405).send({ error: 'Only POST request allowed' })
        return
    }
    const body = JSON.parse(req.body)
    if (!body.email && !body.password) {
        res.status(400).send({ message: 'Email or password missing' })
        return
    }
    let user = await User.findOne({ email: body.email })
    if (!user) {
        res.status(400).send({ message: 'Account doesn\'t exists' })
        return
    }
    var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== body.password) {
        res.status(400).send({ message: 'Invalid password' })
        return
    }


    var token = jwt.sign({ email: body.email }, process.env.SECRET_KEY);
    res.setHeader('Set-Cookie', serialize('jwt', String(token), {
        httpOnly: true,
        expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
        path: '/'
    }))
    res.status(200).send({ success: true })
}
export default connectDb(handler)