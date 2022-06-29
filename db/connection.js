const mongoose = require('mongoose');

/*
mongoose.connect("mongodb://localhost:27017/erpdatabase",
 {useNewUrlParser: true, useUnifiedTopology: true, family:4,autoIndex: true})
.then(() => console.log("connection successful"))
.catch((err) => console.log(err));
*/

//atlas connection
const DB = 'mongodb+srv://erpproject:erp@cluster0.boemuql.mongodb.net/erpdatabase?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser: true, useUnifiedTopology: true, family:4
}).then( () => {
    console.log('connection successful')
}).catch( (err) => {
    console.log('connection failed...')
})


