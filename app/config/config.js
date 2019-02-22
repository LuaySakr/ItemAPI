var config = {
	port: process.env.PORT || 2000,
	db: process.env.MONGOLAB_URI || "mongodb://mongodb/smallitem",
	test_port: 2001,
	test_db: "mongodb://mongodb/smallitemapi_test"
}
module.exports = config;