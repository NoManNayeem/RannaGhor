// ChatService.js
import axios from 'axios';

// Replace 'your_api_key_here' with your actual API key
const API_KEY = 'your_api_key_here';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_URL_MULTI_MODAL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent';

// Function for text-only chat
async function chatWithGemini(userMessage) {
    try {
        const response = await axios.post(
            `${API_URL}?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: userMessage,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const responseText = response.data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I did not understand that.';
        return responseText;
    } catch (error) {
        console.error('Error in chatWithGemini:', error);
        throw new Error('Failed to fetch response from chatWithGemini');
    }
}

// Function for text-and-image chat
async function chatWithGeminiMultiModal(message, encodedImage = null) {
    try {
        const parts = [{ text: message }];
        if (encodedImage) {
            parts.push({
                inline_data: {
                    mime_type: 'image/jpeg',
                    data: encodedImage,
                },
            });
        }

        const response = await axios.post(
            `${API_URL_MULTI_MODAL}?key=${API_KEY}`,
            { contents: [{ parts }] },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 60000,
            }
        );
        const responseData = response.data;
        const textPart = responseData.candidates[0]?.content?.parts.find(part => part.text)?.text || 'Sorry, I did not understand that.';
        return textPart;
    } catch (error) {
        console.error('Error in chatWithGeminiMultiModal:', error);
        throw new Error('Failed to fetch response from chatWithGeminiMultiModal');
    }
}

export { chatWithGemini, chatWithGeminiMultiModal };
