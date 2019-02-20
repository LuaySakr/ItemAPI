'use strict';
const cache = require('memory-cache');
const mongoose = require('mongoose');
require('./models/Item');
const Item = mongoose.model('items');

const {Annotation, 
    jsonEncoder: {JSON_V2}} = require('zipkin');

const OPERATION_CREATE = 'CREATE',
      OPERATION_DELETE = 'DELETE';


class ItemController {
    constructor({tracer, redisClient,mongoose, logChannel}) {
        this._tracer = tracer;
        this._redisClient = redisClient;
        this._logChannel = logChannel;
        this._mongoose=mongoose;


    }

    list (req, res) {
        

        var Request = require("request");

        Request.get("http://item-api2:803/items33", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            console.dir(JSON.parse(body));
        });


        if(req.body.itemId==null){
        Item.find({}, function(err, items) {
            var itemMap = {};
        
            items.forEach(function(item) {
              itemMap[item.itemId] = item;
            });
        
            res.send(itemMap);  
          });
        }
        else
        {
            return this._getItemData(req.body,res);
        }
    }

    create (req, res) {
        console.log(req.body)
        var _item=new Item(req.body)
            .save()
            .then(() => {

                res.redirect('./Items');
            })
            ;
    }

    edit (req, res)  {
        console.log(req.body.title)
        Item.findOne({
            itemId: req.params.itemId
        })
            .then(item => {
                item.itemId = req.body.itemId;
                item.title = req.body.title;
    
                item.save()
                    .then(item => {
                       
                        res.redirect('/items');
                    });
            });
    };


    
    delete (req, res) {
        console.log(req.params.itemId)
        Item.remove({ itemId: req.params.itemId })
        .then(() => {
            
            res.redirect('/items');
        });
    }


    _getItemData (_data,res) {

        
        Item.find({itemId:_data.itemId}, function(err, items) {
            var itemMap = {};
        
            items.forEach(function(item) {
              itemMap[item.itemId] = item;
            });
        
            res.send(itemMap);  
          });
        }
}

module.exports = ItemController 