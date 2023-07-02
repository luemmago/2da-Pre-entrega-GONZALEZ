import { hashSync, genSaltSync } from 'bcrypt'

export default function createHash(req, res, next) {
    const {password} = req.body
    const hashPassword = hashSync
    req.body.password = hashSync(
        password, // defino la contraseña a has
        genSaltSync() //defino nivel de protection
    )
    req.body.password = hashPassword
    return next()
}
