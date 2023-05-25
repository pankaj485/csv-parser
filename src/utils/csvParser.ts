import fs from "fs";
import csv from "csv-parser";

type options = {
	headers?: string[];
	from_line?: number;
	to_line?: number;
};

type currentData = {
	[key: string]: string;
};

const parseCsv = (filePath: string, options: options) => {
	const { from_line = 1, to_line = -1 } = options;
	const file = filePath.split("/")[filePath.split("/").length - 1];
	const finalParsedData: object[] = [];

	console.log(from_line, to_line);

	if (file !== "undefined") {
		let currentLine = 0;
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (data: any) => {
				currentLine++;
				if (currentLine >= from_line && (to_line === -1 || currentLine <= to_line)) {
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
				}
			})
			.on("end", () => {
				console.log(finalParsedData);
			});
	} else {
		console.log("No files found. Please upload at least one file to continue.");
	}
};

export { parseCsv };
