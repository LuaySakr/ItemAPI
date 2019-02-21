var BigItem = require('../models/smallitem.model');
var BigItemController = require('../controllers/smallitem.controller')(BigItem);

module.exports = function(app){

	app.get('/api/smallitems', BigItemController.GetBigItem);
	
	app.post('/api/smallitems', BigItemController.PostBigItem);

	app.put('/api/smallitems/:smallitem_id', BigItemController.UpdateBigItem);

	app.delete('/api/smallitems/:smallitem_id', BigItemController.DeleteBigItem);

}