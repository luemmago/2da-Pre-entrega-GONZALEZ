import { Router } from "express";
import User from '../models/User'
import validator from "../middlewares/validator";
import pass_is_8 from "../middlewares/pass_is_8";

const auth_router = Router()

//register routes
auth_router.post('/register',validator,pass_is_8, async (req, res,next) => {
    try {
        await User.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'user created!'
        })
    } catch (error) {
        next(error)
    }
})

auth_router.post('/signin', async(req, res,next) => {
    try {
        const{ mail } = req.body
        const one = await User.findOne({ email })
        if (one) {
            req.session.email = email
            req.session.role = one.role 
            return res.status(200).json ({
                success: true,
                message: 'user signed in!'   
            })
        } else {
            return res.status(404).json({ 
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        next(error)
    }
})

//sinout
auth_router.post('signout',(req,res,next) => {
    try{
        req.session.destroy()
        return res.status(200).json ({
            success: true,
            message: 'User signed out'
        })
    } catch(error) {
        next(error)
    }
})

export default auth_router