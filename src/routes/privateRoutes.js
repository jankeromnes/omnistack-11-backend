const jwt = require('jsonwebtoken');
const authentication = require('../middlewares/authentication');
const {
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED
} = require('http-status-codes');

const router = require('express').Router({caseSensitive: true});

const {
    IncidentsController
} = require('../controllers');

router.post('/incidents', authentication, IncidentsController.create);
router.delete('/incidents/id', authentication, IncidentsController.delete);

module.exports = router;