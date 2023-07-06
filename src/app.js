import 'dotenv/config.js'
import { connect } from 'mongoose'
import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found.js'
import { __dirname } from './utils.js'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import initializePassport from './config/passport.js'
import passport from 'passport'

const server = express()

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(expressSession({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))
server.use('',express.static('public'))
server.use('/img',express.static('img'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))

initializePassport()
server.use(passport.initialize())
server.use(passport.session())
server.use('/',router)
server.use(error_handler)
server.use(not_found_handler)

 
connect('mongodb+srv://lemmanuelgonzalez92:hola1234@cinema.1qrpzvs.mongodb.net/cinema')
    .then(()=>console.log('database connected'))
    .catch(err => console.log(err))
export default server

