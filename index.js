
const bodyParser = require('body-parser');
const routes = require('./routes');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
let cookieParser = require('cookie-parser');
const multer = require('multer');

const upload = multer();
const path = require('path');


const app = express();


app.use(cors());
app.use(morgan(':method :url :status :user-agent - :response-time ms'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));;




// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));


app.use('/',  require('./routes/index'));

app.use(function(err,req,res,next){
  res.status(422).send({error: err.message});
});


app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Express app running on port ' + (process.env.PORT || 3000))
});