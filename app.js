import express from "express"
import mongoose from "mongoose"
import { logger } from './middlewares/logger.js'
import { readableScore } from "./views/helpers/user-views.js"
import "dotenv/config"

const app = express()
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('💽 Database connected'))
    .catch(error => console.error(error))

const userSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true }
})

const User = mongoose.model('User', userSchema)

app.use(logger)
//app.use('/wavetype',express.static('public'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.render('index', {lyrics: '', scroll: 'main-container-1'})
})

app.get('/wavetype', (request, response) => {
    response.redirect('/')
})

app.get('/about', (request, response) => {
    response.render('about', {hClass: "nav-header-1"})
})

app.get('/contact', (request, response) => {
    response.render('contact', {hClass: "nav-header-1"})
})

app.get('/test', (request, response) => {
    response.render('test')
})

app.get('/wavetype/:keyword', (request, response) => {
    const keyword = request.params.keyword

    if(keyword == 'dog'){
        response.render('random-slug', {keyword: `${keyword} 🐶`})
    }else if(keyword == 'cat'){
        response.render('random-slug', {keyword: `${keyword} 🐱`})
    }else{
        response.render('random-slug', {keyword: `${keyword} was not found 🥶`}) 
    }
})

//----------------CRUD OPERATIONS---------------------

//VIEW USERS

app.get('/users/view', async (request, response) => {
    try {
      const users = await User.find({}).exec()
      console.log(users)
  
      response.render('users/index', { 
        users: users,
        readableScore: readableScore,
        hClass: "nav-header-2"
      })
    }catch(error) {
      console.error(error)
      response.render('users/index', { 
        users: [],
        readableScore: readableScore,
        hClass: "nav-header-2"
      })
    }
  })

  app.get('/users/view/:slug', async (request, response) => {
    try {
      const slug = request.params.slug
      const user = await User.findOne({ slug: slug }).exec()
      if(!user) throw new Error('User not found')
  
      response.render('users/show', { 
        user: user,
        readableScore: readableScore,
        hClass: "nav-header-2"
      })
    }catch(error) {
      console.error(error)
      response.status(404).send('Could not find the user you\'re looking for.')
    }
  })

  //UPDATE USERS

  app.get('/users/view/:slug/edit', async (request, response) => {
    try {
      const slug = request.params.slug
      const user = await User.findOne({ slug: slug }).exec()
      if(!user) throw new Error('User not found')
        
      response.render('users/edit', { 
        user: user,
        hClass: "nav-header-2" 
        })
    }catch(error) {
      console.error(error)
      response.status(404).send('Could not find the user you\'re looking for.')
    }
  })

  app.post('/users/:slug', async (request, response) => {
    try {
      const user = await User.findOneAndUpdate(
        { slug: request.params.slug }, 
        request.body,
        { new: true }
      )
      
      response.redirect(`/users/view/${user.slug}`)
    }catch (error) {
      console.error(error)
      response.send('Error: The user could not be created.')
    }
  })

  //DELETE USERS

  app.get('/users/view/:slug/delete', async (request, response) => {
    try {
      await User.findOneAndDelete({ slug: request.params.slug })
      
      response.redirect('/users/view')
    }catch (error) {
      console.error(error)
      response.send('Error: No user was deleted.')
    }
  })

  //CREATE USERS

app.get('/users/new', (request, response) => {
    response.render('users/new', {hClass: "nav-header-2"})
})

app.post('/users', async (request, response) => {
    console.log(request.body.slug)
    try {
        const user = new User({
            slug: request.body.slug,
            name: request.body.name,
            score: request.body.score
          })
          await user.save()

          console.log('User Created')
          response.redirect('/users/view')
    } catch (error) {
        console.error(error)
        response.send('Error: The user could not be created.')
    }
})

//---------------------LYRICS API CALL--------------------------

app.post('/search', function (request, response){
        const token_musix_match = process.env.API_TOKEN
        const api_link_musix_match = 'https://api.musixmatch.com/ws/1.1/'

        const artist_musix_match = request.body.artist
        const track_musix_match = request.body.track

        const query_musix_match = `${api_link_musix_match}track.search?q_artist=${artist_musix_match}&q_track=${track_musix_match}&page_size=1&page=1&s_track_rating=desc&apikey=${token_musix_match}`

        fetch(query_musix_match)
        .then(response_id => response_id.json())
        .then((json_id) => {
            let track_id = ''
            track_id += json_id.message.body.track_list[0].track.track_id
    
            console.log(json_id)
            if(json_id.message.header.status_code == 200){
                const lyrics_musix_match = `${api_link_musix_match}track.lyrics.get?track_id=${track_id}&apikey=${token_musix_match}`
                return fetch (lyrics_musix_match) 
            }else{
                console.log(json_id.message) 
            
                throw ('Error: There is no artist or track in the musixmatch database', `artist: ${artist_musix_match}, song: ${track_musix_match}`)
            }  
        })
        .then(response_lyrics => response_lyrics.json())
        .then((json_lyrics) => {
            if(json_lyrics.message.header.status_code == 200){
                const lyrics = json_lyrics.message.body.lyrics.lyrics_body

                // lyrics = lyrics.split('*******')[0].split('\n')
                response.render('index', {lyrics: lyrics, scroll: '.display-start'})
            }else{
                console.log(json_id.message) 
                throw ('Error: The artist or track does not have lyrics', `artist: ${artist_musix_match}, song: ${track_musix_match}`)
            } 
        })
        .catch((err) => {
            console.log(err)
        })
 
})

// app.get('/error', (request, response) => {
//   response.render('error', {error: err})
//     // response.send(`The artist or track does not have lyrics`)
// })

//-----------------------------------------------


app.listen(process.env.PORT, ()=>{
    console.log(`👋 Started server on port ${process.env.PORT}`)
})
