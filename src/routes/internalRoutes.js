const router = require('express').Router({caseSensitive: true});

const {
    NOT_IMPLEMENTED
} = require('http-status-codes');


router.post('/', (req, res)=>{
    res.status(NOT_IMPLEMENTED).json({error:"Not Implemented yet"});
});

module.exports = router;