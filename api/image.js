const axios = require('axios');
const express = require('express');
const app = express();

const targetApiUrl = 'http://fi4.bot-hosting.net:22869/api/image';

app.get('/api/image', async (req, res) => {
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({ error: "Missing 'prompt' query parameter" });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://phatnottaken.x10.mx');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    try {
        // Fetch data from external API
        const response = await axios.get(targetApiUrl, { params: { prompt } });

        const { image, image_id, message, success } = response.data;

        res.status(200).json({
            image,
            image_id,
            message,
            success
        });
    } catch (error) {
        // Log detailed error message
        console.error('Error fetching data from target API:', error.message);
        console.error('Full error:', error);

        res.status(500).json({ error: 'Failed to fetch data from target API', details: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
