import { Schema, model } from "mongoose";
import { mongoosePaginate } from 'mongoose-paginate-v2'

const productCollection = 'products' 

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number
})

productSchema.plugin(mongoosePaginate)
const productModel = model(productCollection,productSchema)

export default productModel

