var express = require('express');
var router = express.Router();
var mongoservice = require('../mongoservice')

/* GET home page. */
router.get('/', mongoservice.addListToRequest, (req,res) => {
  res.render('index', {
    title: 'My awesome server!',
    list: req.list
  });
});

module.exports = router;
