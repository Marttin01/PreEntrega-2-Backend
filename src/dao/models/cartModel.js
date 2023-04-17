import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products:{
        type: [{
            product: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:Number
        }],
        default: []
    }
})

cartSchema.pre('findById', function (){
    this.populate('products.product')
})
cartSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model(cartCollection,cartSchema)

