const mongoose = require("mongoose");

console.log('mongo URI: ', process.env.MONGO_URI)

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => {
		console.log("✔️  MongoDB database started!")
	})
	.catch((e) => {
		console.error("Connection error", e.message);
	});

const db = mongoose.connection;

module.exports = db;
