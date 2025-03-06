import express from 'express'

import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import orderRouter from './routes/orderRoute.js'

//Add config: 
const app = express()
const port = 4000


//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: 'https://afandi-menu.onrender.com', // Allow frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    credentials: true // Allow cookies and authentication headers
}));

// db connection
connectDB()


//api endpoint
app.use("/api/food" , foodRouter)
app.use("/image" , express.static('uploads'))
app.use('/api/order', orderRouter);

app.get('/' , (req, res)=>{
    res.send("Welcome to API")
})


app.listen(port , ()=>{
    console.log(`Server started on http://localhost:${port}`)
})

