const router = require('express').Router({caseSensitive: true});

router.get('/', (req, res)=>res.json({firstRoute: true}));

module.exports = router;