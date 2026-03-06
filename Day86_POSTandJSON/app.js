const express = require('express');
const app = express()
app.use(express.json())
let notes=[]
app.post('/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.send('Notes created')
})
app.get('/notes',(req,res)=>{
    res.send(notes)
})
app.get('/', (req, res) => {
    res.send('This is a notes app')
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
