---
layout: null
permalink: /debug/
title: Debug
---

# Debugging site.posts - Full List for Sitemap Check

Total posts found by Jekyll: {{ site.posts | size }}

## List of all posts and their sitemap-ready details:

{% for post in site.posts %}
- **Path:** `{{ post.path }}`
  **Original URL:** `{{ post.url }}`
  **Sitemap URL (after filter):** `{{ site.url }}{{ post.url | remove: “index.html” }}`
  **Original Date:** `{{ post.date }}`
  **Sitemap Date (after filter):** `{{ post.date | date_to_xmlschema }}`
  —
{% endfor %}
