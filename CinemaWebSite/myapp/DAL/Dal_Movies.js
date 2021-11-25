const axios = require('axios');

exports.getMovies =async function()
{
    let resp = await axios.get("http://localhost:8000/api/Movies")

    return resp
}


exports.deleteMovie = async function(id)
{
    let resp = await axios.delete("http://localhost:8000/api/Movies/"+id)

    return resp.data
}

exports.updateMovie = async (id,obj) =>
{
    let resp = await  axios.put("http://localhost:8000/api/Movies/"+id,obj);
    
    return resp.data
   
}

exports.createMovie = async (obj) =>
{
   let resp = await  axios.post("http://localhost:8000/api/Movies/",obj);

   return resp.data
   
}