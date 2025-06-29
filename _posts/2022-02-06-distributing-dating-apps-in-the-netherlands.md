---
layout: post
title: "Distributing dating apps in the Netherlands"
date: 2022-02-06 14:30
categories: [Links]
tags: [apple, business]
link: https://developer.apple.com/support/storekit-external-entitlement/
---

From the developer support document:

>Consistent with the ACM’s order, dating apps that are granted an entitlement to link out or use a third-party in-app payment provider will pay Apple a commission on transactions. Apple will charge a 27% commission on the price paid by the user, net of value-added taxes. This is a reduced rate that excludes value related to payment processing and related activities. Developers will be responsible for the collection and remittance of any applicable taxes, such as the Netherlands’ value-added tax (VAT), for sales processed by a third-party payment provider.

Nobody guessed that Apple *wouldn't* still seek a commission on sales completed with outside payment providers, but I think 27% caught a lot of people by surprise. These apps are also unable to utilize in-app purchases which I would assume is where the bulk of sales originate from. Currently Apple lowers their commission for subscriptions after the first year from 30% to 15% but makes absolutely no mention of this for third-party payments. I suppose the right way to interpret this is; stick to using our payment processing, or be faced with making less money overall in the long run.

Benjamin Mayo [sums this up](https://bzamayo.com/netherlands-apple-dating-apps) perfectly:

>Apple is doing everything they can to toe the line to comply with the Netherlands ruling on alternate payment systems for dating apps. I’m not sure you could find a webpage more emblematic of the idiom of following the letter of the law, rather than the spirit of the law. They are also simultaneously appealing the decision and that tone comes across in the text too, as if each sentence is dripping with resentment.
>
>I can only assume this is just the first bout in many rounds of back-and-forth over terms, that will be replicated and reproduced on a global scale eventually. This court ruling is on enabling competition for in-app payment systems, rather than the general monopoly of mobile app stores. However, the two are obviously inextricably linked. No one is going to use a third-party payment system when the saving compared to Apple’s built-in offering is a measly 3%. These current terms will not incite competition in payment systems as no developer will ever implement one. If you think the 3% will just about cover independent credit card processing fees, the customer acquisition costs and additional support overhead alone will make it an unprofitable course of action.

Apple is constantly making the case against allowing side-loading apps, but in the same breath issues a policy like this one which very much makes the case in favor of allowing it. As stated by Mayo, this court ruling is on enabling competition for payment systems and as can be clearly seen this does not pave the way for that happening at all. I cannot wait to see how the courts respond to this laughable policy.
