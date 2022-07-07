const mongoose = require('mongoose');

/*
mongoose.connect("mongodb://localhost:27017/erpdatabase",
 {useNewUrlParser: true, useUnifiedTopology: true, family:4,autoIndex: true})
.then(() => console.log("connection successful"))
.catch((err) => console.log(err));
*/

//atlas connection

const connectDB = (url) => {
    return mongoose.connect(url)
}


/*
mongoose.connect(connectionString).then(() => console.log('connected with db'))
.catch((err) => console.log(err))
*/
module.exports = connectDB

