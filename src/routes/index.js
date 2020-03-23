const router = require('express').Router({caseSensitive: true});

router.use(require('./annonymousRoutes'));
router.use(require('./authenticatedRoutes'));

module.exports = router;