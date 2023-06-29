import { Router } from "express";
import User from '../models/User'

const auth_router = Router()

//register routes
auth_router.post('/register',async (req, res,next) => {
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

export default index_router