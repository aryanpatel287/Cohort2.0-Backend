import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(
    cors({
        origin: 'http://localhost:5173',
    }),
);

const users = [
    { id: 1, name: 'Aryan' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jane' },
];

app.get('/data', (req, res) => {
    res.status(200).json({ users });
});

app.get('*name', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
