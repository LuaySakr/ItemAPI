var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BigItem schema
var BigItemSchema = new Schema({
	smallitem: String,
	completed: { type:Boolean, default: false },
	created_by: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
BigItemSchema.pre('save', function(next, done) {
	if(!this.smallitem){
		next(new Error("smallitem should not be null"));
	}
  	next();
});

var BigItemModel = mongoose.model('BigItem', BigItemSchema);

module.exports = BigItemModel;