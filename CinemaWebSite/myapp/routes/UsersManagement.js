var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user_status=="admin"){
  res.render('UsersManagement', {});
}else{
  res.send('You do not have permission to do so');
}
});

module.exports = router;