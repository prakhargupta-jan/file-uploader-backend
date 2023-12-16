const { Schema, model } = require('mongoose')

const FileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true
    },
    sheets: [{
        type: Schema.Types.ObjectId,
        ref: 'FileData'
    }]
})


const File = model('File', FileSchema);

module.exports = File;