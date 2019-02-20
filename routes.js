'use strict';
const TodoController = require('./ItemController');
module.exports = function (app, {tracer, redisClient, logChannel}) {
  const todoController = new TodoController({tracer, redisClient, logChannel});
  app.route('/items')
    .get(function(req,resp,tracer) {return todoController.list(req,resp,tracer)})
    .post(function(req,resp) {return todoController.create(req,resp)});

  app.route('/items/:itemId')
    .delete(function(req,resp) {return todoController.delete(req,resp)})
    .put(function(req,resp) {return todoController.edit(req,resp)});
};