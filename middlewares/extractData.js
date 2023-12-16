const xlsx = require("xlsx");
const catchAsync = require("../utils/catchAsync");

const extractData = catchAsync(async (req, res, next) => {
	const { path } = req.file;
	const fileData = xlsx.readFile(path);
	const sheetNames = fileData.SheetNames;
	const data = sheetNames.map((sheetName) => {
		const sheet = fileData.Sheets[sheetName];
		return xlsx.utils.sheet_to_json(sheet);
	});
	const updatedData = data.map((sheet) => {
		const updatedSheet = sheet.map((row) => {
			console.log(row);
			return {
				date: ExcelDateToJSDate(row["Date*"]),
				invoiceNumber: row["Invoice Number*"],
				gstin: row["GSTIN"],
				partyName: row["Party Name*"],
				placeOfSupply: row["Place of Supply"],
				taxableAmount: row["Taxable Amount*"],
				gstRate: row["GST Rate*"],
				igst: row["IGST"],
				cgst: row["CGST"],
				sgst: row["SGST/UTGST"],
				invoiceAmount: row["Invoice Amount*"],
				remarks: row["Remarks"],
				hsn: row["HSN/SAC"],
			}
		})
		return updatedSheet;
	});
    req.fileData = updatedData;
	next();
});

function ExcelDateToJSDate(date) {
	return new Date(Math.round((date - 25569) * 86400 * 1000));
}

module.exports = extractData;