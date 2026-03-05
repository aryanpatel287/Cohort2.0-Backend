const express = require('express')
const app = express()
app.use(express.json())

let notes = [
    { title: 'Title 1', description: 'hi world' },
    { title: 'Title 2', description: 'hi world' },
    { title: 'Title 3', description: 'hi world' }
]

app.post('/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.send("Note created")
})

app.get('/notes', (req, res) => {
    res.send(notes)
})

app.delete('/notes/:index', (req, res) => {
    if (isNaN(Number(req.params.index))) return res.send("Invalid URL")

    const index = req.params.index
    if (index < notes.length) {
        if (notes[index] == null) res.send(`Notes with index ${index} is already deleted`)
        res.send(`${notes[index].title} deleted successfully`)
        delete notes[index]
    }
    else {
        res.send(`Notes with index ${index} does not exist`)
    }
})

app.patch('/notes/:index', (req, res) => {
    if (isNaN(Number(req.params.index))) return res.send("Invalid URL")

    const index = req.params.index
    if (index < notes.length) {
        notes[index].description = req.body.description
        res.send(notes)
    }
    else {
        res.send(`Note with ${index} does not exist`)
    }
})

module.exports = app