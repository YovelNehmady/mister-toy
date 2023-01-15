const express = require('express')
const toyService = require('./api/toy/toy.service.js')
const cors = require('cors')

const app = express()

// app.use(express.static('public'))
app.use(express.json())

const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))

//TOY API
//List
app.get('/api/toy/', (req, res) => {
    toyService.query()
        .then(toys => res.send(toys))
})

//Read
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => {
            res.send(toy)
        })
})

//Update - put
app.put('/api/toy/', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
})

//Create - post
app.post('/api/toy/', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
})

//Remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(toys => res.send(toys))
        .catch(err => {
            console.log('Error:', err)
            res.status(401).send('Unauthorized')
        })
})

app.listen(3030, () => console.log('Server ready at port 3030! http://localhost:3030/'))