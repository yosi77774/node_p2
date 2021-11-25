var express = require('express');
var router = express.Router();
const userBL = require('../BL/userBL');

/* GET home page. */
router.get('/',async function(req, res, next) {

  let usersdata = await userBL.getUserViews()

  

  res.render('Main',{});
});

module.exports = router;