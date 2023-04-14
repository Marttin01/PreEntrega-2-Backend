import express,{ Router } from "express";
import { productRouter } from "./productsRouter";

export const apiRouter = Router()
apiRouter.use('/products', productRouter)
apiRouter.use('/carts', cartRouter)



