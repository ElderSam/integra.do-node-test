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
    const { country } = req.query;
    // console.log('req.params: ', req.query)

    const filterQuery = {}

    if(country) {
        let auxCountry

        if(country === 'brazil') {
            auxCountry = 'Brasil'
        } else {
            auxCountry = country.charAt(0).toUpperCase() + country.slice(1);
        }

        filterQuery.country = auxCountry
    }

    console.log('filterQuery: ', filterQuery)

    await University.find(filterQuery, (err, universities) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!universities.length) {
			return res
				.status(404)
				.json({ success: false, error: `University not found` });
		}

        // return only some fields
        const response = universities.map((university) => {
            const { _id, name, country } = university
            return { _id, name, country, "state-province": university['state-province'] }
        })

		return res.status(200).json({
			success: true,
			total: response.length,
			data: response,
		});
	})
    .setOptions({ sanitizeFilter: true })
    .catch((err) => console.log(err));
};

module.exports = {
	populateDB,

	getUniversities,
};
