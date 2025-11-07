import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'


dotenv.config()
const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use(errorHandler)

app.listen(3000, ()=> console.log('Servidor rodando...'))