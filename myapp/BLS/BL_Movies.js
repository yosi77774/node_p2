const moviesModel = require('../models/moviesModel');
const Movies_Dal = require('../DALS/Movies_Dal');



const deleteMoviedb = function(id)
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.findByIdAndDelete(id,function(err)
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


const getmovisdb = function()
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.find({}, function(err, data)
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


const updateMoviedb = function(id,obj)
{
    return new Promise((resolve, reject) =>
    {

        moviesModel.findByIdAndUpdate(id,
            {
                name : obj.name,
                Genres :obj.Genres,
                Image : obj.Image,
                Premiered : obj.Premiered

            },function(err)
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


const createMoviedb = function(obj)
{
    return new Promise((resolve, reject) =>
    {
        let movie = new moviesModel({
            name : obj.name,
            Genres :obj.Genres,
            Image : obj.Image,
            Premiered : obj.Premiered
        });

        movie.save(function(err)
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


const InsertMoviesData = async function()
{


    console.log("------start BL-------");
    
        let resp2 = await Movies_Dal.getMovies();
        let MoviesFromWs = resp2.data;

    return new Promise((resolve, reject) =>
    {
       
        let movies = []
       
        MoviesFromWs.forEach(x => {
           
            movies[movies.length] = new moviesModel({
            name : x.name,
            Genres : x.genres,
            Image : x.image.medium,
            Premiered : x.premiered
        });

        console.log("Movies---------"+movies[movies.length-1].name);
        movies[movies.length-1].save(function(err)
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



module.exports = {getmovisdb,deleteMoviedb,updateMoviedb,createMoviedb,InsertMoviesData}