var express = require('express');
var router = express.Router();
const Members_BL = require('../BL/Members_BL');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('EditMember', { });
});


router.post('/Update',async function(req, res, next) {
  
  const obj = req.body

  console.log("Update----------------");
  console.log(obj.id);

 let status =await Members_BL.updateMember(obj.id,obj);
 
console.log(status);

//res.render('AllMovies', { });
 res.redirect('/AllMembers');
      
});



module.exports = router;