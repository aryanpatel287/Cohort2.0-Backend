import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/data', (req, res) => {
    res.status(200).json({ message: 'This is some data' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
