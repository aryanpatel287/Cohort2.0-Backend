const express = require('express')
const app = express()
app.use(express.json())

let notes = [
    {
        "title": "Title 1",
        "description": "hi world"
    },
    {
        "title": "Title 2",
        "description": "hi world"
    },
    {
        "title": "Title 3",
        "description": "hi world"
    },
    {
        "title": "Title 4",
        "description": "hi world"
    }
]

// POST /notes
app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.status(201).json({ message: "Note created successfully" })
})

//GET /notes
app.get('/notes', (req, res) => {
    res.status(200).json({ notes: notes })
})

//GET /notes/:index
app.get('/notes/:index', (req, res) => {
    res.status(200).json({ notes: notes[req.params.index] })
})

//UPDATE /notes/:index
app.patch('/notes/:index', (req, res) => {
    if (isNaN(Number(req.params.index))) return res.status(400).json({ message: "Invalid index" })

    const index = Number(req.params.index)
    if (index < notes.length) {
        notes[index].title = req.body.title || notes[index].title
        notes[index].description = req.body.description || notes[index].description
        res.status(200).json({ message: "Note updated successfully" })
    }
    else {
        res.status(200).json({ message: "Requested index does not exist" })
    }
})

//DELETE /notes/:index
app.delete('/notes/:index', (req, res) => {
    if (isNaN(Number(req.params.index))) return res.status(400).json({ message: "Invalid index" })

    const index = Number(req.params.index)
    if (index < notes.length) {
        delete notes[index]
        res.status(200).json({ message: "Note deleted successfully" })
    } else {
        res.status(404).json({ message: "Requested index does not exist" })
    }
})

module.exports = app