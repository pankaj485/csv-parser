import path from "path";
import fs from "fs";
import { getFiles } from "./utils/getfiles";
import { parseCsv } from "./utils/csvParser";

const baseUploadPath = path.join(__dirname, "../public/uploads/");
// if the directory doesn't exist then create it
if (!fs.existsSync(baseUploadPath)) {
	fs.mkdirSync(baseUploadPath, { recursive: true });
}

const file = getFiles(baseUploadPath)[0];

parseCsv(baseUploadPath + file);
