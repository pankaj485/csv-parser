const fs = require("fs");
const { parse } = require("csv-parse");

const parseCsv = (file: string) => {
	const parserConfig = { delimeter: ",", from_line: 4, trim: true };

	fs.createReadStream(file)
		.pipe(parse(parserConfig))
		.on("data", function (record: string[]) {
			console.log(record);
		});
};

export { parseCsv };
