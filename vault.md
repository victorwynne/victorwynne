---
layout: page
permalink: /vault/
title: Vault
---

<h3>Browse all the blog posts by <a href="/vault/">date</a> or <a href="/tags/">tag</a>.</h3>

<div class="post">
{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year in posts_by_year %}
  <h2>{{ year.name }} <small><sup>{{ year.items | size }}</sup></small></h2>
  {% assign posts_by_month = year.items | group_by_exp: "post", "post.date | date: '%B'" %}
  
  {% for month in posts_by_month %}
    <h2><small>{{ month.name }} <small><sup>{{ month.items | size }}</sup></small></small></h2>
    {% for post in month.items %}
      <a href="{{ post.url }}">{{ post.title }}</a>&nbsp;&nbsp;
<small><small><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%A" }}, {{ post.date | date_to_long_string: "ordinal", "US" }}</time></small></small>
      <br>
    {% endfor %}
  {% endfor %}
  {% unless forloop.last %}
    <hr>
  {% endunless %}
{% endfor %}
</div>
<br><br>
