import fs from "fs";
import csv from "csv-parser";

type options = {
	headers?: string[];
};

type currentData = {
	[key: string]: string;
};

const parseCsv = (filePath: string, options: options) => {
	const file = filePath.split("/")[filePath.split("/").length - 1];
	const finalParsedData: object[] = [];

	if (file !== "undefined") {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (data: any) => {
				let currentData: currentData = {};
				[...new Set(options.headers)]?.forEach((header) => {
					if (data[header]) {
						currentData[header] = data[header];
						finalParsedData.push(currentData);
					}
					// else {
					// console.log(`'${header}' header not found in '${file}'`);
					// currentData[header] = "";
					// }
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
