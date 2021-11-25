

const Dal_Subscriptions = require('../DAL/Dal_Subscriptions');




const getSubscriptions = async function () {
    
    let resp = await Dal_Subscriptions.getSubscriptions();
    let Subscriptions = resp.data;

    console.log(Subscriptions[1].MemberId+"----------------");
    return Subscriptions
}

const deleteSubscription = async function (id) {
    
    let resp = await Dal_Subscriptions.deleteSubscription(id);
    

    return resp
}


const updateSubscription = async function (id,obj){
    
    let resp = await Dal_Subscriptions.updateSubscription(id,obj);

    
    return resp
}

const AddSubscription = async function (obj){
    
    let resp = await Dal_Subscriptions.createSubscription(obj);

    
    return resp
}

module.exports = {AddSubscription,updateSubscription,deleteSubscription,getSubscriptions}