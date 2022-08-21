const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const calendar = require('../models/calendar')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// pull in Mongoose model for calendar
const Calendar = require ('../models/calendar')

// GET
// Index
router.get('/calendar', (req, res, next) => {
    console.log('route is hit')
        Calendar.find()
            .populate('owner')
            .then(calendar => {
                return calendar.map(calendaritem => calendaritem.toObject())
            })
            .then(calendar => {
                res.status(200).json({ calendar: calendar })
            })
            .catch(next)
})

// POST
// Create a calendar item
router.post('/calendar', requireToken, (req, res, next) => {
	req.body.calendar.owner = req.user.id

	Calendar.create(req.body.calendar)
		.then((calendaritem) => {
			res.status(201).json({ calendaritem: calendaritem.toObject() })
		})
		.catch(next)
})

// PATCH
// Update an item after edit
router.patch('/calendar/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.calendar.owner
    id = req.params.id

	Calendar.findById(id)
		.then(handle404)
		.then((calendaritem) => {
			requireOwnership(req, calendaritem)
			return calendaritem.updateOne(req.body.calendar)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// Delete a calendar item
router.delete('/calendar/:id', requireToken, (req, res, next) => {
    const id = req.params.id
	calendar.findById(id)
		.then(handle404)
		.then((calendaritem) => {
			requireOwnership(req, calendaritem)
			calendaritem.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


module.exports = router