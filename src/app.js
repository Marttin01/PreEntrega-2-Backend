import mongoose from 'mongoose'
import express,{ Router } from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { engine } from 'express-handlebars'
import { Server as SocketIoServer } from 'socket.io'
import productModel from './dao/models/productModel.js'
import { paginate } from 'mongoose-paginate-v2'
import { cartModel } from './dao/models/cartModel.js'


mongoose.connect('mongodb+srv://martin:12341234@cluster01.8sxswa6.mongodb.net/ecommerce2?retryWrites=true&w=majority')

const app = express()
app.use(express.json())
app.use('/api', apiRouter)
app.engine('handlebars', engine())
app.set('views','./views')
app.set('view engine', 'handlebars')
app.use(express.static('./public'))
const httpServer = app.listen(8080, () => console.log('Servidor levantado en 8080'))

const io = new SocketIoServer(httpServer)

io.on('connection', async clientSocket => {
    console.log(`Nuevo cliente conectado, id:${clientSocket.id}`)
    
})

app.get('/products', async (req,res,next) => {

    const filter = {
        category: req.query.category ?? ""
    }
    
    function hayFiltro(filter) {
        if(filter && filter.category === ""){
            return {}
        }else return filter
    }

    const optionsPaginate = {
        limit : req.query.limit ?? 5,
        page : req.query.page ?? 1,
        lean: true
    }


    const result = await productModel.paginate(hayFiltro(filter) ,optionsPaginate)



    res.render('products',{
        pageTitle:'Products',
        hayArray: result.docs.length > 0,
        array:result.docs,
        currentPage: result.page,
        prevPage:result.prevPage,
        nextPage:result.nextPage,
        limit: result.limit,
        id: result.docs._id
    })
})

app.get('/products/:pid', async (req,res) => {

    const product = await productModel.findById({_id:req.params.pid})

    res.render('product',{
        pageTitle:product.title,
        hayProduct: product != undefined || null || 0 || "",
        product:product
    })
})

app.get('/carts/:cid', async (req,res) => {

    const cart = await cartModel.findById({_id:req.params.cid})

    res.render('cart',{
        pageTitle:`Carrito: ${cart._id}`,
        hayCart: cart != undefined || null || 0 || "",
        cart:cart
    })
})



