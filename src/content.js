const CONFIG = require('./config');

const SERVICES = [
    "Seguro de Auto 🚗",
    "Seguro de Vida ❤️",
    "Seguro de Hogar 🏠",
    "Seguro Médico 🏥",
    "Seguro Comercial 🏢"
];

// Placeholder images - in production these should be real URLs
const IMAGES = [
    "https://example.com/images/insurance1.jpg",
    "https://example.com/images/insurance2.jpg",
    "https://example.com/images/insurance3.jpg"
];

const TEMPLATES = [
    (service, link) => `¡Protege lo que más amas con nuestro ${service}! 🌟\nEstamos aquí para brindarte la tranquilidad que mereces. 🛡️\n\n¡Contáctanos hoy mismo para una cotización gratis! 👇\n${link}`,

    (service, link) => `¿Buscas un ${service} confiable y accesible? 🧐\n¡No busques más! Tenemos las mejores opciones para ti. ✅\n\nEnvíanos un mensaje ahora: 📲 ${link}`,

    (service, link) => `¡No dejes tu futuro al azar! 🎲\nAsegura tu bienestar con nuestro ${service}. Expertos a tu servicio. 💼👩‍⚕️\n\nHabla con nosotros aquí: 👉 ${link}`,

    (service, link) => `✨ Oferta especial en ${service} ✨\nAtención personalizada y los mejores precios del mercado. 📉\n\n¡Escríbenos al WhatsApp! 📞 ${link}`
];

module.exports = {
    /**
     * Generates a random caption.
     */
    generateCaption: () => {
        const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
        const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        return template(service, CONFIG.WHATSAPP_LINK);
    },

    /**
     * Returns a random image URL.
     */
    getRandomImage: () => {
        return IMAGES[Math.floor(Math.random() * IMAGES.length)];
    }
};
