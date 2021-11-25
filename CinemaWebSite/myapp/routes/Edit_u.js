var express = require('express');
var router = express.Router();
const userBL = require('../BL/userBL');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Edit_u', { });
});


router.post('/Update',async function(req, res, next) {
  
  const obj = req.body
 let status =await userBL.updateUser(obj);
 
console.log(status);

 // res.render("Users", {});
 res.redirect('/Users');
      
});

module.exports = router;