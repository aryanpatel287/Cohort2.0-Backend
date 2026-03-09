const express = require('express')
const app = express()
const noteModel = require('../models/note.module')

app.use(express.json())

// POST /notes
app.post("/notes", async (req, res) => {
    const { title, description } = req.body
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Notes created successfully",
        note
    })
})

// GET /notes/
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

module.exports = app