if(process.env.NODE_ENV === 'production'){
    module.exports = {MongoURI: 'mongodb://localhost:27017/item-db-prod'}
}else{
    module.exports = {MongoURI: 'mongodb://localhost:27017/item-db-dev'}
}