import express from 'express';
import 'dotenv/config.js'
import morgan from 'morgan'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found_handler.js'
import index_router from './router/index.js';

const server = express()

//middleware
server.use('/', express.static('public'))
server.use('/otra', express.static('otra'))
server.use(express.json())
server.use(express.urlencoded({ extended:true}))
server.use(morgan('dev'))

server.use('/api',index_router)
server.use(error_handler)
server.use(not_found_handler)






export default server