var express  = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Recipe = require('./models/recipe');

const recipeRouter = require('./routers/recipe');

var app = express();   


//var bodyParser = require('body-parser'); 
//var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));   
// app.use(bodyParser.urlencoded({'extended':'true'}));   
// app.use(bodyParser.json());                                    
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
//app.use(methodOverride());
app.use(express.json());
app.use(recipeRouter);

const port = process.env.PORT;



app.post('/login', (req,res)=>{

    let user = new User(req.body);

    //console.log(user);
});


app.listen(port, ()=>{
    console.log("App listening on port: " + port);
});