import cookie from 'cookie'
import jwt from 'jsonwebtoken'

export default function verifyJWTCookie(userCookie) {
    try {
        const cookies = cookie.parse(userCookie || '');
        var decoded = jwt.verify(cookies.jwt, process.env.SECRET_KEY);
        return { success: true, email: decoded.email }
    }
    catch (error) {
        return { success: false }
    }
}