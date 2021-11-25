const axios = require('axios');

exports.getSubscriptions =async function()
{
    let resp = await axios.get("http://localhost:8000/api/Subscriptions")

    return resp
}


exports.deleteSubscription = async function(id)
{
    let resp = await axios.delete("http://localhost:8000/api/Subscriptions/"+id)

    return resp.data
}

exports.updateSubscription = async (id,obj) =>
{
    let resp = await  axios.put("http://localhost:8000/api/Subscriptions/"+id,obj);
    
    return resp.data
   
}

exports.createSubscription = async (obj) =>
{
   let resp = await  axios.post("http://localhost:8000/api/Subscriptions/",obj);

   return resp.data
   
}