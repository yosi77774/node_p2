var express = require('express');
var router = express.Router();
const userBL = require('../BL/userBL');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('CreateAccount');
});


router.post('/Crete',async function(req, res) {
    
    const Username = req.body.Username;
    const Password = req.body.Password;
    const obj = {"UserName" : Username, "Password" : Password}
    let data = await userBL.getUser(obj);
    let status = await userBL.updateUserdb(data._id,obj)
  
    console.log("-------------"+status+"---------------");
    
    if (status == 'Updated !') 
    {
  
        req.session.user_status = "registered"
    
        res.render('login',{})
  
    }
    else
    {
        res.send('Registration attempt failed! (You must create a username and get a username from the system administrator).');
    }
  
  });
  

module.exports = router;