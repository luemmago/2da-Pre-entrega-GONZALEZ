import express from 'express'
import 'dotenv/config.js'
import { connect } from 'mongoose'
import morgan from 'morgan'
import router from './router/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found_handler.js'
import session from 'express-session';
import {__dirname} from './utils.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import expressSession from 'express-session'
import passport from 'passport.js';
import inicializePassport from './config/passport.js';
import passport from './config/passport.js'

const server = express()

//middleware
server.use(session ({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 10000
    })
}))
server.use('/', express.static('public'))
server.use('/otra', express.static('otra'))
server.use(express.json())
server.use(express.urlencoded({ extended:true}))
server.use(morgan('dev'))
inicializePassport()
server.use(passport.initialize())
server.use(passport.session())
server.use('/', router)
server.use('/api',index_router)
server.use(error_handler)
server.use(not_found_handler)


