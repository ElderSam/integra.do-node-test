const { getAllUniversitiesData } = require("./services/searchUniversities");

async function main() {
	const res = await getAllUniversitiesData();
	console.log(res.length);
}

main();
