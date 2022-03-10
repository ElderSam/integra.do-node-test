const University = require("../models/university-model");
const { getAllUniversitiesData } = require("../services/searchUniversities");

populateDB = async (req, res) => {
	const data = await getAllUniversitiesData();
	console.log("total responses: ", data.length);

	if (!data) {
		return res.status(500).json({
			success: false,
			error: "Error getting data from 3rd party API",
		});
	}

	await University.deleteMany({})
		.then(() => console.log("Collection university limpada com sucesso!"))
		.catch((err) =>
			console.log("Erro! ao limpar Collection university", err)
		);

	University.insertMany(data)
		.then(() => {
			return res.status(201).json({
				success: true,
				totalInserted: data.length,
				message: "DB Populated: Universies created!",
			});
		})
		.catch((error) => {
			return res.status(500).json({
				error,
				message: "Error to popular database!",
			});
		});
};

getUniversities = async (req, res) => {
	await University.find({}, (err, universities) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!universities.length) {
			return res
				.status(404)
				.json({ success: false, error: `University not found` });
		}
		return res.status(200).json({
			success: true,
			total: universities.length,
			data: universities,
		});
	}).catch((err) => console.log(err));
};

module.exports = {
	populateDB,

	getUniversities,
};
