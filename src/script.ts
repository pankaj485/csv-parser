import fs from "fs";
import path from "path";
import { parseCsv } from "./utils/csvParser";
import { getFiles } from "./utils/getfiles";

const baseUploadPath = path.join(__dirname, "../public/uploads/");
// if the directory doesn't exist then create it
if (!fs.existsSync(baseUploadPath)) {
	console.log("creating file upload directory");
	fs.mkdirSync(baseUploadPath, { recursive: true });
}

getFiles(baseUploadPath).map((fileName) => {
	parseCsv(baseUploadPath + fileName, {
		headers: ["description", "level"],
	});
});
