const express = require('express')
const cors = require('cors')
const app = express()
const noteModel = require('../models/note.module')
const path =  require('path')

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

// POST /notes
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Notes created successfully",
        note
    })
})

// GET /notes
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

// GET /notes/:id
app.get("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const notes = await noteModel.findById(id)

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

//DELETE /notes/:id
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Note deleted successfully" })
})

//PATCH /notes/:id
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const note = await noteModel.findById(id)
    const title = req.body.title || note.title
    const description = req.body.description || note.description

    const updatedNote = await noteModel.findByIdAndUpdate(id, { title, description }, { new: true })
    res.status(200).json({
        message: "Note updated successfully",
        updatedNote
    })
})

//Wild card
app.get("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app