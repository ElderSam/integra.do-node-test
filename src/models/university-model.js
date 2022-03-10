const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const University = new Schema({
	country: { type: String, required: true },
	name: { type: String, required: true },
	domains: { type: [String], required: true },
	alpha_two_code: { type: String, required: true },
	"state-province": { type: String, required: false },
	web_pages: { type: [String], required: true },
});

module.exports = mongoose.model("universities", University);
