var express = require('express');
const Movies_BL = require('../BL/Movies_BL');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    let flag =false
    req.session.Permissions.forEach(element => {
        if(element=="Create Movies")

       flag =true
          
      });
      if(flag){
  res.render('AddMovie', {});
  }
  else{
       
        res.send('You do not have permission to do so');
  }
});


router.post('/add', async function(req, res) {
    
    const obj = req.body
    let status = await Movies_BL.AddMovie(obj);
    console.log(status);
    res.redirect('/AllMovies');

  });


module.exports = router;