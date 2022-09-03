const express=require('express');
const connectDb = require('./database/db');
const { errorHandler } = require('./middlewares/errorMiddleware');
const app=express();
const cors=require('cors')
const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use(express.json());
connectDb();
const userRouter=require('./routes/userRoutes');
app.use('/api/user',userRouter);
app.use(errorHandler)
app.listen(5000, () => {
    console.log(`Server is listening on 5000`);
})