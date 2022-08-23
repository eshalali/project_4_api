const mongoose = require('mongoose')
const { Schema, model } = mongoose

const calendarSchema = new Schema(
	{
		item: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
        },
        description: {
            type: String
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

module.exports = model('Calendar', calendarSchema)