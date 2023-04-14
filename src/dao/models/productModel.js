import { Schema, model } from "mongoose";
import { mongoosePaginate } from 'mongoose-paginate-v2'

const productCollection = 'products' 

const productSchema = new Schema({

})

productSchema.plugin(mongoosePaginate)
const productModel = model(productCollection,productSchema)

export default productModel

