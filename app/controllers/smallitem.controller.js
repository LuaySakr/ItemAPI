"use strict";

var BigItemCtrl = function(BigItem){

	var BigItemObj = {};

	BigItemObj.PostBigItem = function(req, res, next){
		var newBigItem = new BigItem(req.body);
		newBigItem.save(function(err, smallitem){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, smallitem: smallitem});
		});
	}

	BigItemObj.GetBigItem = function(req, res, next){
		BigItem.find(function(err, smallitem){
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, smallitem: smallitem});
		});
	}

	BigItemObj.UpdateBigItem = function(req, res, next){
		var completed = req.body.completed;
		BigItem.findById(req.params.smallitem_id, function(err, smallitem){
			smallitem.completed = completed;
			smallitem.save(function(err, smallitem){
				if(err) {
					res.json({status: false, error: "Status not updated"});
				}
				res.json({status: true, message: "Status updated successfully"});
			});
		});
	}

	BigItemObj.DeleteBigItem = function(req, res, next){
		BigItem.remove({_id : req.params.smallitem_id }, function(err, smallitem){
			if(err) {
				res.json({status: false, error: "Deleting smallitem is not successfull"});
			}
			res.json({status: true, message: "BigItem deleted successfully"});
		});
	}

	return BigItemObj;
}

module.exports = BigItemCtrl;
