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

createUniversity = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: "You must provide a university",
		});
	}

	const university = new University(body);

	if (!university) {
		return res.status(400).json({ success: false, error: err });
	}

	const { name, country } = university;
	const alreadyExists = await University.findOne({
		name,
		country,
		"state-province": university["state-province"],
	});

	if (alreadyExists) {
		return res.status(409).json({
			success: false,
			error: "there is already a record registered with the same; name, country & state-province",
		});
	} else {
		university
			.save()
			.then(() => {
				return res.status(201).json({
					success: true,
					id: university._id,
					message: "University created!",
				});
			})
			.catch((error) => {
				return res.status(400).json({
					error,
					message: "University not created!",
				});
			});
	}
};

updateUniversity = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    University.findOne({ _id: req.params.id }, (err, university) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'University not found!',
            })
        }
        university.name = body.name
        university.domains = body.domains
        university.web_pages = body.web_pages
        university
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: university._id,
                    message: 'University updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'University not updated!',
                })
            })
    })
}

deleteUniversity = async (req, res) => {
    await University.findOneAndDelete({ _id: req.params.id }, (err, university) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!university) {
            return res
                .status(404)
                .json({ success: false, error: `University not found` })
        }

        return res.status(200).json({ success: true, data: university })
    }).catch(err => console.log(err))
}

getUniversityById = async (req, res) => {
	await University.findOne({ _id: req.params.id }, (err, university) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}

		if (!university) {
			return res
				.status(404)
				.json({ success: false, error: `University not found` });
		}
		return res.status(200).json({ success: true, data: university });
	}).catch((err) => console.log(err));
};

getUniversities = async (req, res) => {
	const { country } = req.query;
	// console.log('req.params: ', req.query)

	const filterQuery = {};

	if (country) {
		let auxCountry;

		if (country === "brazil") {
			auxCountry = "Brasil";
		} else {
			auxCountry = country.charAt(0).toUpperCase() + country.slice(1);
		}

		filterQuery.country = auxCountry;
	}

	// console.log("filterQuery: ", filterQuery);

	const perPage = 20;
	const pageParam = parseInt(req.query.page) | 0;
	const page = Math.max(0, pageParam);

	await University.find(filterQuery)
		.limit(perPage)
		.skip(perPage * (page > 0 ? page - 1 : 0))
		.setOptions({ sanitizeFilter: true })

		.then((universities) => {
			// if (!universities.length) {
			// 	return res
			// 		.status(404)
			// 		.json({ success: false, error: `University not found` });
			// }

			// return only some fields
			const response = universities.map((university) => {
				const { _id, name, country } = university;
				return {
					_id,
					name,
					country,
					"state-province": university["state-province"],
				};
			});

			return res.status(200).json({
				success: true,
				limit: 20,
				page: page !== 0 ? page : 1,
				totalInPage: response.length,
				data: response,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({ success: false, error: err });
		});
};

module.exports = {
	populateDB,

	createUniversity,
    updateUniversity,
    deleteUniversity,
	getUniversityById,
	getUniversities,
};
