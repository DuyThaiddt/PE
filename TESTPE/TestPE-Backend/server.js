//1. import express and dotenv module
import express, { application, json } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
//2. import connectDB from database.js
import connectDB from './database.js';

//9. import Object Routers
import { productRouter } from './routes/index.js';



//3. config dotenv
dotenv.config();

//4. define port
const port = process.env.PORT || 8080;

//5. define 1 web server
const app = express();
app.use(cors());

//6. use middleware to parse json
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

//10. use Object Routers
app.use('/products', productRouter);


//7. use middleware to handle error request
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});



//8. listen to port
app.listen(port, async () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});