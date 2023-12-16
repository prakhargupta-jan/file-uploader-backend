const morgan = require("morgan");
const express = require("express");
const upload = require("./middlewares/multerFileUpload.js");
const extractData = require("./middlewares/extractData.js");
const File = require("./models/File.model.js");
const cors = require("cors");
const catchAsync = require("./utils/catchAsync.js");
const FileData = require("./models/FileData.model.js");
const globabErrorHandler = require("./utils/globalErrorHandler.js");
const app = express();

app.use(cors({ origin: process.env.CORS_PATH || "*" }));
app.use(morgan("dev"));

app.post(
	"/api/file-upload",
	upload.single("file"),
	extractData,
	catchAsync(async (req, res) => {
		const sheetIds = [];
		for (let i = 0; i < req.fileData.length; i++) {
			const data = req.fileData[i];
			const sheet = await FileData.create({ data: data, sheet: i + 1 });
			const sheetId = sheet._id;
			sheetIds.push(sheetId);
		}
		const name = req.file.originalname;
		const date = req.file.filename.split(" ")[0];
		const path = req.file.path;
		const file = await File.create({
			name: name,
			path: path,
			dateUploaded: date,
			sheets: sheetIds,
		});
		for (let i = 0; i < sheetIds.length; i++) {
			const sheetId = sheetIds[i];
			const sheet = await FileData.findById(sheetId);
			sheet.file = file._id;
			await sheet.save();
		}
		res.status(200).json({
			status: "success",
			msg: "File uploaded successfully",
		});
	})
);

app.get(
	"/api/get-files",
	catchAsync(async (req, res) => {
		const files = (await File.find()).map((file) => ({
			name: file.name,
			id: file._id,
			dateUploaded: file.dateUploaded,
		}));
		res.status(200).json({
			status: "success",
			files,
		});
	})
);

app.get("/api/get-files/:id", catchAsync(async (req, res) => {
	const file = await File.findById(req.params.id);
	if (!file)
		return nex(new AppError("No file found with the given id, Please provide a valid id.", 404));
	const filepath = file.path;
	res.status(200).download(filepath, file.name);
}));

app.use(globabErrorHandler);

app.all("*", (req, res, next) => {
	return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;