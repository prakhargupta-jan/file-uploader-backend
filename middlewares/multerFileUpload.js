const multer = require("multer");
const AppError = require("../utils/AppError");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploadedFiles");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + ' ' + file.originalname);
	},
});
const filter = (req, file, cb) => {
	if (
		file.mimetype === "application/xlsx" ||
		file.mimetype === "application/vnd.ms-excel" ||
		file.mimetype ===
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	) {
		cb(null, true);
	} else {
		cb(new AppError("Only xlsx files are allowed", 400));
	}
};
const upload = multer({
	fileFilter: filter,
	storage: storage,
	limits: {
		fileSize: 1024 * 1024,
	},
});

module.exports = upload;
