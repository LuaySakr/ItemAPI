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


		const vehicleownerHostPort="http://localhost:7003/api/VehicleOwners"
		const request = require("request");
		const request2 = require("request");
		var sleep = require('sleep');
var options = {

    uri: vehicleownerHostPort,

    method: 'GET'
	};

	request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
     
	//   console.log(JSON.parse(body).vehicleowner);
	  
	  JSON.parse(body).vehicleowner.forEach(element => {


		  // console.log("old  "+element.status)
		//   console.log("sucess")
		  // console.log(element)
		  const delay = require('delay');
		   delay(1000);
		 var newstatus= Math.random() >= 0.5
		//  console.log("new  "+newstatus)
		// sleep.sleep(1);

  var options2 = {

    uri: vehicleownerHostPort+"/"+element.number,

    method: 'PUT',

    json: {

		_id:element._id,
      number: element.number,

      vehicleId: element.vehicleId,

	  customerNum: element.customerNum,
	  status:newstatus,
	  completed:element.completed

    }

  };



  console.log(options2.uri)
  request(options2, function (error, response2, body) {

    if (!error && response2.statusCode == 200) {
console.log("sucess")


//console.log(element)

	}
	else
	{
		console.log(response2.statusCode)
	}

  });


			  


	  });
    }
    else {
      console.log(error);
    }
  })







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
