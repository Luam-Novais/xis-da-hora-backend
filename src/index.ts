import 'dotenv/config'
import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRouter.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import dashboardRouter from './routes/dashboardRouter.js'
import { errorHandler } from './middleware/errorHandler.js'


dotenv.config()
const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/order', orderRouter)
app.use('/dashboard', dashboardRouter)
app.use(errorHandler)

app.listen(3000, ()=> console.log('Servidor rodando...'))