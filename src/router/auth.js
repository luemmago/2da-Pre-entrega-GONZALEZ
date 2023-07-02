import { Router } from "express";
import User from '../models/User.js'
import validator_register from "../middlewares/validator.js";
import validator_signin from "../middlewares/validator_Signin.js"
import pass_is_8 from "../middlewares/pass_is_8.js";
import isValidPassword from "../middlewares/isValidPassword.js";
import passport from "passport";

const auth_router = Router()

//register routes
auth_router.post('/register',
    validator_register,
    pass_is_8,
    create_hash,
    passport.authenticate(
        'register',
        { failureRedirect: '/api/auth/fail-register' }
    ),
    (req, res,) => res.status(201).json({
        success: true,
        message: 'user created!'
    })


)

auth_router.get('/fail-register', (req, res) => res.status(400).json({
    success: false,
    message: 'error auth'
}))

auth_router.post('/signin',
    validator_signin,
    pass_is_8,
    passport.authenticate('signin', { failureRedirect: '/api/auth/fail-signin' }),
    isValidPassword,
    (req, res, next) => {
        try {
            const { email } = req.body
            req.session.email = email
            req.session.role = req.user.role
            return res.status(200).json({
                success: true,
                message: 'user signed in!'
            })


        } catch (error) {
            next(error)
        }
    }
)

auth_router.get('/fail-signin', (req, res) => res.status(400).json({
    success: false,
    message: 'error auth'
}))

//sinout
auth_router.post('signout', (req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message: 'User signed out'
        })
    } catch (error) {
        next(error)
    }
})

export default auth_router