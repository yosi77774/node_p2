var express = require('express');
var router = express.Router();
const userBL = require('../BL/userBL');


router.get('/',async function(req, res, next) {
  
  let usersdata = await userBL.getUserViews()

  res.render("Users", { users: usersdata});

});

router.post('/Edit', function(req, res, next) {
  
  console.log("------------Edit-------------");
  

  let obj1 = req.body.Data;
  var Data = JSON.parse(obj1);

  console.log(Data);

  res.render("Edit_u", {obj : Data});

});

router.post('/Delete', function(req, res, next) {
  
  console.log("Delete");
  let obj = req.body.Data;
  var Data = JSON.parse(obj);
   userBL.deleteUser(Data.id)
  
   res.redirect('/Users');
  

});

module.exports = router;