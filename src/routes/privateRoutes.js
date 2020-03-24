const router = require('express').Router({caseSensitive: true});

const {
    NOT_IMPLEMENTED
} = require('http-status-codes');

const {
    IncidentsController
} = require('../controllers');

// TODO: authentication
router.post('/incidents', IncidentsController.create);
router.delete('/incidents/id', IncidentsController.delete);

module.exports = router;