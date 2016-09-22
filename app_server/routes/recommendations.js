var express = require('express');
var router = express.Router();

var ctrlRecom = require('../controllers/ctrlRecom');

/* GET recommendations. */
router.get('/', ctrlRecom.recom);

module.exports = router;
