import express from 'express';
import useGraph from './ai/graph.ai.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173', // Update this to match your frontend URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(morgan('dev'));

app.post('/use-graph', async (req, res) => {
    const result = await useGraph(
        'write an code for the factorial function in js ',
    );

    res.json(result);
});

app.post('/invoke', async (req, res) => {
    const { problem } = req.body;

    const result = await useGraph(problem);

    res.status(200).json({
        success: true,
        message: 'Solution of given problem generated successfully',
        result,
    });
});

export default app;
