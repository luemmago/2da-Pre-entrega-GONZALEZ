import { Router } from "express";
import User from '../../models/User.js'
import validator_register from "../middlewares/validator.js";
import validator_signin from "../../middlewares/validator_Signin.js"
import pass_is_8 from "../../middlewares/pass_is_8.js";
import isValidPassword from "../../middlewares/isValidPassword.js";
import passport from "passport";

const router = Router()

router.get('/github', passport.authenticate('github', { scope:['user:email']}), (req,res)=>{})
router.get(
    'github/callback',
    passport.authenticate('github', { failureRedirect:'/api/auth/fail-register-github'}),
    (req,res)=> res.status(200).redirect('/)')
)
router.get('fail-register-github', (req, res)=> res.status(403).json({
    success: false,
    message: 'bad auth'
}))

export default router



