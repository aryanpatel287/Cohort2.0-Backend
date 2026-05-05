import express from 'express';
import useGraph from './services/graph.ai.service.js';

const app = express();

app.post('/use-graph', async (req, res) => {
    const obj = await useGraph('write a factorial function in javascript');
    res.send(obj);
});

export default app;
