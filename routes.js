'use strict';
const BigItemController = require('./BigItemController');
module.exports = function (app, ) {
  const smallitemController = new BigItemController();
  app.route('/smallitems')
    .get(function(req,resp,tracer) {return smallitemController.list(req,resp,tracer)})
    .post(function(req,resp) {return smallitemController.create(req,resp)});

  app.route('/smallitems/:smallitemId')
    .delete(function(req,resp) {return smallitemController.delete(req,resp)})
    .put(function(req,resp) {return smallitemController.edit(req,resp)});
};