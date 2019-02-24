var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./app/config/config');
var cors = require('cors');
var app = express();


const appzip = require('appmetrics-zipkin')({
  host: 'localhost',
  port: 9411,
  serviceName: 'smallitem-api'
});

var opbeat = require('opbeat').start(

)

app.use(morgan('dev'));                                         
app.use(cors());
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());                                   
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());


require('./app/router/router')(app);

var db;

if(process.env.NODE_ENV === "test") {
	db = mongoose.connect(config.test_db);
	app.listen(config.test_port, function(err){
	  if(err) throw err;
	  console.log("App listening on port "+config.test_port);
	});
} else {
 	db = mongoose.connect(config.db);
        app.listen(config.port, function(err){
	  if(err) throw err;
	  console.log("App listening on port "+config.port);
	});
}

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

const request = require("request");

function intervalFunc() {
	console.log('Cant stop me now!');
	
	var options = {

    uri: "http://localhost:7005/api/smallitems",

    method: 'GET'



	};
	request(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {
     
      // console.log(JSON.parse(body).smallitem);

     






    }
    else {

      //console.log(error);
    }

  })
}

setInterval(intervalFunc, 10000);




module.exports = app;
