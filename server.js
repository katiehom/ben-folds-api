const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient  
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'ben-folds-api'

app.use(cors())


MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        const songCollection = db.collection('song-titles')

    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/index.html')
    })

    app.get('/api/:songTitle', (request, response) => {
        const songTitles = request.params.songTitle.toLowerCase()
            songCollection.find({name: songTitles}).toArray()
            .then(results => {
                console.log(results)
                response.json(results[0])
            })
            .catch(error => console.error(error))
    })
})
.catch(error => console.error(error))
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})





        // if(songs[songTitles]){
        //     response.json(songs[songTitles])
        // } else {
        //     response.json(songs['unlisted']) // Not sure what to have here
        // }


        // const cursor = db.collection('song-titles').find().toArray()
        // .then(results => {
        //     console.log(results)
        // })