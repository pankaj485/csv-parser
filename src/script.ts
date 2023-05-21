import path from "path";
import { convertToFormat, getFiles, isOfFormat } from "./utils";

const baseUploadPath = path.join(__dirname, "../public/uploads/");

const files = getFiles(baseUploadPath);

files.map((file) => {
	const isXslxFile = isOfFormat(file, "xlsx");
	if (isXslxFile) {
		convertToFormat(file, baseUploadPath, "csv");
	}
});
