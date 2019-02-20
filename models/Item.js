const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BigItemSchema = new Schema({
    smallitemId:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required:true
    }
    // ,
    // details:{
    //     type: String,
    //     required: true
    // },
    // user:{
    //     type: String,
    //     required: true
    // },
    // Date:{
    //     type: Date,
    //     default: Date.now
    // },
    // Photo:{
    //     type: String,
    //     default:"www.google.com"
    // }
});

mongoose.model('smallitems',BigItemSchema);
