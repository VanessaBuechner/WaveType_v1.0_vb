import express from "express"
import mongoose from "mongoose"
import { logger } from './middlewares/logger.js'
import { readableScore } from "./views/helpers/user-views.js"

const app = express()
app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/wavetype')
    .then(() => console.log('💽 Database connected'))
    .catch(error => console.error(error))

const userSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true }
})

const User = mongoose.model('User', userSchema)

const PORT = 3001

app.use(logger)
app.use('/wavetype',express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



const insertReqToHTML = (resp) =>{
    let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Not found</title>

            <style>
                html, body{
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 2vw;
                }
                .container{
                    height: 100%;
                    display: grid;
                    align-items: center;
                    justify-items: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                ${resp}
            </div>
        </body>
        </html>`
return html
}

app.get('/', (request, response) => {
    response.render('index')
})

app.get('/wavetype/:keyword', (request, response) => {
    const req = request.params.keyword

    if(req == 'dog'){
        response.send(insertReqToHTML(`<h2>${req} 🐶</h2>`))
    }else if(req == 'cat'){
        response.send(insertReqToHTML(`<h2>${req} 🐱</h2>`))
    }else{
        response.send(insertReqToHTML(`<h2>${req} was not found 🥶</h2>`))   
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
        readableScore: readableScore
      })
    }catch(error) {
      console.error(error)
      response.render('users/index', { 
        users: [],
        readableScore: readableScore
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
        readableScore: readableScore
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
        
      response.render('users/edit', { user: user })
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
      response.send('Error: No cookie was deleted.')
    }
  })

  //CREATE USERS

app.get('/users/new', (request, response) => {
    response.render('users/new')
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

//-----------------------------------------------

app.listen(PORT, ()=>{
    console.log(`👋 Started server on port ${PORT}`)
})
