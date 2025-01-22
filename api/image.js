const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Base URL của API gốc
const targetApiUrl = 'http://fi4.bot-hosting.net:22869/api/image';

app.get('/api/image', async (req, res) => {
    const { prompt } = req.query;

    // Kiểm tra nếu thiếu 'prompt' query parameter
    if (!prompt) {
        return res.status(400).json({ error: "Missing 'prompt' query parameter" });
    }

    // Thêm tiêu đề CORS cho phép truy cập từ một domain cụ thể
    res.setHeader('Access-Control-Allow-Origin', 'https://phatnottaken.x10.mx');  // Chỉ cho phép domain này truy cập
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Xử lý yêu cầu OPTIONS (Preflight Request)
    if (req.method === 'OPTIONS') {
        return res.status(204).end();  // Trả về thành công mà không làm gì
    }

    try {
        // Gửi yêu cầu tới API gốc
        const response = await axios.get(targetApiUrl, { params: { prompt } });

        // Trích xuất dữ liệu từ API gốc
        const { image, image_id, message, success } = response.data;

        // Trả về phản hồi cho client
        res.status(200).json({
            image,
            image_id,
            message,
            success
        });
    } catch (error) {
        console.error('Error fetching data from target API:', error.message);

        // Xử lý lỗi nếu API gốc không phản hồi
        res.status(500).json({ error: 'Failed to fetch data from target API' });
    }
});

// Cài đặt server lắng nghe
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
