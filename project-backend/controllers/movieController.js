const { listen } = require('express/lib/application');
const {User, Movie, Genre, Streaming, Producer, Actor, Comment, Movie_actor, Movie_genre, Movie_streaming, List} = require('../models')

const getMovieAll = async (req, res, next) => {
    try {
        const movie = await Movie.findAll({
            include:[
                {
                    model: Producer ,
                    attributes: ['producerName']
                },
                {
                    model: Genre ,
                    attributes: ['genreName']
                },
                {
                    model: Streaming ,
                    attributes: ['streamingName','streamingImg']
                },
                {
                    model: Actor ,
                    attributes: ['actorName']
                },
                {
                    model: Comment ,
                    attributes: ['title', "createdAt"]
                },
                {
                    model: List,
                    attributes: ['UserId']
                }
            ]})

        if(!movie){
            return res.status(400).json({message:'no movie'})
        }
        res.status(200).json({movie})

    } catch(err) {
        next(err)
    }
};

const getMovieId = async (req, res, next) => {
    try {
        const movieId = Number(req.params.id);
        const movie = await Movie.findOne({
            
            where:{id:movieId},
            include:[
                Genre,
                Streaming,
                Producer,
                Actor,
                {
                    model: Comment,
                    include: {
                      model: User,
                      attributes: ['name']
                    }
                }
            ]
            
            })
        
        if(!movie){
            return res.status(400).json({message:'no movie'})
        }

        res.status(200).json({movie})
    } catch(err) {
        next(err)
    }
}

const createMovie = async (req, res, next) => {
    try{
        console.log(req.body)
        const { movieName, details, rating, type, season, movieImg, movieImgPoster, actorId, genreId, streamingId } = req.body
        const { producerId } = req.body
        
        const acId = Number(actorId)

        // if (!req.user.type == 'USER' ){
        //     return res.status(404).json({message: 'cannot create movie'})
        // }

        // const movie = await Movie.findOne({where:{ movieName: movieName}})
        // if(movie){
        //     return res.status(404).json({message: 'have movie'})
        // }

        console.log("---------------------------")
        console.log(producerId)
        console.log(Number(producerId))
        console.log("---------------------------")

        const createMovie = await Movie.create({
            movieName: movieName,
            details: details,
            rating: rating,
            type: type,
            movieImg: movieImg,
            movieImgPoster: movieImgPoster,
            season: season,
            producerId: Number(producerId)  // ไม่ขึ้น
        })

        console.log(createMovie)
        console.log('+++++++++++++++++++++++++++++')
        console.log(createMovie.dataValues.id)
        console.log(createMovie.id)
        console.log('+++++++++++++++++++++++++++++')
        console.log(typeof(actorId))


        const idActor = await Movie_actor.create({
            movieId: createMovie.dataValues.id,
            actorId: acId
        }) 

      //  if(actorId){
       //     const IdActor = actorId.split(',')
           // for ( id of IdActor) {
                // const idactor = await Actor.findOne({where:{id: actorId}})
                // console.log("---------------------------")
                // console.log(actorId) //1
                // console.log(createMovie.id) //7++

                // await Movie_actor.create({
                //     actorId: 1,
                //     movieId: createMovie.id
                // })
           // }
       // }

        // for ( id of idGenre){
        //     await Movie_genre.create({
        //         genre_id: parseInt(id),
        //         movie_id: createMovie.id
        //     })
        // }
        // for ( id of idStreaming){
        //     await Movie_streaming.create({
        //         streaming_id: parseInt(id),
        //         movie_id: createMovie.id
        //     })
        // }
 
        res.status(201).json({createMovie})

    } catch(err) {
        next(err)
    }
}

module.exports = {
    getMovieAll,
    getMovieId,
    createMovie,
    
};

