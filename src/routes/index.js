const router = require('express').Router({caseSensitive: true});

router.use(require('./publicRoutes'));
router.use(require('./privateRoutes'));
router.use('/administration', require('./internalRoutes'));

module.exports = router;