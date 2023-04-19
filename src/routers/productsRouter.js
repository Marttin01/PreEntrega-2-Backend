import { Router } from "express";
import productModel from "../dao/models/productModel.js";


export const productRouter = Router()


productRouter.get('/', async (req,res) => {
    try {
        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const sort = req.query.sort || ''
        const query = req.query.query ||''

        let products = await productModel.paginate({},{limit:limit,page:page,sort:sort,query:query})

        if(products.hasPrevPage === false) {
            products.prevLink = null
        }else {
            products.prevLink = `http://localhost:8080/api/products?page=${parseInt(page) - 1}`
        }

        if(products.hasNextPage === false){
            products.nextLink = null
        }else{
            products.nextLink = `http://localhost:8080/api/products?page=${parseInt(page) + 1}`
        }
        
        res.send({result:'succes',payload:products})

    } catch (error) {
        res.status(404).json({error:'Productos no encontrados'})
    }
    
})

productRouter.get('/:pid', async (req,res) =>{
    try {
        let product = await productModel.findById({_id:req.params.pid})
        res.send({result:'succes',payload:product})
    } catch (error) {
        res.status(400).json({error:'Producto no encontrado'})
    }
})

productRouter.put('/:pid', async (req,res) => {
    try {
        if( !req.body.title || !req.body.description || !req.body.status || !req.body.category || !req.body.thumbnail || !req.body.price ){
            return res.send({result:'error', error:'Campos incompletos'})
        }
        let result = await productModel.updateOne({_id:req.params.pid},req.body)
        res.send({result:'succes',payload:result})
    } catch (error) {
        res.status(400).json({error:'Producto no encontrado'})
    }
})

productRouter.post('/', async (req,res) => {
    try {
        let exist = await productModel.findOne({title:req.body.title})
        if(exist) {
            return res.send({result:'error', error:'producto repetido'})
        }
        let product = await productModel.create({...req.body})
        res.send({result:'correct', payload:product})
    } catch (error) {
        res.status(400).json({error:'Producto no valido'})
    }
})

productRouter.delete('/:pid', async (req,res) =>{
    try {
        let product = await productModel.deleteOne({_id:req.params.pid})
        res.send({result:'succes', payload:product})
    } catch (error) {
        res.status(400).json({error:'Producto no encontrado'})
    }
})
