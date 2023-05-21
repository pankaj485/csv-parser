import fs from "fs";
import XLSX from "xlsx";
const isOfFormat = (fileToVerify: string, formatToVerify: string) => {
	const fileFormat = fileToVerify.split(".")[fileToVerify.split(".").length - 1];

	return fileFormat === formatToVerify ? true : false;
};
const convertToFormat = (file: string, basePath: string, format: string) => {
	const fileName = file.split(".")[0];
	const modifiedFile = `${fileName}.${format}`;
	const workBook = XLSX.readFile(basePath + file);
	let converted: boolean = false;

	if (format === "csv") {
		converted = true;
		XLSX.writeFile(workBook, basePath + modifiedFile, { bookType: format });
	}

	console.log(
		converted
			? `converted "${file}" to "${modifiedFile}"`
			: `failed to convert "${file}" to "${modifiedFile}"`
	);
	return modifiedFile;
};

const getFiles = (basePath: string) => {
	const availableFiles: string[] = [];

	// if the directory doesn't exist then create it
	if (!fs.existsSync(basePath)) {
		fs.mkdirSync(basePath, { recursive: true });
	}

	fs.readdirSync(basePath).map((file) => {
		if (isOfFormat(file, "csv")) {
			availableFiles.push(file);
		} else if (isOfFormat(file, "xlsx")) {
			availableFiles.push(convertToFormat(file, basePath, "csv"));
		}
	});

	return [...new Set(availableFiles)];
};

export { getFiles };
