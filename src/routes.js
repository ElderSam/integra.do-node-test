const express = require("express");
const routes = express.Router();

const { getAllUniversitiesData } = require("./services/searchUniversities");

routes.get("/", (req, res) => {
	res.send("Hello World!");
});

routes.get("/universities", async (req, res) => {
	const data = await getAllUniversitiesData()
	res.send(data);
});

module.exports = routes;
