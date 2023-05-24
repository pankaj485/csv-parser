import fs from "fs";
import csv from "csv-parser";

type options = {
	headers?: string[]; // "description", "industry", "level", "size", "line_code", "value"
};

const parseCsv = (filePath: string, options: options) => {
	const file = filePath.split("/")[filePath.split("/").length - 1];

	if (file !== "undefined") {
		options.headers?.forEach((header) => {
			console.log(header);
		});

		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (data: any) => {
				options.headers?.forEach((header) => {
					console.log(data[header]);
				});
			})
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
