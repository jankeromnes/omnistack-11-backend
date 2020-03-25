const router = require('express').Router({caseSensitive: true});

const {
    OngsController,
    IncidentsController,
    SessionsController,
} = require('../controllers');

router.post('/sessions', SessionsController.login);

router.post('/ongs', OngsController.create);
router.get('/ongs', OngsController.listAll);
router.get('/incidents', IncidentsController.listAll);

module.exports = router;