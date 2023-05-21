import path from "path";
import { getFiles } from "./utils";

const baseUploadPath = path.join(__dirname, "../public/uploads/");

const files = getFiles(baseUploadPath);

console.log(files);
