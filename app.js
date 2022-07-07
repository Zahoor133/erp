const express = require('express')
require('dotenv').config();
const connectDB = require('./db/connection.js')
const app = express()


const router = require('./router/admin.router.js');
const empRouter = require ('./router/empRoute.js')
const salaryRouter = require('./router/salary.router')


app.use(express.json());

app.use('/api/admin', router);
app.use('/api/salary', salaryRouter)
app.use('/api/employee', empRouter);




const port = process.env.PORT || 6666;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
