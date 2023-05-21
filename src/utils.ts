import fs from "fs";

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

export { getFiles };
