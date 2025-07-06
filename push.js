// push.js
const https = require('https');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

const POSTS_DIR = path.join(__dirname, '_posts'); // Adjust if your posts are elsewhere
const SITE_BASE_URL = 'https://victorwynne.com'; // Your website's base URL
const DEFAULT_ICON_URL = 'https://victorwynne.com/assets/push-icon.png'; // Your default notification icon

// How many days old can a post be (based on its front matter 'date') to still trigger a notification on a fresh build.
// This prevents old posts from being re-notified on minor site changes.
const NOTIFY_IF_LESS_THAN_DAYS_OLD = 1; // e.g., 2 days

// --- Helper to parse YAML Front Matter ---
function parseFrontMatter(fileContent) {
  const match = fileContent.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {}; // No front matter found

  const frontMatterString = match[1];
  const data = {};

  frontMatterString.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes from value if present
      if (value.startsWith("'") && value.endsWith("'") || value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      data[key] = value;
    }
  });
  return data;
}

// --- Main Logic ---

if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
  console.error("Error: OneSignal API keys (ONESIGNAL_APP_ID, ONESIGNAL_REST_API_KEY) are not set as environment variables.");
  console.error("Please set them in Netlify's Site Settings > Build & Deploy > Environment Variables.");
  process.exit(1);
}

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

      // 1. Get Date (prioritize front matter, then filename)
      if (frontMatter.date) {
        postDate = new Date(frontMatter.date);
      } else {
        // Fallback to YYYY-MM-DD from filename if not in front matter
        const dateFromFilenameMatch = file.match(/^(\d{4}-\d{2}-\d{2})-/);
        if (dateFromFilenameMatch) {
          postDate = new Date(dateFromFilenameMatch[1]);
        }
      }

      // 2. Get Title (from front matter)
      if (frontMatter.title) {
        postTitle = frontMatter.title;
      }

      // 3. Get Slug (prioritize front matter 'permalink' if it specifies just slug, otherwise derive from filename)
      if (frontMatter.permalink && !frontMatter.permalink.includes(':year')) { // If permalink explicitly defined as just /slug/
        // Extract slug from permalink if it's just /slug/
        const permalinkMatch = frontMatter.permalink.match(/^\/([^\/]+)\/?$/);
        if (permalinkMatch) {
            postSlug = permalinkMatch[1];
        }
      }
      
      // If no permalink slug, derive from filename
      if (!postSlug) {
        // Extract slug from filename (e.g., 2023-01-01-my-post.md -> my-post, or my-post.md -> my-post)
        const slugFromFilenameMatch = file.match(/(?:^\d{4}-\d{2}-\d{2}-)?(.*?)\.md$/i);
        if (slugFromFilenameMatch && slugFromFilenameMatch[1]) {
          postSlug = slugFromFilenameMatch[1];
        }
      }
      
      // Basic validation
      if (!postDate || isNaN(postDate.getTime()) || !postTitle || !postSlug) {
        console.warn(`Skipping post ${file}: Could not reliably parse date, title, or slug. Check front matter and filename format.`);
        return; // Skip this file
      }

      // Construct URL based on your base_url/post-title/ format
      const postUrl = `${SITE_BASE_URL}/${postSlug}/`;

      if (!latestDate || postDate > latestDate) {
        latestDate = postDate;
        latestPost = {
          title: postTitle,
          url: postUrl,
          date: postDate // Keep the Date object
        };
      }
    }
  });
  return latestPost;
}

const latestPost = getLatestBlogPost();

if (!latestPost) {
  console.log("No valid blog posts found in _posts directory. Skipping notification.");
  process.exit(0);
}

// Check if the latest post is recent enough to notify about
const now = new Date();
const timeDiff = now.getTime() - latestPost.date.getTime();
const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

if (daysDiff > NOTIFY_IF_LESS_THAN_DAYS_OLD) {
    console.log(`Latest post "${latestPost.title}" (Date: ${latestPost.date.toISOString().split('T')[0]}) is too old (${daysDiff.toFixed(1)} days) to send a notification based on 'NOTIFY_IF_LESS_THAN_DAYS_OLD' setting.`);
    process.exit(0);
}

// Generate a unique external_id to prevent duplicate notifications for the same post on re-builds
// Using date from post and a slugified version of the title
const externalId = `jekyll_post_${latestPost.date.getFullYear()}${(latestPost.date.getMonth() + 1).toString().padStart(2, '0')}${latestPost.date.getDate().toString().padStart(2, '0')}_${latestPost.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase().substring(0, 50)}_${Date.now()}`;

const notificationData = JSON.stringify({
  app_id: ONESIGNAL_APP_ID,
  included_segments: ['Subscribed Users'], // Send to all currently subscribed users
  contents: { en: latestPost.title },
  headings: { en: 'New Blog Post!' },
  url: latestPost.url,
  chrome_web_icon: DEFAULT_ICON_URL,
  external_id: externalId, // Essential for preventing duplicates
  // Other optional parameters:
  // web_push_topic: "new-posts",
  // ttl: 3600, // Time to live in seconds (e.g., 1 hour)
  // data: { "post_slug": postSlug } // Custom data accessible in your service worker
});

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
console.log(`External ID: ${externalId}`);

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
      process.exit(1); // Indicate build failure if notification fails
    }
  });
});

req.on('error', (e) => {
  console.error('Error making API request to OneSignal:', e);
  process.exit(1); // Indicate build failure
});

req.write(notificationData);
req.end();
