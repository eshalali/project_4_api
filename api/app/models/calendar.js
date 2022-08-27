const mongoose = require('mongoose')
const { Schema, model } = mongoose

const calendarSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		startDate: {
			type: String,
			required: true,
        },
        endDate: {
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