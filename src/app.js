import mongoose from 'mongoose'
import express,{ Router } from 'express'
import { apiRouter } from './routers/apiRouter.js'

const app = express()
app.use(express.json())
app.use('/api', apiRouter)

mongoose.connect('mongodb+srv://martin:12341234@cluster01.8sxswa6.mongodb.net/ecommerce2?retryWrites=true&w=majority')

const httpServer = app.listen(8080, () => console.log('Servidor levantado en 8080'))