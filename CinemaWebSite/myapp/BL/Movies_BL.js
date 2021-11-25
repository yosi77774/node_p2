const Dal_Movies = require('../DAL/Dal_Movies');


const getMovies = async function () {
    
    let resp = await Dal_Movies.getMovies();
    let Movies = resp.data;

    return Movies
}

const deleteMovie = async function (id) {
    
    let resp = await Dal_Movies.deleteMovie(id);
    

    return resp
}


const updateMovie = async function (id,obj){
    
    let resp = await Dal_Movies.updateMovie(id,obj);

    
    return resp
}

const AddMovie = async function (obj){
    
    let resp = await Dal_Movies.createMovie(obj);

    
    return resp
}

const Search = async function(obj)
{
    let resp = await Dal_Movies.getMovies();
    //let Movies2 = resp2.data;
    let Movies = resp.data;
    let str = obj.Name.toString();
    let MoviesArr = {"Movies":[]}

   // Movies[Movies.length] = Movies2.Movies.map(x => x.Name,x.Language,x.genres)

 
   console.log(Movies.length+"-------------------");




     MoviesArr.Movies =  Movies.filter(x =>(x.name.indexOf(str)+1)==1);
     console.log(MoviesArr.Movies.length+"-------------------");

     
    return MoviesArr;

}

module.exports = {getMovies,deleteMovie,updateMovie,AddMovie,Search}