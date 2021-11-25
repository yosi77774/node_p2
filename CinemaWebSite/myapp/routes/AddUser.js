var express = require('express');
const userBL = require('../BL/userBL');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('AddUser', {});
});


router.post('/add', async function(req, res) {
    
    const obj = req.body
    console.log(obj.SessionTimeOut);
    let data = await userBL.Add_User(obj);
    console.log(data);
    //res.render('AddUser', {});
    res.redirect('/AddUser');

  });


module.exports = router;