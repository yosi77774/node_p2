const express = require('express');
const BL_Movies = require('../BLS/BL_Movies');

const router = express.Router();

router.route('/')
    .get(async function(req,resp)
    {   
         console.log("start main");

        let movies
        movies = await BL_Movies.getmovisdb();

        console.log("length1 "+movies.length);
        if(movies.length == 0){

        let status = await BL_Movies.InsertMoviesData();
        console.log("status InsertMoviesData: "+status);
        movies = await BL_Movies.getmovisdb();
        console.log("length2 "+movies.length);

    }
    
    console.log("length3 "+movies.length);
    
        return resp.json(movies)

    })

    router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let status = await BL_Movies.deleteMoviedb(id);
        console.log(status);
        return resp.json(status)
    })

    router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let status = await BL_Movies.updateMoviedb(id,obj);
        return resp.json(status)
    })

    router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let status = await BL_Movies.createMoviedb(obj);
        return resp.json(status)
    })


module.exports = router;