const express = require('express');
const BL_Subscriptions = require('../BLS/BL_Subscriptions');

const router = express.Router();


router.route('/')
    .get(async function(req,resp)
    {   
         console.log("start main");

        let Subscriptions
        Subscriptions = await BL_Subscriptions.getSubscriptiondb();

        console.log("length1 "+Subscriptions.length);

        if(Subscriptions.length == 0){

        let status = await BL_Subscriptions.InsertSubscriptionData();
        console.log("status InsertSubscriptionData: "+status);
        Subscriptions = await BL_Subscriptions.getSubscriptiondb();
        console.log("length2 "+Subscriptions.length);

    }
    
    console.log("length3 "+Subscriptions.length);
    
    
        return resp.json(Subscriptions)

    })

/*router.route('/')
    .get(async function(req,resp)
    {   
         console.log("start main");

        let Subscriptions
        Subscriptions = await BL_Subscriptions.getSubscriptiondb();

        console.log("length1 "+Subscriptions.length);
       
    
    console.log("length3 "+Subscriptions.length);
    
        return resp.json(Subscriptions)

    })*/

    router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let status = await BL_Subscriptions.deleteSubscriptionsdb(id);
        console.log(status);
        return resp.json(status)
    })

    router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let status = await BL_Subscriptions.updateSubscriptiondb(id,obj);
        return resp.json(status)
    })

    router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let status = await BL_Subscriptions.createSubscriptiondb(obj);
        return resp.json(status)
    })


module.exports = router;