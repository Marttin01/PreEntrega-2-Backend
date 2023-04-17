import { Router } from "express";
import { cartModel } from "../dao/models/cartModel.js";
import productModel from "../dao/models/productModel.js";

export const cartRouter = Router()

cartRouter.get('/', async (req,res) => {
    try {
        const carts = await cartModel.find()
        res.send({result:'succes', payload:carts})
    } catch (error) {
        res.status(400).json({error:'Carritos no encontrados'})
    }
})

cartRouter.get('/:cid', async (req,res) => {
    try {
        let cart = await cartModel.findById({_id:req.params.cid})
        res.send({result:'succes', payload:cart})
    } catch (error) {
        res.status(400).json({error:'Carrito no encontrado'})
    }
})

cartRouter.post('/', async (req,res) =>{
    try {
        let cart = await cartModel.create({...req.body})
        res.status({result:'succes', payload:cart})
    } catch (error) {
        res.status(400).json({error:'Carrito no agregado'})
    }
})

cartRouter.post('/:cid/product/:pid', async (req,res) => {
    try {
        let cart = await cartModel.findById({_id:req.params.cid})
        if(!cart){
            return res.send({result:'error', error:'carrito no encontrado'})
        }

        let product = await productModel.findById({_id:req.params.pid})
        if(!product){
            return res.send({result:'error', error:'producto no encontrado'})
        }

        let productCart = cart.products.findIndex(p => p.product._id.toString() === req.params.pid.toString()) 
        if(productCart === -1){
            cart.products.push({product:product, quantity:1})
        }else{
            cart.products[productCart].quantity ++
        }

        let result = await cartModel.updateOne({_id:req.params.cid}, cart)
        res.send({result:'succes', payload:result})
    } catch (error) {
        res.status(400).json({error:'Producto o carrito no encontrado'})
    }
})

cartRouter.delete('/:cid/product/:pid', async (req,res)=>{
    try {
        let cart = await cartModel.findById({_id:req.params.cid})
        if(!cart){
            return res.send({result:'error', error:'carrito no encontrado'})
        }

        let product = await productModel.findById({_id:req.params.pid})
        if(!product){
            return res.send({result:'error', error:'producto no encontrado'})
        }

        
    } catch (error) {
        
    }
})
