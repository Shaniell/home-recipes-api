var mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING, {
//    mongoose.connect("mongodb+srv://home-recipes:home-recipes@home-recipes-db-bht1n.mongodb.net/home-recipes?retryWrites=true&w=majority", {    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});