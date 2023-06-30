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

export default index_routers