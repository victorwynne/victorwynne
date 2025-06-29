---
layout: post
title: "Activity Monitor in macOS is wrong about energy usage of Apple silicon"
date:   2022-05-04 22:12
categories: [Links]
tags: [apps, macOS]
link: https://appleinsider.com/articles/22/05/03/activity-monitor-in-macos-is-wrong-about-energy-usage-of-apple-silicon
---

Malcolm Owen:

>[Testing by](https://eclecticlight.co/2022/05/02/dont-trust-activity-monitor-on-m1-macs/) *The Eclectic Light Company* on a [Mac Studio](https://appleinsider.com/inside/mac-studio) equipped with an M1 Max involved running threads on the 8 performance cores and 2 efficiency cores. When 8 threads of floating point maths with 1 billion loops per thread are limited to each core type, the 8 performance threads completed the task in 6.6 seconds, and the 2 efficiency cores took 40.4 seconds.
>
>However, checking Activity Monitor's Energy tab indicated the performance cores sustained an energy value of 800, with a total of 5,280 units used at 660 per thread. Meanwhile, the efficiency cores sustained an energy value of 194, with a total of 7,838 units consumed, or 980 per thread.
>
>If taken at face value, this would infer that running those specific threads on the efficiency cores turns out to be less efficient than the performance cores. The problem is due to Activity Monitor, the report claims, since it cannot tell the difference between identical cores with a fixed frequency and two different core types with variable frequencies.
>
>It was also found that there were problems in how it reported load between cores. One test determined running twice the amount of code on two efficiency cores was reported in Activity Monitor as using the same amount of energy as half the code amount.

In relation to reporting high energy usage, but with absolutely no discernible impact on battery life, I have definitely experienced this first hand when using Safari for long periods of time. I would venture to say this also results in skewing the estimated time remaining as well.
