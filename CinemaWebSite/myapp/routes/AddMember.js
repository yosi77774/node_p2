var express = require('express');
var router = express.Router();
const Members_BL = require('../BL/Members_BL');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    let flag =false
      req.session.Permissions.forEach(element => {
          if(element=="Create Subscriptions")
  
         flag =true
            
        });
    if(flag){
        res.render('AddMember', { });
    }
    else{
        res.send('You do not have permission to do so');
      }
 
});

router.post('/add', async function(req, res) {
    
    const obj = req.body
    let status = await Members_BL.AddMember(obj);
    console.log(status);
    res.redirect('/AllMembers');

  });


module.exports = router;
