import fs from "fs";
import XLSX from "xlsx";
const isOfFormat = (fileToVerify: string, formatToVerify: string) => {
	const fileFormat = fileToVerify.split(".")[fileToVerify.split(".").length - 1];

	return fileFormat === formatToVerify ? true : false;
};
const getFiles = (basePath: string) => {
	const availableFiles: string[] = [];

	// if the directory doesn't exist then create it
	if (!fs.existsSync(basePath)) {
		fs.mkdirSync(basePath, { recursive: true });
	}

	fs.readdirSync(basePath).map((file) => {
		availableFiles.push(file);
	});

	return availableFiles;
};

const convertToFormat = (file: string, basePath: string, format: string) => {
	const fileName = file.split(".")[0];
	const csvFile = `${fileName}.${format}`;
	const workBook = XLSX.readFile(basePath + file);

	if (format === "csv") {
		XLSX.writeFile(workBook, basePath + csvFile, { bookType: "csv" });
	}

	console.log(`converted "${file}" to "${csvFile}"`);
};

export { getFiles, isOfFormat, convertToFormat };
