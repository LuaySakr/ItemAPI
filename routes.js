'use strict';
const TodoController = require('./BigItemController');
module.exports = function (app, {tracer, redisClient, logChannel}) {
  const todoController = new TodoController({tracer, redisClient, logChannel});
  app.route('/smallitems')
    .get(function(req,resp,tracer) {return todoController.list(req,resp,tracer)})
    .post(function(req,resp) {return todoController.create(req,resp)});

  app.route('/smallitems/:smallitemId')
    .delete(function(req,resp) {return todoController.delete(req,resp)})
    .put(function(req,resp) {return todoController.edit(req,resp)});
};