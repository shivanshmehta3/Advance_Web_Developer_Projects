const express = require('express');
const TodoDB = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
	TodoDB.find({})
		.then(searchResult => {
			res.send(searchResult);
		})
		.catch(err => {next(err)});
});

router.post('/', (req, res, next) => {
	TodoDB.create(req.body)
		.then(result => {
			res.status(201).send(result);
		})
		.catch(err => {next(err)});
});

router.delete('/:id', (req, res, next) => {
	TodoDB.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(201).send(result);
		})
		.catch(err => {next(err)});
});

module.exports = router;