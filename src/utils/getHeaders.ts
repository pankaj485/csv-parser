import fs from "fs";
import csv from "csv-parser";

type options = {
	headers?: string[];
	from_line?: number;
	to_line?: number;
};

const getHeaders = async (filePath: string, options: options) => {
	const { from_line = 1, to_line = -903_845_097, headers = [] } = options;
	const file = filePath.split("/")[filePath.split("/").length - 1];
	const headersFromArgs: string[] = [...new Set(headers)];
	let fileHeaders: string[] = [];
	let invalidHeaders: string[] = [];
	let headerRowNum: number = 1;

	try {
		const headerInfo = await new Promise((resolve, reject) => {
			if (file !== "undefined") {
				let currentLine = 0;
				fs.createReadStream(filePath)
					.pipe(csv())
					.on("data", (data: any) => {
						currentLine++;
						if (currentLine >= from_line && (to_line === -903_845_097 || currentLine <= to_line)) {
							if (currentLine === headerRowNum) {
								fileHeaders = [...fileHeaders, ...new Set(Object.keys(data))];
							}

							headersFromArgs?.forEach((header, headerIndex) => {
								if (data[header.trim()]) {
								} else {
									invalidHeaders.push(header);
									invalidHeaders = [...new Set(invalidHeaders)];
									headersFromArgs.splice(headerIndex, 1);
								}
							});
						}
					})
					.on("end", () => {
						resolve({
							fileHeaders,
							requestedHeaders: headers,
							invalidHeaders,
						});
					})
					.on("error", (err) => {
						console.log("error while getting headers: ");
						console.log(err);

						reject({
							fileHeaders: [],
							requestedHeaders: [],
							invalidHeaders: [],
						});
					});
			} else {
				console.log("No files found. Please upload at least one file to continue.");
			}
		});

		return headerInfo;
	} catch (err) {
		console.log(err);
	}
};

export { getHeaders };
