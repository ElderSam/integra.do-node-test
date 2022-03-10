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

const arrRequests = countries.map((country) => {
	return getUniversitiesByCountry(country);
});

// console.log('arrRequests')
// console.log(arrRequests)

async function getAllUniversitiesData() {
	const responses = await Promise.all(arrRequests);
	console.log("total responses: ", responses.length);

	return responses;
}

module.exports = { getAllUniversitiesData };
