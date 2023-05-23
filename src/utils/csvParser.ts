const fs = require("fs");
const csv = require("csv-parser");

const parseCsv = (filePath: string) => {
	const file = filePath.split("/")[filePath.split("/").length - 1];
	if (file !== "undefined") {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (data: any) => console.log(data))
			.on("end", () => {
				// [
				//   { NAME: 'Daffy Duck', AGE: '24' },
				//   { NAME: 'Bugs Bunny', AGE: '22' }
				// ]
			});
	} else {
		console.log("No files found. Please upload at least one file to continue.");
	}
};

export { parseCsv };
