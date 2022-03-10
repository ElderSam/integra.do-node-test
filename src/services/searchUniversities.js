const api = require("./api");

const countries = [
	"argentina",
	"brasil",
	"chile",
	"colombia",
	"paraguai",
	"peru",
	"suriname",
	"uruguay",
];

async function getUniversitiesByCountry(country) {
	return api
		.get("/search", { params: { country } })
		.then((res) => {
			console.log(`Total ${country}: `, res.data.length);
			return res.data;
		})
		.catch((err) => console.log(`Error! ${err}`));
}

async function getAllUniversitiesData() {
	const arrRequests = countries.map((country) => {
		return getUniversitiesByCountry(country);
	});

	const responses = await Promise.all(arrRequests);
	// console.log("total Arr responses: ", responses.length);

	// treat data
	const getUniqueArray = (responses) => {
		let newArr = [];
		responses.forEach((subArr) => {
			newArr = [...newArr, ...subArr];
		});
		return newArr;
	};

	return getUniqueArray(responses)
}

module.exports = { getAllUniversitiesData };
