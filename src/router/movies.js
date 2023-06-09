import { Router } from "express";
import Movie from "../models/Movie.js";

let movies_router = Router()

movies_router.post(
    '/',
    async(req,res,next) => {
        try {
            let one = await Movie.create(req.body)
            return res.status(201).json({
                success: true,
                message: `movie id=${one._id} created`
            })
        } catch (error) {
            next(error)
        }
    }
)
movies_router.get('/', async(req,res,next)=> {
    let page = req.query.page ?? 1
    let limit = req.query.limit ?? 5
    let title = req.query.title ?? ''
    title = new RegExp(title,'i')   //expresion regular incluir
    console.log(title);
    try {
        let all = await Movie.paginate(
            { title },              //objeto con queries para filtros
            { limit,page }          //limit y page de la paginacion
        )
        return res.status(200).json({ success: true, response: all })
    } catch (error) {
        next(error)
    }
})
movies_router.get(
    '/query-stats',
    async(req,res,next) => {
        try {
            let quantity = await Movie.find({ price: {$gt: 40} })
            let stats = await Movie.find({ price: {$gt: 40} }).explain('executionStats')
            //console.log(stats)
            return res.status(200).json({
                success: true,
                quantity: quantity.length,
                time: stats.executionStats.executionTimeMillis
            })
        } catch (error) {
            next(error)
        }
    }
)
movies_router.put(
    '/:id',
    async(req,res,next)=> {
        try {
            let one = await Movie.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            if (one) {
                return res.status(200).json({
                    success: true,
                    data: one
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
movies_router.delete(
    '/:id',
    async(req,res,next) => {
        try {
            let one = await Movie.findByIdAndDelete(req.params.id)
            if (one) {
                return res.status(200).json({
                    success: true,
                    message: 'movie deleted!'
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'not found'                    
                })
            }
        } catch (error) {
            next(error)
        }
    }
)

export default movies_router