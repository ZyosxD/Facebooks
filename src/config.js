require('dotenv').config();

const CONFIG = {
    // Facebook Credentials
    ACCESS_TOKEN: process.env.FB_ACCESS_TOKEN || 'YOUR_PAGE_ACCESS_TOKEN',

    // Target Groups
    // Handles simple string or comma-separated list
    GROUP_IDS: (process.env.GROUP_IDS || '123456789,987654321').split(',').map(id => id.trim()).filter(id => id),

    // Contact Info
    WHATSAPP_LINK: process.env.WHATSAPP_LINK || 'https://wa.me/3854766573',

    // Scheduling
    CRON_SCHEDULE: process.env.CRON_SCHEDULE || '0 10 * * *', // Default: 10:00 AM daily

    // Delays (in minutes)
    MIN_DELAY_MINUTES: 1,
    MAX_DELAY_MINUTES: 5
};

module.exports = CONFIG;
