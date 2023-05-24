import fs from "fs";
import csv from "csv-parser";

type options = {
	headers?: string[]; // "description", "industry", "level", "size", "line_code", "value"
};

type currentData = {
	[key: string]: string;
};

const parseCsv = (filePath: string, options: options) => {
	const file = filePath.split("/")[filePath.split("/").length - 1];
	const finalParsedData: object[] = [];

	if (file !== "undefined") {
		options.headers?.forEach((header) => {
			console.log(header);
		});

		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (data: any) => {
				let currentData: currentData = {};
				options.headers?.forEach((header) => {
					currentData[header] = data[header];
					finalParsedData.push(currentData);
				});
			})
			.on("end", () => {
				console.log(finalParsedData);
			});
	} else {
		console.log("No files found. Please upload at least one file to continue.");
	}
};

export { parseCsv };
