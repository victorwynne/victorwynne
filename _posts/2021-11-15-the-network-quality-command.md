---
layout: post
title:  "The network quality command in Monterey"
date:   2021-11-15 13:15:00
categories: [Links]
tags: [macOS]
link: https://danpetrov.xyz/macos/2021/11/14/analysing-network-quality-macos.html
---

Dan Petrov:

>It seems that Apple has quietly added a new tool in macOS Monterey for measuring your device’s Internet connectivity quality. You can simply call the executable networkQuality, which executes the following tests:
>
>- Upload/download capacity (your Tx/Rx bandwidth essentially)
>- Upload/download flows, this seems to be the number of test packets used for the responsiveness tests
>- Upload/download responsiveness measured in Roundtrips Per Minute (RPM), which according to Apple, is the number of sequential round-trips, or transactions, a network can do in one minute under normal working conditions

I'm not sure why this new inclusion didn't bubble to the surface during the summer. I just tested it in beta 1 of Monterey and it was already there at the beginning of the beta period. So glad to see this added because I will be using it constantly in scripts I run on remote macOS servers that I operate. Now if only there was a variant for testing local network speeds. 🧐
