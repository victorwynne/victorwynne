---
layout: post
title:  "Runaway corebrightnessd process"
date:   2021-09-29 18:00:00
categories: [Articles]
tags: [macOS]
---

<figure>
<a href="/assets/img/2021/09/corebrightnessd.png">
<img src="/assets/img/2021/09/corebrightnessd.png" alt="corebrightnessd.png"></a>
<figcaption>Make note of the time in between each error!</figcaption>
</figure>

I ran into an issue where the `corebrightnessd` process was slamming my Apple Silicon MacBook Air non-stop to the point where the device would crash within a few minutes after logging in unless I repeatedly force quit it. I spent the better part of my day trying to solve the issue and the culprit ended up being the latest beta release of Monterey (Build 21A5534d) containing a keyboard brightness bug. So for the time being I have to leave 'adjust keyboard brightness in low light' enabled until a fix is released. So if you happen to run into this and are being driven mad trying to figure out the solution...here you are. 🤓👍🏻💻
