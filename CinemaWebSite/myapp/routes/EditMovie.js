var express = require('express');
var router = express.Router();
const Movies_BL = require('../BL/Movies_BL');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('EditMovie', { });
});


router.post('/Update',async function(req, res, next) {
  

     const obj = req.body

        console.log("Update----------------");
      
       let status =await Movies_BL.updateMovie(obj.id,obj);
       
      console.log(status);
      
      //res.render('AllMovies', { });
       res.redirect('/AllMovies');

});



module.exports = router;