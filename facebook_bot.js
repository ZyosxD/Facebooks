require('dotenv').config();
const axios = require('axios');
const cron = require('node-cron');

// --- CONFIGURATION ---
// In a real deployment, these should be in a .env file
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || 'YOUR_PAGE_ACCESS_TOKEN';
// List of Group IDs to post to
const GROUP_IDS = (process.env.GROUP_IDS || '123456789,987654321').split(',');
const WHATSAPP_LINK = process.env.WHATSAPP_LINK || 'https://wa.me/3854766573';

// Services offered (for dynamic caption generation)
const SERVICES = [
    "Seguro de Auto",
    "Seguro de Vida",
    "Seguro de Hogar",
    "Seguro Médico",
    "Seguro Comercial"
];

// Image URLs (Replace with your actual hosted image URLs)
const IMAGES = [
    "https://example.com/images/insurance1.jpg",
    "https://example.com/images/insurance2.jpg",
    "https://example.com/images/insurance3.jpg"
];

// --- CONTENT CREATION ---

/**
 * Generates an engaging caption in Spanish.
 * Uses emoticons and a clear Call to Action (CTA).
 */
function generateCaption() {
    const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];

    const templates = [
        `¡Protege lo que más amas con nuestro ${service}! 🌟\nEstamos aquí para brindarte la tranquilidad que mereces. 🛡️\n\n¡Contáctanos hoy mismo para una cotización gratis! 👇\n${WHATSAPP_LINK}`,

        `¿Buscas un ${service} confiable y accesible? 🧐\n¡No busques más! Tenemos las mejores opciones para ti. ✅\n\nEnvíanos un mensaje ahora: 📲 ${WHATSAPP_LINK}`,

        `¡No dejes tu futuro al azar! 🎲\nAsegura tu bienestar con nuestro ${service}. Expertos a tu servicio. 💼👩‍⚕️\n\nHabla con nosotros aquí: 👉 ${WHATSAPP_LINK}`,

        `✨ Oferta especial en ${service} ✨\nAtención personalizada y los mejores precios del mercado. 📉\n\n¡Escríbenos al WhatsApp! 📞 ${WHATSAPP_LINK}`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Selects a random image URL.
 */
function getRandomImage() {
    return IMAGES[Math.floor(Math.random() * IMAGES.length)];
}

// --- API INTERACTION ---

/**
 * Posts a message (and optionally an image) to a specific Facebook Group.
 * Note: Your App must be installed in the Group, or the Page must be an Admin.
 */
async function postToGroup(groupId) {
    const message = generateCaption();
    const imageUrl = getRandomImage();

    // API Endpoint for posting photos (which includes a message/caption)
    // Using the /photos edge is better for engagement than /feed with just a link
    const url = `https://graph.facebook.com/v18.0/${groupId}/photos`;

    const params = {
        url: imageUrl,
        message: message,
        access_token: ACCESS_TOKEN,
        published: true
    };

    try {
        const response = await axios.post(url, null, { params });
        console.log(`[SUCCESS] Posted to Group ${groupId}. Post ID: ${response.data.id}`);
        return true;
    } catch (error) {
        if (error.response) {
            console.error(`[ERROR] Failed to post to Group ${groupId}:`, error.response.data.error.message);
        } else {
            console.error(`[ERROR] Network error posting to Group ${groupId}:`, error.message);
        }
        return false;
    }
}

// --- SCHEDULING AND EXECUTION ---

/**
 * Runs the daily posting routine.
 * Iterates through all groups with a delay to respect rate limits.
 */
async function runDailyPostRoutine() {
    console.log(`\n--- Starting Daily Posting Routine: ${new Date().toISOString()} ---`);

    for (let i = 0; i < GROUP_IDS.length; i++) {
        const groupId = GROUP_IDS[i].trim();
        if (!groupId) continue;

        await postToGroup(groupId);

        // Wait between 1 to 5 minutes between posts to avoid spam filters
        // Randomizing the delay makes the behavior look more organic
        const delayMinutes = Math.floor(Math.random() * 4) + 1; // 1-5 minutes
        const delayMs = delayMinutes * 60 * 1000;

        if (i < GROUP_IDS.length - 1) {
            console.log(`Waiting ${delayMinutes} minute(s) before next post...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    console.log('--- Daily Routine Completed ---');
}

// --- MAIN ENTRY POINT ---

console.log("Bot initialized. Scheduled to run daily at 10:00 AM.");

// Schedule the task for 10:00 AM every day
// Format: Minute Hour DayMonth Month DayWeek
cron.schedule('0 10 * * *', () => {
    runDailyPostRoutine();
});

// For testing purposes (uncomment to run immediately upon start)
// runDailyPostRoutine();
