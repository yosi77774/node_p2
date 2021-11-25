var express = require('express');
var router = express.Router();
const userBL = require('../BL/userBL');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('login',{})
});


router.post('/login', async function(req, res) {
    
  const Username = req.body.Username;
  const Password = req.body.Password;
  const obj = {"Username" : Username, "Password" : Password}

  let data = await userBL.checkUser(obj);

  if (data!=false) 
  {


      req.session.Permissions = data;
      req.session.user_status = "registered"
      if(Username=="admin"){
        req.session.user_status="admin"
      }

      console.log("login p"+req.session.Permissions);
      res.redirect('/Main');
      

  }
  else
  {
    //res.render('login' , {msg : "This user does not exist in the system"});
    res.send('This user does not exist in the system');
    //res.render('login',{})
  }

});


module.exports = router;
