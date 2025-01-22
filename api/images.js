const axios = require('axios');

// Base URL của API gốc
const targetApiUrl = 'http://fi4.bot-hosting.net:22869/api/image';

module.exports = async (req, res) => {
    const { prompt } = req.query; // Lấy giá trị 'prompt' từ query string

    if (!prompt) {
        return res.status(400).json({ error: "Missing 'prompt' query parameter" });
    }

    try {
        // Gửi yêu cầu tới API gốc
        const response = await axios.get(targetApiUrl, { params: { prompt } });

        // Trích xuất dữ liệu từ API gốc
        const { image, image_id, message, success } = response.data;

        // Trả về phản hồi
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
};
