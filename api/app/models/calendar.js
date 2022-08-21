const mongoose = require('mongoose')
const { Schema, model } = mongoose

const todoSchema = new Schema(
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
        }
	},
        {
		timestamps: true,
	},
)

module.exports = model('Calendar', calendarSchema)