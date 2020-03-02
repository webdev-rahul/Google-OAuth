const mongoose = require("mongoose")
const express = require("express");
const keys = require("./config/keys")
const app = express();

require("./models/User")
require("./services/passport")

mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
 ()=>{
    console.log("connected to DB");

})
require("./routes/authRoute")(app)


app.listen(3000, function (req, res) {
    console.log("Server has started on port 3000");
});