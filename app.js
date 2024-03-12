import express from "express"
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 3000

app.use(logger)
app.use('/wavetype',express.static('public'))



let insertReqToHTML = (resp) =>{
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

app.listen(PORT, ()=>{
    console.log(`👋 Started server on port ${PORT}`)
})
