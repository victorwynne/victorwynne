---
layout: post
title: "WidgetBundle improvements in iOS 16.1"
date: 2022-11-05 06:42
categories: [Links]
tags: [development, iOS]
link: https://twitter.com/luka_bernardi/status/1572000451775844352?s=46&t=VM6NdghOlP9-zvPzR4-hew
---

Luca Bernardi, who is part of the SwiftUI team at Apple:

>Starting in iOS 16.1 (beta 2), WidgetBundle supports having if statement with `#available` clause (and only this specific clause) in its body.
>
>That’s pretty useful to add more widget configurations that are supported only in later OSes like ActivityConfiguration.

This is the sample code he shared:


{% highlight swift %}
struct GrandPrixWidgets: WidgetBundle {
    var body: some Widget {
        NextRaceWidget ()

        if #available (iOS 16.1, *) {
           LiveRaceActivity()
        }
    }
}
{% endhighlight %}

👍🏻