const express = require('express')
require('dotenv').config();
const connectDB = require('./db/connection.js')
const app = express()


const router = require('./router/*');


app.use(express.json());

app.use('/api/admin', router);
app.use("/api/employee",router)



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
