'use strict';
let server = require('./server');
// const cache = require('memory-cache');
const mongoose = require('mongoose');
require('./models/Item');
const BigItem = mongoose.model('smallitems');

// const {Annotation, 
//     jsonEncoder: {JSON_V2}} = require('zipkin');

// const OPERATION_CREATE = 'CREATE',
//       OPERATION_DELETE = 'DELETE';


class BigItemController {
    constructor() {
        
        this._mongoose=mongoose;


    }

    list (req, res) {
        

        var Request = require("request");

        Request.get(server.Called_API_URL, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            console.dir(JSON.parse(body));
        });


        if(req.body.smallitemId==null){
        BigItem.find({}, function(err, smallitems) {
            var smallitemMap = {};
        
            smallitems.forEach(function(smallitem) {
                smallitemMap[smallitem.smallitemId] = smallitem;
            });
        
            res.send(smallitemMap);  
          });
        }
        else
        {
            return this._getBigItemData(req.body,res);
        }
    }

    create (req, res) {
        console.log(req.body)
        var _smallitem=new BigItem(req.body)
            .save()
            .then(() => {

                res.redirect('./smallitems');
            })
            ;
    }

    edit (req, res)  {
        
        BigItem.findOne({
            smallitemId: req.params.smallitemId
        })
            .then(smallitem => {
                smallitem.smallitemId = req.body.smallitemId;
                smallitem.title = req.body.title;
    
                smallitem.save()
                    .then(smallitem => {
                       
                        res.redirect('/smallitems');
                    });
            });
    };


    
    delete (req, res) {
        console.log(req.params.smallitemId)
        BigItem.remove({ smallitemId: req.params.smallitemId })
        .then(() => {
            
            res.redirect('/smallitems');
        });
    }


    _getItemData (_data,res) {

        
        BigItem.find({smallitemId:_data.smallitemId}, function(err, smallitems) {
            var smallitemMap = {};
        
            smallitems.forEach(function(smallitem) {
                smallitemMap[smallitem.smallitemId] = smallitem;
            });
        
            res.send(smallitemMap);  
          });
        }
}

module.exports = BigItemController 