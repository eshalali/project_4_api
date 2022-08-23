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
		owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
	},
        {
		timestamps: true,
	},
)

module.exports = model('ToDo', todoSchema)