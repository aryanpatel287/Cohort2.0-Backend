import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
    }),
);

app.get('/', (req, res) => {
    res.send('Hello, Aryan!');
});

const users = [
    { id: 1, name: 'Aryan' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jane' },
];

app.get('/data', (req, res) => {
    res.status(200).json({ users });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
