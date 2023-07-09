import { Router } from "express"
import passport from "passport"
import passwordIsok from "../../middlewares/passwordIsok.js"
import createToken from "../../middlewares/generateToken.js"
import createHash from "../../middlewares/create_hash.js"
import passport_call from "../../middlewares/passport_call.js"

const router = Router()

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => { })
router.get(
    '/github/callback',     //endpoint
    passport.authenticate('github', { failureRedirect: '/api/auth/fail-register' }),   //middleware con estrategia de auth de github
    (req, res) => res.status(200).redirect('/')
)
router.get('/fail-register', (req, res) => res.status(403).json({
    success: false,
    message: 'bad auth'
}))

router.post('/register',
    createHash,
    passport.authenticate('register', { failureRedirect: '/api/auth/fail-register' }),
    async (req, res, next) => {
        try {
            return res.status(200).json({
                success: true, message: 'registered ok!'
            })
        } catch (error) {
            return next(error)
        }
    }
)

router.post('/login'/* validator,strategy,password,token */,
    passport.authenticate('login', { failureRedirect: '/api/auth/fail-login' }),
    passwordIsok,
    createToken,
    async (req, res, next) => {
        try {
            return res.status(200).cookie('token', req.token, { maxAge: 60 * 60 * 1000 }).json({
                success: true, message: 'logged in!'
            })
        } catch (error) {
            next(error)
        }
    }
)
router.get('/fail-login', (req, res) => res.status(401).json({
    success: false,
    message: 'bad auth'
}))

router.post('/signout', passport_call('jwt', { session: false }), (req, res) => res.status(200).clearCookie('token').json({
    success: true,
    message: 'siggned out!'
}))

export default router