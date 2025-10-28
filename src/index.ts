import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'


dotenv.config()
const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use('/user', userRouter)

app.listen(3000, ()=> console.log('Servidor rodando...'))