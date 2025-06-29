---
layout: post
title:  "A desire to write (again)"
date:   2019-12-01 14:30:00 -0500
categories: [Articles]
tags: [jekyll, design, development]
last_modified_at: 2020-01-24
---

I have maintained a website for the sole purpose of blogging at various
times over the years, but I always ended up stopping and never because of
a lack of desire to write. It has always come down to the overall cost
not being justifiable or the complexity that accompanies the publishing
process creating a mental roadblock. I decided that if I was going to attempt once again to publish a blog that I would need to find a solution
to both of these issues or I wasn't even going to bother taking the time
to launch a new online home at all. I did indeed do so and in this article
I am going to explain at length how I was able to accomplish it.

#### GETTING STARTED

Being that this would simply be a hobby project for me, I knew immediately that I wanted to avoid sinking any considerable amount of money into hosting or back-end management. While I was very much impressed with the feature set
of [Squarespace](https://squarespace.com/) from having used it previously I was not about to pay **$144** annually for a personal project that I wasn't even sure I would remain interested in. For 2/3rds the cost I could use [Wordpress](https://wordpress.com/) to host and manage the site but the moment I decided I wanted to write any sort of custom plugin that would immediately grow to being **$300** annually[^1]. True, I could always use the self-hosted version of Wordpress but then I run into the familiar hatred of being responsible for installation, creating a database and manually updating things in the future[^2]. If I went the [Medium](https://medium.com/) route I could pay absolutely nothing but be stuck with a cookie-cutter site design and unable to have a [custom domain](https://help.medium.com/hc/en-us/articles/115003053487-Custom-Domains-service-deprecation) which is entirely out of the question. So, what's a guy to do?

#### STATIC SITE GENERATORS

Although [SSGs](https://davidwalsh.name/introduction-static-site-generators) themselves are a fairly recent phenomenon the idea of a website being static most certainly is not. The very first webpage ever published by [Tim Berners-Lee](https://www.w3.org/People/Berners-Lee/) in 1991 was static because nothing else even existed at the time. As the Internet matured and became more feature rich there arose a need to dynamically create webpages for things such as user accounts, forums and other types of user interaction. Wordpress was created to fulfill the desire by people wanting a website capable of being dynamic. While there are many valid reasons for needing that sort of functionality, a blog is not one of them and a majority of people who use it are doing so unnecessarily[^3]. Since it was first released in 2003 a lot of newer, more exciting tools and frameworks have emerged that provide a better solution for blog authors in the form of generating static webpages.

Another benefit to these generators is that almost all of them are entirely open source and free to use. Choosing one really comes down to deciding what compiled programming language you are most comfortable with. At first I was tempted by the myriad of features and rapid development of [Hugo](https://gohugo.io/). Ultimately I decided against it simply because I have zero experience with the [Go](https://golang.org/) programming language[^4]. A language that I do have extensive knowledge of and experience with is [Ruby](https://www.ruby-lang.org/en/) so I ended up choosing [Jekyll](https://jekyllrb.com/) and could not be happier that I did.

#### INSTALLING JEKYLL

Jekyll was [created by](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html) Tom Preston-Werner, a co-founder and the [former](https://news.microsoft.com/2018/06/04/microsoft-to-acquire-github-for-7-5-billion/) CEO of [GitHub](https://github.com/) so it made perfect sense to version control my files in a repository there. I already had a Ruby environment setup on my machine so the installation process for Jekyll was as simple as `gem install jekyll bundler` and creating a default directory structure with `jekyll new blog`. That's it. Really, it's that simple. I could immediately start focusing on creating my styles in CSS and I very quickly had a finished website ready to start publishing on.

#### HOSTING

Obviously it does me no good to only have the website being served on my local machine but when it came to hosting options the answer was easy. Yes, I could have used GitHub to accomplish this part of the process too but I chose [Netlify](https://www.netlify.com/) instead because it allows for more fine-grain control over when and how my builds are deployed. After I make alterations to my site's design or publish a new post I commit those changes to the repository and Netlify updates the live site. What's even more great is that until the day comes that I am generating a **ton** of traffic I don't have to pay anything for hosting with them.

#### LAYOUT, CUSTOMIZATION AND WORKFLOW

I am going to work on writing another post that provides more information about what decisions I made regarding the site's design and how I tailored Jekyll to fit my needs. I also want to detail my experience with building and publishing all from an iPad Pro. Having the capability of a mobile only workflow was a major factor in deciding whether or not I felt I could ultimately be successful at maintaining a blog once again. I've only just begun but I already feel very confident that I will be.

***

[^1]: Not to mention the headache of working with PHP and the slow, bloated mess everything pertaining to customization has become.

[^2]: Which always results in things breaking!

[^3]: It's only fair to mention that for people with no background in programming Wordpress makes a lot of sense. While it is helpful to have some knowledge of HTML, CSS and PHP it is by no means a requirement in order to get by.

[^4]: I know that the syntax is very similar to C, which I do have experience writing in but there are enough differences that I was persuaded away from even trying it.
