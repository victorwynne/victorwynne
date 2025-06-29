---
layout: post
title:  "Creating link posts with Jekyll"
date:   2020-01-03 02:30:00 -05:00
categories: [Articles]
tags: [development, design, jekyll]
---

One thing I wanted to do with this site is create *linked-list* style posts.
It's the type of post where you normally want to use the headline as a link
to the external source that is being quoted and/or commented on. Jekyll doesn't
have this feature baked in of course but it is fairly easy to do. I also wanted to
make it easy for the reader to distinguish those posts from regular articles.
So to accomplish that I added an arrow to the end of the post title and styled it.

Here is how I included the functionality for my use case...

It requires adding a key variable to the post's front matter called `link` and the paired
value being the URL of whatever source you are wanting to link to.

Here is an example:

{% highlight yaml %}
# Side note: the source being linked to is quite a good read.
---
layout: post
title:  "Impeachment of Donald Trump"
date:   2020-01-02 12:15:00
categories: [Linked List]
link: https://en.wikipedia.org/wiki/Impeachment_of_Donald_Trump
excerpt_separator: <!--more-->
---
{% endhighlight %}

One potential issue that can arise from this setup is it becoming difficult to reach
the actual permalink for the post on your site. I use `excerpt_separator` to enable
my home page showing only the title of the post and the date it was published. So this
meant if I wanted readers to see the commentary I added that I would need to tweak the
liquid code I used in `index.html` and `/layouts/post.html`. Clicking on the post title
from the home page leads to the permalink and clicking on the post title again directs
to the external source. If someone is using an RSS reader they can see what I put in the
body of the article and tap on the title to be taken to the external link.

This is what I added to my index page:

{% highlight html %}
{% raw %}

<h1 class="post-title">
    <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title | smartify }}{% if post.link %}<span class="link-arrow">&rarr;</span>{% endif %}</a>
</h1>
{% endraw %}
{% endhighlight %}

Then I added this to my post layout:

{% highlight html %}
{% raw %}

<h1 class="post-title">{% if page.link %}
<h1 class="post-title"><a href="{{ page.link }}">
  {{ page.title | smartify }} <span class="link-arrow">&rarr;</span></a>
</h1>
  {% else %}
<h1 class="post-title">{{ page.title | smartify }}</h1>
  {% endif %}</h1>

{% endraw %}
{% endhighlight %}

Finally, styling the arrow to be indicative that it's a linked post:

{% highlight css %}

span.link-arrow {
  color: #1ba77e;
}

{% endhighlight %}

If you have a need to display posts in other areas of your site then naturally you would need to repeat this process for those layout files as well. After that it's
as simple as adding a single line to the front matter of each link post.
