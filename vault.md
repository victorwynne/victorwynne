---
layout: page
permalink: /vault/
title: Vault
---

<h3>Browse all the blog posts by <a href="/vault/">date</a> or <a href="/tags/">tag</a>.</h3>

<div class="post">

{% for post in site.posts %}
{% assign thisyear = post.date | date: "%B %Y" %}
{% assign prevyear = post.previous.date | date: "%B %Y" %}
{% assign counter = counter | plus: 1 %}
{% if thisyear != prevyear %}

<h2><small>{{ thisyear }} <small><strong><sup>{{ counter }}</sup></strong></small></small></h2>

{% assign fli = forloop.index | minus: counter %}
{% for post2 in site.posts limit: counter offset: fli %}

<a href="{{ post2.url }}">{{ post2.title }}</a>&nbsp;&nbsp;
<small><small><time datetime="{{ post2.date | date_to_xmlschema }}">{{ post2.date | date: "%-d %b %Y" }}</time></small></small>
<br>
{% endfor %}
{% assign counter = 0 %}
{% endif %}
{% endfor %}
</div>
<br><br>
