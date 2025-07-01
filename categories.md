---
layout: page
permalink: /categories/
title: Categories
---

<h3>Browse all the blog posts by <a href="/vault/">date</a> or <a href="/tags/">tag</a>.</h3>

<div>
{% assign categories_sorted = site.categories | sort %}
{% for category in categories_sorted %}
  <div class="archive-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}

    <div id="#{{ category_name | slugize }}"></div>

    <h2 class="category-head">
    <small>{{ category[0] | replace:'-', ' ' }} <small><sup><strong>{{ category | last | size }}</strong></sup></small></small></h2>
    <a name="{{ category_name | slugize }}"></a>

    {% for post in site.categories[category_name] %}
    <article class="archive-item">
      <a href="{{ post.url }}">{{ post.title }}</a>&nbsp;&nbsp;
      <small><small><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time></small></small>
    </article>
    {% endfor %}
  </div>
{% endfor %}
</div>
<br><br>
