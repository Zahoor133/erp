const express = require('express')
require('dotenv').config();
 const connectDB = require('./db/connection.js')
const app = express()


const router = require('./router/admin.router.js');
const empRouter = require ('./router/empRoute.js')
const salRouter = require('./router/salary.router')
const stuRouter = require ('./router/studentRoute')
const facRouter = require ('./router/facultyRoute')

app.use(express.json());

app.use('/api/admin', router)
app.use('/api/admin', salRouter)
app.use('/api/employee', empRouter);
app.use('/api/student', stuRouter)





const port = process.env.PORT || 666;

/*
app.listen(port, () => {
  console.log(`server is running on ${port} port`)
})
*/
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
