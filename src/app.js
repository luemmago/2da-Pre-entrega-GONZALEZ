import express from 'express';
import 'dotenv/config.js'
import morgan from 'morgan'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found_handler.js'
import index_router from './router/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport.js';
import inicializePassport from './config/passport.js';

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


server.use('/api',index_router)
server.use(error_handler)
server.use(not_found_handler)






export default server