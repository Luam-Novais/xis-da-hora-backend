import 'dotenv/config'
import express from 'express'
import dotenv from 'dotenv'
import customerRouter from './routes/customer.router.js'
import orderRouter from './routes/order.router.js'
import productRouter from './routes/product.router.js'
import categoryRouter from './routes/category.router.js'
import dashboardRouter from './routes/dashboard.router.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocs } from './swagger/swagger.js'

dotenv.config()
const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/customer', customerRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/order', orderRouter)
app.use('/dashboard', dashboardRouter)
app.listen(3000, ()=> console.log('Servidor rodando...'))