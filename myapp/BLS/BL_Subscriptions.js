
const subscriptionsModel = require('../models/subscriptionsModel');
const Members_Dal = require('../DALS/Members_Dal');
const BL_Members = require('../BLS/BL_Members');

const deleteSubscriptionsdb = function(id)
{
    return new Promise((resolve, reject) =>
    {
        subscriptionsModel.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Deleted !')
                }
            })

    })
}


const getSubscriptiondb = function()
{
    return new Promise((resolve, reject) =>
    {
        subscriptionsModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}


const updateSubscriptiondb = function(id,obj)
{
    return new Promise((resolve, reject) =>
    {

        subscriptionsModel.findOneAndUpdate(
            {
                MemberId : obj.MemberId,

            },
            {
                $push:{
                Movies : obj.Movies
            }},function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Updated !')
                }
            })

    })
}


const createSubscriptiondb = function(obj)
{
    return new Promise((resolve, reject) =>
    {
        let Subscription = new subscriptionsModel({
            MemberId : obj.MemberId,
            Movies : [{
                movieId : obj.movieId,
                date : obj.date
            }]
        });

        Subscription.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Created !')
            }
        })
    })
}

const InsertSubscriptionData = async function()
{


    
        let resp2 = await BL_Members.getMembersdb();
        let MembersFromWs = resp2;

        if(resp2.length == 0){

            let status = await BL_Members.InsertMembersData();
            console.log("status InsertMembersData: "+status);
            MembersFromWs = await BL_Members.getMembersdb();
            console.log("length2 "+MembersFromWs.length);
    
        }

       
    return new Promise((resolve, reject) =>
    {
       
        let Members = []
       
        MembersFromWs.forEach(x => {
           console.log(x._id);
            Members[Members.length] = new subscriptionsModel({
                MemberId : x._id,
                Movies : []
        });

        console.log("Members---------"+Members[Members.length-1].MemberId);
        Members[Members.length-1].save(function(err)
        {
            if(err)
            {
                reject(err)
            }

        })
       
        });
        
        resolve('Created !')

    })



}




module.exports = {createSubscriptiondb,updateSubscriptiondb,getSubscriptiondb,deleteSubscriptionsdb,InsertSubscriptionData}