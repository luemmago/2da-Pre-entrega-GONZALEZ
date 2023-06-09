import express  from 'express'

const server = express()

//middlewares
server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({ extended:true}))

server.use(error_handler)
server.use(not_found_handler)

export default server