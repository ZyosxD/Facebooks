# Facebook Group Automation Bot V2.0

A modular, highly compliant Node.js bot designed to automate daily posts to Facebook Groups for insurance services.

## ✨ New Features in V2.0
- **Modular Architecture:** Easy to maintain and upgrade.
- **Magistral Logging:** Beautiful, color-coded terminal output using `chalk` to keep you informed of every action.
- **Enhanced Configuration:** centralized config in `src/config.js`.

## 📂 Project Structure

```
├── index.js          # Main entry point and scheduler
├── package.json      # Dependencies and scripts
├── src/
│   ├── config.js     # Configuration settings
│   ├── content.js    # Content generation logic
│   ├── facebook.js   # Facebook Graph API integration
│   └── logger.js     # Custom logging module ("Magistral Log")
└── .env              # Environment variables (create this)
```

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configuration (.env)
Create a `.env` file in the root directory:

```env
# Credentials
FB_ACCESS_TOKEN=your_long_lived_access_token

# Target Groups (comma separated)
GROUP_IDS=123456789,987654321

# Content
WHATSAPP_LINK=https://wa.me/3854766573

# Scheduling (Cron Syntax)
CRON_SCHEDULE=0 10 * * *
```

### 3. Run the Bot
```bash
npm start
```

## 🛠️ Customization

-   **Adding Services/Templates:** Edit `src/content.js`.
-   **Changing Delays:** Edit `src/config.js` (`MIN_DELAY_MINUTES`, `MAX_DELAY_MINUTES`).
-   **Logging:** Check `src/logger.js` to see how the "Magistral" logs are built.

## ⚠️ Compliance & Anti-Ban Strategy

This bot is built to respect Facebook's ecosystem:
1.  **Rate Limiting:** It sleeps between posts (randomized 1-5 minutes) to mimic human behavior.
2.  **Unique Content:** It rotates templates and images to avoid duplicate content detection.
3.  **Official API:** It uses the standard Graph API, which is safer than browser automation.

**Note:** Ensure your Facebook Page is an admin of the groups you are posting to, or that your App is installed in the Group Settings.
