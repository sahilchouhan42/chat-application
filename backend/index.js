import express, { urlencoded } from 'express'
import "dotenv/config"
import cookieParser from 'cookie-parser'
import { connectDB } from './src/config/database.js'
import userRoutes from '../backend/src/routes/user.route.js'
import messageRoutes from '../backend/src/routes/message.route.js'
import cors from 'cors'
import {server, app} from './socket/socket.js'

// const app = express()

const port = process.env.port

connectDB()
// app.use(cors())
app.use(cors({
  origin: "https://chat-application-111.netlify.app",
  credentials: true
}));
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', messageRoutes)

server.listen(port, ()=>console.log(`server is listen on port ${port}`))