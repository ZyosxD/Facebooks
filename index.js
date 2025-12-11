const cron = require('node-cron');
const CONFIG = require('./src/config');
const logger = require('./src/logger');
const content = require('./src/content');
const facebook = require('./src/facebook');

/**
 * Executes the daily posting routine across all configured groups.
 */
async function runDailyRoutine() {
    logger.header('STARTING DAILY POSTING ROUTINE');

    const groups = CONFIG.GROUP_IDS;
    logger.info(`Found ${groups.length} target groups.`);

    if (groups.length === 0) {
        logger.warn('No Group IDs configured. Please check your configuration.');
        return;
    }

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < groups.length; i++) {
        const groupId = groups[i];

        logger.box(`Processing Group ${i + 1}/${groups.length}\nID: ${groupId}`);

        // Generate content
        const caption = content.generateCaption();
        const image = content.getRandomImage();

        // Attempt Post
        const success = await facebook.postToGroup(groupId, caption, image);

        if (success) successCount++;
        else failCount++;

        // Handle delays if there are more groups to process
        if (i < groups.length - 1) {
            const delayMinutes = Math.floor(Math.random() * (CONFIG.MAX_DELAY_MINUTES - CONFIG.MIN_DELAY_MINUTES + 1)) + CONFIG.MIN_DELAY_MINUTES;
            const delayMs = delayMinutes * 60 * 1000;

            logger.waiting(`Cooling down... Waiting ${delayMinutes} minute(s) before next post.`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }

    logger.header('ROUTINE COMPLETE');
    logger.box(`SUMMARY:\n✅ Successful Posts: ${successCount}\n❌ Failed Posts:     ${failCount}`);
}

// --- MAIN INIT ---

logger.box(`   FACEBOOK GROUP BOT V2.0   \n   Status: ONLINE 🟢   \n   Schedule: ${CONFIG.CRON_SCHEDULE}`);

// Schedule the task
cron.schedule(CONFIG.CRON_SCHEDULE, () => {
    runDailyRoutine();
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    logger.warn('Bot stopping manually...');
    process.exit();
});

// For testing purposes, uncomment to run immediately
// runDailyRoutine();
