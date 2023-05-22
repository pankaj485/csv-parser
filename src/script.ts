import path from "path";
import { getFiles } from "./utils/getfiles";
import { parseCsv } from "./utils/csvParser";

const baseUploadPath = path.join(__dirname, "../public/uploads/");

const file = getFiles(baseUploadPath)[0];

parseCsv(baseUploadPath + file);
