var express  = require('express');
var cors  = require('cors');

require('./db/mongoose');
const User = require('./models/user');
const Recipe = require('./models/recipe');

const recipesRouter = require('./routers/recipes');
const usersRouter = require('./routers/users');
const utilsRouter = require('./routers/utils');

var app = express();   
app.use(cors());

const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));   
app.use(express.json());
app.use(recipesRouter);
app.use(usersRouter);
app.use(utilsRouter);

// // Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


app.listen(port, ()=>{
    console.log("App listening on port: " + port);
});