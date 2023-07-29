import fs from "fs";
import path from "path";
import { parseCsv } from "./utils/csvParser";
import { getFiles } from "./utils/getfiles";
import { getHeaders } from "./utils/getHeaders";

const baseUploadPath = path.join(__dirname, "../public/uploads/");
// if the directory doesn't exist then create it
if (!fs.existsSync(baseUploadPath)) {
	console.log("creating file upload directory");
	fs.mkdirSync(baseUploadPath, { recursive: true });
}

getFiles(baseUploadPath).map((fileName) => {
	// NOTE: the values are hardcoded based on the file used in the developement
	// "description", "industry", "level", "size", "line_code", "value"
	parseCsv(baseUploadPath + fileName, {
		from_line: 10,
		to_line: 50,
		headers: ["level", "basePrice"],
	});

	getHeaders(baseUploadPath + fileName, {}).then((data) => console.log(data));
});
