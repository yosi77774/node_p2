var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


 req.session.Permissions.forEach(element => {
   if(element=="View Movies")
     res.render('Movis', {});
 });
  //res.render('Main', {});
  res.send('You do not have permission to do so');
});

module.exports = router;