import dotenv from 'dotenv'
dotenv.config()
const porta = process.env.DATABASE_URL;
console.log(porta)