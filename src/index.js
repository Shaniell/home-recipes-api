var express  = require('express');

require('./db/mongoose');
const User = require('./models/user');
const Recipe = require('./models/recipe');

const recipesRouter = require('./routers/recipes');
const usersRouter = require('./routers/users');
const utilsRouter = require('./routers/utils');

var app = express();   
const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));   
app.use(express.json());
app.use(recipesRouter);
app.use(usersRouter);
app.use(utilsRouter);


app.listen(port, ()=>{
    console.log("App listening on port: " + port);
});