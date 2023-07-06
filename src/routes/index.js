import { Router } from "express"
import products_router from "./api/products"
import api_router from './api/index.js'
import carts_router from './api/carts'
import auth_router from "./api/auth"

const index_router = Router()

router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/auth', auth_router)
index_router.use('/api',api_router) //enrutador de rutas que respondan con json (datos)


export default index_router

