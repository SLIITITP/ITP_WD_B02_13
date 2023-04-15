const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });

const URL = process.env.MONGODB_URL;

const frontend = new MongoClient(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

var _db;

module.exports = {
	connectToServer: function (callback) {
		frontend.connect(function (err, db) {
			//verify the db object
			if (db) {
				_db = db.db("sansalu");
				console.log("MongoDB Connection Success!");
			}
		});
	},

	getDb: function () {
		return _db;
	},
};
