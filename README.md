# Facebook Group Automation Bot

This project is a Node.js bot designed to automate daily posts to Facebook Groups for insurance services. It is designed to be compliant with Facebook's Community Standards and Anti-Spam policies.

## ⚠️ Important Compliance Warning

**To avoid account bans:**
1.  **Do not spam.** Keep posting frequency low (e.g., once a day).
2.  **Vary your content.** Do not post the exact same text and image repeatedly. This bot includes logic to randomize captions.
3.  **Use the Official API.** This bot uses the Facebook Graph API. Do not use "scraper" or "browser automation" tools (like Selenium/Puppeteer) as they often trigger bans.
4.  **Admin Rights.** The Page or User associated with the Access Token *must* be an Admin of the target groups, or the App must be installed in the group settings.

## Features

-   **Multi-Group Support:** Posts to a configured list of Facebook Group IDs.
-   **Rich Media:** Posts images with captions (using the `/photos` edge).
-   **Latino Audience Focus:** Pre-configured with Spanish captions and cultural nuance.
-   **Smart Scheduling:** Uses `node-cron` for daily execution and includes random delays between posts to prevent rate-limiting.
-   **Error Handling:** Logs API errors without crashing the application.

## Setup Instructions

### 1. Prerequisites
-   Node.js installed on your machine.
-   A Facebook Developer Account.
-   A Facebook App with the `publish_to_groups` (if available/approved) or `pages_manage_posts` and `pages_read_engagement` permissions.
-   **Note:** Posting to groups via API now generally requires the bot to act as a **Page** that is an administrator of the group.

### 2. Installation

1.  Clone this repository or download the files.
2.  Install dependencies:
    ```bash
    npm install
    ```

### 3. Configuration

Create a `.env` file in the root directory (or edit the defaults in `facebook_bot.js`) with the following variables:

```env
# Your Page Access Token (Long-lived token recommended)
FB_ACCESS_TOKEN=your_access_token_here

# Comma-separated list of Group IDs
GROUP_IDS=123456789,987654321

# Your WhatsApp contact link
WHATSAPP_LINK=https://wa.me/3854766573
```

### 4. Running the Bot

Start the bot:
```bash
npm start
```
The bot will initialize and wait for the scheduled time (default is 10:00 AM daily). To test immediately, uncomment the `runDailyPostRoutine()` call at the bottom of `facebook_bot.js`.

---

## Bot Operations Guide

### Content Creation Strategy
-   **Captions:** The bot randomly selects from a set of pre-written, engaging Spanish templates (`generateCaption` function). To add more variety, edit the `templates` array in the code.
-   **Images:** The bot picks random images from the `IMAGES` array. **Action Required:** Replace the placeholder URLs in `facebook_bot.js` with actual URLs of your marketing images hosted online (e.g., on your website or a cloud bucket).

### Scheduling Posts
-   **Frequency:** The default is set to once per day at 10:00 AM. This is a safe frequency.
-   **Jitter/Delays:** The bot automatically waits 1-5 minutes between posting to different groups. This is crucial for mimicking human behavior and avoiding "bot" detection.

### Monitoring Engagement
-   **Logs:** The bot prints logs to the console (`[SUCCESS]` or `[ERROR]`). Monitor these logs to ensure posts are going through.
-   **Replies:** You must manually check the Facebook Groups for comments and replies. The API allows reading comments, but responding is best done manually or via a dedicated inbox management tool to ensure personal connection.

### Troubleshooting
-   **Error: "(#200) If posting to a group, requires app being installed in the group"**: You must go to the Group Settings on Facebook > Apps > Add Apps and add your specific Facebook App.
-   **Error: "Token invalid/expired"**: Generate a new Long-Lived Access Token in the Facebook Graph API Explorer.
