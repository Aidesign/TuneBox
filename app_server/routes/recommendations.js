var express = require('express');
var router = express.Router();

var ctrlRecom = require('../controllers/recom.controller');

/* GET recommendations. */
router.get('/', ctrlRecom.recom);

module.exports = router;
