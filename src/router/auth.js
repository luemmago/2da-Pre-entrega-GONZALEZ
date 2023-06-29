import { Router } from "express";
import index_router from ".";

const auth_router = Router()
index_router.use('/auth',auth_routers)

export default index_router