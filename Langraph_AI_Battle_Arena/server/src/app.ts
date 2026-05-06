import express from 'express';
import useGraph from './ai/graph.ai.js';

const app = express();

app.post('/use-graph', async (req, res) => {
    const result = await useGraph(
        'write an code for the factorial function in js ',
    );

    res.json(result);
});

export default app;
