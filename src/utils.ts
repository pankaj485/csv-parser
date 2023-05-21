import fs from "fs";
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

export { getFiles, isOfFormat };
