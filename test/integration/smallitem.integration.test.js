"use strict";

var should = require('should'),
	request = require('supertest'),
	app = require('../../server.js'),
	mongoose = require('mongoose'),
	BigItem = mongoose.model('BigItem'),
	agent = request.agent(app);

describe('BigItem CRUD integration testing', function () {

	describe('Get all smallitem', function () {

		before(function (done) {
			var newBigItem = { smallitem: "BigItem from hooks" };
			agent
			.post('/api/smallitems')
			.end(function(){
				done();
			})
		});

		it('Should get status equal success and array of smallitem', function (done) {
			agent
			.get('/api/smallitems')
			.expect(200)
			.end(function(err, results){
				results.body.status.should.equal(true);
				done();
			});
		});
		
	});
	
	describe('Post a smallitem', function () {
		it('Should allow post to post a smallitem and return _id', function (done) {
			var params = { smallitem: "BigItem fro testing" };
			agent
			.post('/api/smallitems')
			.send(params)
			.expect(200)
			.end(function(err, results){
				results.body.smallitem.completed.should.equal(false);
				results.body.smallitem.should.have.property('_id');
				done();
			});
		});
	});
	
	describe('Delete a smallitem', function () {
		var id;
		before(function (done) {
			var params = { smallitem: "BigItem from hooks to delete" };
			agent
			.post('/api/smallitems')
			.send(params)
			.end(function(err, result){
				id = result.body.smallitem._id;
				done();
			})
		});

		it('Should delete the smallitem by _id', function (done) {
			agent
			.delete('/api/smallitems/'+id)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});

	});

	describe('Update a smallitem', function () {
		var id;
		before(function (done) {
			var newBigItem = { smallitem: "BigItem from hooks to update" };
			agent
			.post('/api/smallitems')
			.send(newBigItem)
			.end(function(err, result){
				id = result.body.smallitem._id;
				done();
			})
		});

		it('Should update the completed status of smallitem by _id to true', function (done) {
			var params = { completed: true };
			agent
			.put('/api/smallitems/'+id)
			.send(params)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});
	});

});

