const express = require('express')
const toyService = require('./services/toy.service.js')

const app = express()

// app.use(express.static('public'))
app.use(express.json())

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
app.put('/api/toy/:toyId', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
        .catch(err => {
            console.log('Error:', err)
            res.status(401).send('Unauthorized')
        })
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