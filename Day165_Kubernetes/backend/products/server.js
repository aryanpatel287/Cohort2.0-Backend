import express from 'express';
import morgan from 'morgan';
import axios from 'axios';

const app = express();

app.use(morgan('dev'));

app.get('/api/products', async (req, res) => {
    const sumResponse = await axios.get('http://main-server-service');

    res.status(200).json({
        message: 'Products service is running',
        data: sumResponse.data,
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Products server is running on port ${PORT}`);
});
