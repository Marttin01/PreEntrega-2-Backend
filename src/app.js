import mongosee from 'mongosee'
import Router,{ Express } from 'express'
import { apiRouter } from './routers/apiRouter'

const app = express()
app.use(express.json())
app.use('/api', apiRouter)

mongosee.connect('mongodb+srv://martin:12341234@cluster01.8sxswa6.mongodb.net/ecommerce2')

const httpServer = app.listen(8080, () => console.log('Servidor levantado en 8080'))