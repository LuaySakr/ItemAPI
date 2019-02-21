"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

var BigItemModel = require('../../../app/models/smallitem.model');

describe('BigItemController testing', function () {

	describe('BigItem Post test', function () {
		
		it('Should call save only once', function () {
			var saveStub = sinon.stub();
			function Book(){
				this.save = saveStub
			}
			var req = {
				body: {
					smallitem: "Test smallitem from mock"
				}
			}
			var res = {}, next = {};
			var BigItemController = require('../../../app/controllers/smallitem.controller')(Book);
			BigItemController.PostBigItem(req, res, next);
			sinon.assert.calledOnce(saveStub);
		});

		it('Should save smallitem', function (done) {
			var smallitemMock = sinon.mock(new BigItemModel({ smallitem: 'Save new smallitem from mock'}));
			var smallitem = smallitemMock.object;

			smallitemMock
			.expects('save')
			.yields(null, 'SAVED');

			smallitem.save(function(err, result) {
				smallitemMock.verify();
				smallitemMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});

	});

	describe('Get all BigItem test', function () {
		it('Should call find once', function (done) {
			var BigItemMock = sinon.mock(BigItemModel);
			BigItemMock
			.expects('find')
			.yields(null, 'CAPITEMS');

			BigItemModel.find(function (err, result) {
				BigItemMock.verify();
				BigItemMock.restore();
				should.equal('CAPITEMS', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Delete smallitem test', function () {
		it('Should delete smallitem of gived id', function (done) {
			var BigItemMock = sinon.mock(BigItemModel);

			BigItemMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');

			BigItemModel.remove({_id: 12345}, function(err, result){
				BigItemMock.verify();
				BigItemMock.restore();
				done();
			})


		});
	});

	describe('Update a smallitem', function () {
		it('Should update the smallitem with new value', function (done) {
			var smallitemMock = sinon.mock(new BigItemModel({ smallitem: 'Save new smallitem from mock'}));
			var smallitem = smallitemMock.object;

			smallitemMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');

			smallitem.save({_id: 12345}, function(err, result){
				smallitemMock.verify();
				smallitemMock.restore();
				done();
			})

		});
	});

});