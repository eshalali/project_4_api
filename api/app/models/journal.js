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
        },
		owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
	},
)

module.exports = model('Journal', journalSchema)