var config = {
	port: process.env.PORT || 7005,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/smallitem",
	test_port: 2001,
	test_db: "mongodb://mongodb/smallitemapi_test"
}
module.exports = config;