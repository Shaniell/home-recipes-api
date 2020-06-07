var express  = require('express');

require('./db/mongoose');
const User = require('./models/user');
const Recipe = require('./models/recipe');

const recipesRouter = require('./routers/recipes');
const usersRouter = require('./routers/users');

var app = express();   
const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));   
app.use(express.json());
app.use(recipesRouter);
app.use(usersRouter);


app.listen(port, ()=>{
    console.log("App listening on port: " + port);
});