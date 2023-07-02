import { compareSync } from 'bcrypt'
import User from "../models/User.js"

export default async function (req, res, next) {

    let verified = compareSync(
        req.body.password,
        user.password
    )
    if (verified) {
        return next()
    }
    return res.status(401).json({
        success: false,
        message: 'error de autenticación!'
    })

}
