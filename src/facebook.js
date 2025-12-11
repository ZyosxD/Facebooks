const axios = require('axios');
const CONFIG = require('./config');
const logger = require('./logger');

/**
 * Posts a photo with a caption to a Facebook Group.
 * @param {string} groupId - The ID of the group to post to.
 * @param {string} message - The caption text.
 * @param {string} imageUrl - The URL of the image.
 * @returns {Promise<boolean>} - True if successful, false otherwise.
 */
async function postToGroup(groupId, message, imageUrl) {
    const url = `https://graph.facebook.com/v18.0/${groupId}/photos`;

    const params = {
        url: imageUrl,
        message: message,
        access_token: CONFIG.ACCESS_TOKEN,
        published: true
    };

    try {
        logger.info(`Attempting to post to Group ID: ${groupId}...`);
        const response = await axios.post(url, null, { params });

        logger.success(`Post published successfully! Post ID: ${response.data.id}`);
        return true;
    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data.error.message;
            logger.error(`Facebook API Error for Group ${groupId}: ${errorMsg}`);

            // Specific advice for common errors
            if (errorMsg.includes('requires app being installed')) {
                logger.warn('Fix: Go to Group Settings > Apps > Add App.');
            }
        } else {
            logger.error(`Network/Unknown Error for Group ${groupId}: ${error.message}`);
        }
        return false;
    }
}

module.exports = { postToGroup };
