---
layout: page
permalink: /colophon/
title: Colophon
---

{% assign totalWords = 0 %}
{% assign dateOb = '' %}

{% for post in site.posts %}
	{% assign postWords = post.content | number_of_words %}
	{% assign totalWords = totalWords | plus:  postWords %}
	{% assign pd = post.date | date: "%Y-%m-%d" %}
	{% unless forloop.first %}
		{% assign dateOb = dateOb | append: "," %}
	{% endunless %}
	{% assign dateOb = dateOb | append: pd %}
{% endfor %}

## <small>Publishing</small>

Blog posts and pages are written in [Markdown](https://daringfireball.net/projects/markdown/) and converted to static markup by the [Jekyll](https://jekyllrb.com) engine. The website’s functionality is built with Shopify’s [Liquid](https://shopify.github.io/liquid/) templating language which is written in Ruby. The design is crafted using valid [HTML5](https://validator.w3.org/nu/?doc=https%3A%2F%2Fvictorwynne.com%2F) and [CSS3](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvictorwynne.com&profile=css3svg&usermedium=all&warning=0&vextwarning=), and the syndicated feed is valid [RSS](https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fvictorwynne.com%2Ffeed.xml). [Hover](https://hover.com/) handles domain registration, and [Netlify](https://www.netlify.com) provides hosting by deploying a [GitHub](https://www.github.com/victorwynne/victorwynne/) repo.

ISSN: [2831-2880](https://portal.issn.org/resource/ISSN/2831-2880)<br><br>

## <small>Accessibility</small>

This website conforms to [WCAG](https://www.levelaccess.com/understanding-wcag/) 2.2 Level AAA.
<br><br>

## <small>Syndicated Feeds</small>

Full Feed: [victorwynne.com/feed.xml](https://victorwynne.com/feed.xml)<br>
Articles: [victorwynne.com/articles.xml](https://victorwynne.com/articles.xml)<br>
Links: [victorwynne.com/links.xml](https://victorwynne.com/links.xml)<br><br>

## <small>Software</small>

[AirBuddy](https://v2.airbuddy.app)<br>
[AlDente](https://apphousekitchen.com)<br>
[Audio Hijack](https://rogueamoeba.com/audiohijack)<br>
[BBEdit](https://www.barebones.com/products/bbedit)<br>
[Bear](https://bear.app)<br>
[Cakebrew](https://www.cakebrew.com)<br>
[Calzy](https://www.calzy.app)<br>
[CARROT Weather](https://www.meetcarrot.com/weather)<br>
[DaisyDisk](https://daisydiskapp.com)<br>
[Deliveries](https://deliveries.app/en.html)<br>
[Delta](https://deltaemulatorapp.com)<br>
[Displaperture](https://manytricks.com/displaperture)<br>
[Downie](https://software.charliemonroe.net/downie)<br>
[Drafts](https://getdrafts.com/)<br>
[Fantastical](https://flexibits.com/fantastical)<br>
[Final Cut Pro](https://www.apple.com/final-cut-pro/)<br>
[Flighty](https://www.flightyapp.com)<br>
[Homebrew](https://brew.sh)<br>
[IINA](https://iina.io)<br>
[iStat Menus](https://bjango.com/mac/istatmenus)<br>
[Kaleidoscope](https://kaleidoscope.app)<br>
[Keyboard Maestro](https://www.keyboardmaestro.com/main/)<br>
[Nova](https://nova.app)<br>
[Oh My Zsh](https://ohmyz.sh)<br>
[OmniFocus](https://www.omnigroup.com/omnifocus/)<br>
[OpenEmu](https://openemu.org)<br>
[Overcast](https://overcast.fm)<br>
[Parcel](https://parcelapp.net)<br>
[Pastel](https://www.highcaffeinecontent.com/blog/20200610-Pastel)<br>
[Path Finder](https://www.cocoatech.io)<br>
[PCalc](https://www.pcalc.com/mac)<br>
[Pillow](https://pillow.app)<br>
[Pixelmator Pro](https://www.pixelmator.com/pro)<br>
[Prompt](https://panic.com/prompt/)<br>
[Raindrop](https://raindrop.io)<br>
[Rectangle](https://rectangleapp.com)<br>
[Reeder](https://reederapp.com)<br>
[ScreenFlow](https://www.telestream.net/screenflow/overview.htm)<br>
[Sequel](https://www.getsequel.app)<br>
[SF Symbols](https://developer.apple.com/sf-symbols)<br>
[Signal](https://signal.org)<br>
[Sketch](https://www.sketch.com)<br>
[TextMate](https://macromates.com)<br>
[Tide Guide](https://www.tideguide.com)<br>
[Tower](https://www.git-tower.com/mac)<br>
[Transmit](https://panic.com/transmit)<br>
[Typora](https://typora.io)<br>
[WaterMinder](https://waterminder.com)<br>
[Working Copy](https://workingcopyapp.com)<br>
[Xcode](https://developer.apple.com/xcode)<br><br>

## <small>Stats</small>

Posts: {{ site.posts.size }}<br>
Last Build: {{ site.time | date: '%R %Z' }} on {{ site.time | date_to_long_string: "ordinal", "US" }}<br><br>

## <small>Contact</small>

Email: hello@victorwynne.com<br><br>

## <small>Privacy</small>

This website is mostly static. There are no server databases or long-running processes. I designed it this way with speed in mind. I use one snippet of JavaScript which enables Google Analytics to measure visitor traffic. This creates a browser cookie on your device which collects anonymous data that helps me learn which blog posts are most popular, and how many readers I have. No directly identifiable personal information is ever collected or stored. §
<br><br>
