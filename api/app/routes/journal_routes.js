const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// pull in Mongoose model for journal
const Journal = require ('../models/journal')

// GET
// Index
router.get('/journal', (req, res, next) => {
    console.log('route is hit')
        Journal.find()
            .populate('owner')
            .then(journal => {
                return journal.map(journalentry => journalentry.toObject())
            })
            .then(journal => {
                res.status(200).json({ journal: journal })
            })
            .catch(next)
})

// GET
// Show for specific local database journal entry
router.get('/journal/:id', (req, res, next) => {
    const id = req.params.id

    Journal.findById(id)
        .populate('owner')
        .then(handle404)
        .then((journalentry) => res.status(200).json({ journalentry: journalentry.toObject() }))
        .catch(next)
})

// POST
// Create a journal entry
router.post('/journal', requireToken, (req, res, next) => {
	req.body.journal.owner = req.user.id

	Journal.create(req.body.journal)
		.then((journalentry) => {
			res.status(201).json({ journalentry: journalentry.toObject() })
		})
		.catch(next)
})

// PATCH
// Update a journal entry after edit
router.patch('/journal/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.journal.owner
    id = req.params.id

	Journal.findById(id)
		.then(handle404)
		.then((journalentry) => {
			requireOwnership(req, journalentry)
			return journalentry.updateOne(req.body.journal)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// Delete a journal entry
router.delete('/journal/:id', requireToken, (req, res, next) => {
    const id = req.params.id
	Journal.findById(id)
		.then(handle404)
		.then((journalentry) => {
			requireOwnership(req, journalentry)
			journalentry.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


module.exports = router