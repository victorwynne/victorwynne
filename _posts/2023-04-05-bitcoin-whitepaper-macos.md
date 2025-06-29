---
layout: post
title:  "The Bitcoin whitepaper is hidden in every modern copy of macOS"
date:   2023-04-05 23:00
categories: [Links]
tags: [apple, humor, macOS]
link: https://waxy.org/2023/04/the-bitcoin-whitepaper-is-hidden-in-every-modern-copy-of-macos/
---

Andy Baio:

>While trying to fix my printer today, I discovered that a PDF copy of Satoshi Nakamoto’s  [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf) apparently shipped with every copy of macOS since Mojave in 2018.
>
>I’ve asked over a dozen Mac-using friends to confirm, and it was there for every one of them. The file is found in every version of macOS from Mojave (10.14.0) to the current version, Ventura (13.3), but isn’t in High Sierra (10.13) or earlier.
>
>If you’re on a Mac, open a Terminal and type the following command:
>
>{% highlight shell %}
open /System/Library/Image\ Capture/Devices/VirtualScanner.app/Contents/Resources/simpledoc.pdf
{% endhighlight %}
>
>If you’re on macOS 10.14 or later, the Bitcoin PDF should immediately open in Preview.
>
>(If you’re not comfortable with Terminal, open Finder and click on Macintosh HD, then open the System→Library→Image Capture→Devices folder. Control-click on VirtualScanner.app and Show Package Contents, open the Contents→Resources folder inside, then open simpledoc.pdf.)

🤭
