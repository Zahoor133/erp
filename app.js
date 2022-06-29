const express = require('express')
 require('./db/connection.js')
const app = express()


const router = require('./router/routes.js');


app.use(express.json());

app.use('/api/admin', router);




const port = process.env.PORT || 6666;
app.listen(port, () => {
    console.log(`Connection is live at port no. ${port}`)
})
