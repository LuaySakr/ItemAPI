'use strict';
const appzip = require('appmetrics-zipkin')({
  host: 'zipkin',
  port: 9411,
  serviceName: 'https-pusher'
});
const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');


const ZIPKIN_URL = process.env.ZIPKIN_URL || 'http://127.0.0.1:9411/api/v2/spans';
const {Tracer, 
  BatchRecorder,
  jsonEncoder: {JSON_V2}} = require('zipkin');
  const CLSContext = require('zipkin-context-cls');  
const {HttpLogger} = require('zipkin-transport-http');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

mongoose.Promise = global.Promise;

const db = require('./config/database');

//Connect to Mongo Locally
mongoose.connect(db.MongoURI, {

})
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch(err => {
        console.log(err);
    });

const logChannel = process.env.REDIS_CHANNEL || 'log_channel';

const port = process.env.TODO_API_PORT || 8082


const app = express()

// tracing
const ctxImpl = new CLSContext('zipkin');
const recorder = new  BatchRecorder({
  logger: new HttpLogger({
    endpoint: ZIPKIN_URL,
    jsonEncoder: JSON_V2
  })
});
const localServiceName = 'BigItem-api';
const tracer = new Tracer({ctxImpl, recorder, localServiceName});

app.use(zipkinMiddleware({tracer}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require('./routes')
routes(app, {tracer, logChannel})

app.listen(port, function () {
  console.log('smallitem list RESTful API server started on: ' + port)
})
