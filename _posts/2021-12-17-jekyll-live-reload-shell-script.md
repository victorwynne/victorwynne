---
layout: post
title:  "Jekyll live reload shell script"
date:   2021-12-17 02:00
categories: [Articles]
tags: [jekyll, development]
---

A very simple shell script but immensely useful if you find yourself constantly spinning up the built-in Jekyll server to edit your website. With the additional `--livereload` command you don't have to manually refresh the page after making changes either.

{% highlight shell %}
#!/bin/zsh

cd /path/to/jekyll/repo/

jekyll serve --livereload


{% endhighlight %}
