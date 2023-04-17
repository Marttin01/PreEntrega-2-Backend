import mongoose from "mongoose";
import model,{ Schema } from "mongoose";
import  mongoosePaginate  from 'mongoose-paginate-v2'


const productCollection = 'products' 

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:Boolean,
    category:String,
    thumbnail:{
        type:Object
    },
    price:Number,
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection,productSchema)

export default productModel

