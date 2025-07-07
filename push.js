/**
 * push.js
 * Notifies OneSignal subscribers when a new blog post is published.
 * Designed to run during the Netlify build process.
 */

// === Dependencies ===
const https = require('https');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// === Configuration ===
const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

const POSTS_DIR = path.join(__dirname, '_posts');
const SITE_BASE_URL = 'https://victorwynne.com';
const DEFAULT_ICON_URL = 'https://victorwynne.com/assets/push-icon.png';

const NOTIFY_IF_LESS_THAN_MINUTES_OLD = 30;

// === Helper Functions ===
function parseFrontMatter(fileContent) {
  const match = fileContent.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {};

  const frontMatterString = match[1];
  const data = {};

  frontMatterString.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      if (value.startsWith("'") && value.endsWith("'") || value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      data[key] = value;
    }
  });
  return data;
}

// === Environment Validation ===
if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
  console.error("Error: OneSignal API keys (ONESIGNAL_APP_ID, ONESIGNAL_REST_API_KEY) are not set as environment variables.");
  console.error("Please set them in Netlify's Site Settings > Build & Deploy > Environment Variables.");
  process.exit(1);
}

// === Blog Post Analysis ===
function getLatestBlogPost() {
  const files = fs.readdirSync(POSTS_DIR);
  let latestPost = null;
  let latestDate = null;

  files.forEach(file => {
    if (file.endsWith('.md') || file.endsWith('.markdown')) {
      const filePath = path.join(POSTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');

      const frontMatter = parseFrontMatter(content);

      let postDate;
      let postTitle;
      let postSlug;

      if (frontMatter.date) {
        postDate = new Date(frontMatter.date);
      } else {
        const dateFromFilenameMatch = file.match(/^(\d{4}-\d{2}-\d{2})-/);
        if (dateFromFilenameMatch) {
          postDate = new Date(dateFromFilenameMatch[1]);
        }
      }

      if (frontMatter.title) {
        postTitle = frontMatter.title;
      }

      if (frontMatter.permalink && !frontMatter.permalink.includes(':year')) {
        const permalinkMatch = frontMatter.permalink.match(/^\/([^\/]+)\/?$/);
        if (permalinkMatch) {
            postSlug = permalinkMatch[1];
        }
      }

      if (!postSlug) {
        const slugFromFilenameMatch = file.match(/(?:^\d{4}-\d{2}-\d{2}-)?(.*?)\.md$/i);
        if (slugFromFilenameMatch && slugFromFilenameMatch[1]) {
          postSlug = slugFromFilenameMatch[1];
        }
      }

      if (!postDate || isNaN(postDate.getTime()) || !postTitle || !postSlug) {
        console.warn(`Skipping post ${file}: Could not reliably parse date, title, or slug. Check front matter and filename format.`);
        return;
      }

      const postUrl = `${SITE_BASE_URL}/${postSlug}/`;

      if (!latestDate || postDate > latestDate) {
        latestDate = postDate;
        latestPost = {
          title: postTitle,
          url: postUrl,
          date: postDate
        };
      }
    }
  });
  return latestPost;
}

// === Post Freshness Check ===
const latestPost = getLatestBlogPost();

if (!latestPost) {
  console.log("No valid blog posts found in _posts directory. Skipping notification.");
  process.exit(0);
}

const now = new Date();
const timeDiff = now.getTime() - latestPost.date.getTime();
const minutesDiff = timeDiff / (1000 * 60);

if (minutesDiff > NOTIFY_IF_LESS_THAN_MINUTES_OLD) {
  console.log(`Latest post "${latestPost.title}" (Date: ${latestPost.date.toISOString()}) is too old (${minutesDiff.toFixed(1)} minutes) to send a notification based on 'NOTIFY_IF_LESS_THAN_MINUTES_OLD' setting.`);
  process.exit(0);
}

// === Notification Payload Construction ===
const externalId = uuidv4();

const notificationData = JSON.stringify({
  app_id: ONESIGNAL_APP_ID,
  included_segments: ['Subscribed Users'],
  contents: { en: latestPost.title },
  headings: { en: 'A new blog post has been published' },
  url: latestPost.url,
  chrome_web_icon: DEFAULT_ICON_URL,
  external_id: externalId,
  ios_badgeType: "Increase",
  ios_badgeCount: 1
});

// === HTTPS Request to OneSignal ===
const options = {
  hostname: 'onesignal.com',
  port: 443,
  path: '/api/v1/notifications',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
    'Content-Length': Buffer.byteLength(notificationData)
  }
};

console.log(`Attempting to send notification for: "${latestPost.title}"`);
console.log(`URL: ${latestPost.url}`);
console.log(`External ID (UUID): ${externalId}`);

const req = https.request(options, (res) => {
  let responseData = '';
  console.log('OneSignal API Response Status Code:', res.statusCode);

  res.on('data', (d) => {
    responseData += d;
  });

  res.on('end', () => {
    console.log('OneSignal API Full Response:', responseData);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('Notification sent successfully to OneSignal!');
      const responseJson = JSON.parse(responseData);
      if (responseJson.id) {
        console.log(`OneSignal Notification ID: ${responseJson.id}`);
      }
    } else {
      console.error('Failed to send notification to OneSignal. Check response above for details.');
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Error making API request to OneSignal:', e);
  process.exit(1);
});

req.write(notificationData);
req.end();
