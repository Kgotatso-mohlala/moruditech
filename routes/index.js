const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index'); 
});

router.get('/privacy', (req, res) => {
    res.render('pages/privacy'); 
});


router.get('/terms', (req, res) => {
    res.render('pages/terms'); 
});

module.exports = router;