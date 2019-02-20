if(process.env.NODE_ENV === 'production'){
    module.exports = {MongoURI: 'mongodb://mongodb-container:27017/smallitem-db-prod'}
}else{
    module.exports = {MongoURI: 'mongodb://mongodb-container:27017/smallitem-db-dev'}
}