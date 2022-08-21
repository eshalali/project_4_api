const mongoose = require('mongoose')
const { Schema, model } = mongoose

const journalSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
        entry: {
            type: String,
            required: true,
        }
	},
	{
		timestamps: true,
	},
)

module.exports = model('Journal', journalSchema)