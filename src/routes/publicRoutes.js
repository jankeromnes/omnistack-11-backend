const router = require('express').Router({caseSensitive: true});

const {OngsController} = require('../controllers');

router.post('/ongs', OngsController.create);
router.get('/ongs', OngsController.listAll);

module.exports = router;