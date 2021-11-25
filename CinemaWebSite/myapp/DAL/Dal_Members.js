const axios = require('axios');

exports.getMembers =async function()
{
    let resp = await axios.get("http://localhost:8000/api/Members")

    return resp
}


exports.deleteMember = async function(id)
{
    let resp = await axios.delete("http://localhost:8000/api/Members/"+id)

    return resp.data
}

exports.updateMember = async (id,obj) =>
{
    let resp = await  axios.put("http://localhost:8000/api/Members/"+id,obj);
    
    return resp.data
   
}

exports.createMember = async (obj) =>
{
   let resp = await  axios.post("http://localhost:8000/api/Members/",obj);

   return resp.data
   
}