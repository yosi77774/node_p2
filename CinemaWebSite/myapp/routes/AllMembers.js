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

  console.log("Membersdata");

  res.render('AllMembers', {data : joindata});

});

router.post('/Delete',async function(req, res, next) {
  
      let flag =false
      req.session.Permissions.forEach(element => {
          if(element=="Delete Subscriptions")
  
         flag =true
            
        });
    if(flag){
      console.log("Delete");
      let obj = req.body.Data;
      var Data = JSON.parse(obj);
      console.log(Data.id);
      let status = await Members_BL.deleteMember(Data.id)
      console.log(status);
      res.redirect("/AllMembers");
    }
    else{
      res.send('You do not have permission to do so');
    }
});

router.post('/Edit', function(req, res, next) {

  console.log("------------Edit-------------");
  
  let flag =false
  req.session.Permissions.forEach(element => {
      if(element=="Update Subscriptions")

     flag =true
        
    });
if(flag){
  let obj1 = req.body.Data;
  var Data = JSON.parse(obj1);

  console.log(Data.id);

  res.render('EditMember', {obj : Data});
}
else{
  res.send('You do not have permission to do so');
}


});


router.post('/add', async function(req, res) {
    
  const obj = req.body
  const obj2 = req.body.Data
  var Data = JSON.parse(obj2);
  console.log("*************////////////****");
  const obj3 = {MemberId : Data.id, Movies : [{movieId : obj.movie ,date: obj.date}]}
  console.log(obj3);
  let status = await Subscriptions_BL.updateSubscription("619cfc302ce3ba22ae62eb65", obj3);
  console.log(status);
  res.redirect('/AllMembers');

});

router.get('/:data', async function(req, res, next) {

  let Data ={Name : req.params.data}
  console.log(Data);
  let Moviesdata = await Movies_BL.Search(Data);
  let Membersdata = await Members_BL.getMembers()
  let Subscriptionsdata = await Subscriptions_BL.getSubscriptions()

  let joindata = {"Members" : Membersdata,"Subscriptions" : Subscriptionsdata, "Movies" : Moviesdata.Movies}

  res.render('AllMovies' , {data : joindata});
  
});


module.exports = router;
