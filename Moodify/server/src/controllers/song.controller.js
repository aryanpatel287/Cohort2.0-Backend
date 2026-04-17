const id3 = require('node-id3')
const storageService = require('../services/storage.service')
const songModel = require('../models/song.model')


async function uploadSongController(req, res) {

    const songBuffer = req.file.buffer
    const { mood } = req.body

    console.log("req body : ", req.body)

    const tags = id3.read(songBuffer)

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    console.log("songfile: ", songFile)
    console.log("poster file: ", posterFile)

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(200).json({
        message: "song uploaded successfully",
        song
    })
}

async function getSongController(req, res) {
    const { mood } = req.query

    const song = await songModel.findOne({
        mood
    })

    res.status(200).json({
        message: mood + " song fetched succesffully",
        song
    })
}

module.exports = {
    uploadSongController,
    getSongController
}