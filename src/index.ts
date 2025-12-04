import 'dotenv/config'
import express from 'express'
import dotenv from 'dotenv'
import customerRouter from './routes/customer.router.js'
import orderRouter from './routes/orderRouter.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import dashboardRouter from './routes/dashboardRouter.js'
import { errorHandler } from './middleware/errorHandler.js'
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
app.use(errorHandler)

app.listen(3000, ()=> console.log('Servidor rodando...'))