var express = require('express');
var router = express.Router();
const Members_BL = require('../BL/Members_BL');
const Subscriptions_BL = require('../BL/Subscriptions_BL');
const Movies_BL = require('../BL/Movies_BL');
/* GET home page. */
router.get('/',async function(req, res, next) {

  let Membersdata = await Members_BL.getMembers()
  let Subscriptionsdata = await Subscriptions_BL.getSubscriptions()
  let Moviesdata = await Movies_BL.getMovies()

  let joindata = {"Members" : Membersdata,"Subscriptions" : Subscriptionsdata, "Movies" : Moviesdata}

  console.log(Moviesdata[0].Premiered);

  res.render('AllMovies', {data : joindata});
});

router.post('/Delete',async function(req, res, next) {
  
    let flag =false
    req.session.Permissions.forEach(element => {
        if(element=="Delete Movies")

       flag =true
          
      });
      if(flag){
    console.log("Delete");
    let obj = req.body.Data;
    var Data = JSON.parse(obj);
    console.log(Data.id);
    let status = await Movies_BL.deleteMovie(Data.id)
    console.log(status);
    res.redirect("/AllMovies");
}
else{
    res.send('You do not have permission to do so');
  }
  
  });

  router.post('/Edit', function(req, res, next) {
  
    console.log("------------Edit-------------");
    
    let flag =false
    req.session.Permissions.forEach(element => {
        if(element=="Update Movies")

       flag =true
          
      });
  if(flag){
    let obj1 = req.body.Data;
    var Data = JSON.parse(obj1);
  
    console.log(Data.Premiered);
  
    res.render('EditMovie', {obj : Data});
  }
  else{
    res.send('You do not have permission to do so');
  }
  });

  router.post('/Search', async function(req, res, next) {

    let Moviesdata = await Movies_BL.Search(req.body);
    let Membersdata = await Members_BL.getMembers()
    let Subscriptionsdata = await Subscriptions_BL.getSubscriptions()
  
    let joindata = {"Members" : Membersdata,"Subscriptions" : Subscriptionsdata, "Movies" : Moviesdata.Movies}

    res.render('AllMovies' , {data : joindata});
    
  });
  

module.exports = router;
