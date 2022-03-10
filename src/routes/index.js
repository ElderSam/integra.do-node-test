const express = require("express");
const routes = express.Router();

const UniversityRouter = require("./university-router");

routes.get("/", (req, res) => {
	res.send("Hello World!");
});

routes.use(UniversityRouter)

module.exports = routes;
