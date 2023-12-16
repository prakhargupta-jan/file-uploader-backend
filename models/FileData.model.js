const { Schema, model } = require("mongoose");

const fileDataSchema = new Schema({
	file: {
		type: Schema.Types.ObjectId,
	},
	sheet: {
		type: Number,
		default: 0,
	},
	data: [
		{
			date: {
				type: Date,
				required: [true, "Date is required"],
			},
			invoiceNumber: {
				type: String,
				max: [16, "Invoice Number should be less than 16 characters"],
				required: [true, "Invoice Number is required"],
			},
			gstin: {
				type: String,
			},
			partyName: {
				type: String,
				required: [true, "Party Name is required"],
			},
			placeOfSupply: {
				type: String,
				required: function () {
					return this.gstsin ? true : false;
				}
			},
			taxableAmount: {
				type: Number,
				required: [true, "Taxable Amount is required"],
			},
			gstRate: {
				type: Number,
				min: [0, "GST Rate should be greater than 0"],
				max: [100, "GST Rate should be less than 100"],
				required: [true, "GST Rate is required"],
			},
			igst: {
				type: Number,
			},
			cgst: {
				type: Number,
			},
			sgst: {
				type: Number,
			},
			invoiceAmount: {
				type: Number,
			},
			remarks: {
				type: String,
			},
			hsn: {
				type: String,
				validate: {
					validator: function () {
						return this.invoiceAmount >= 20000000 ? false : true;
					},
					message: "HSN/SAC is required for invoice amount greater than 20,00,000",
				},
			},
		},
	],
});


const FileData = model("FileData", fileDataSchema);

module.exports = FileData;