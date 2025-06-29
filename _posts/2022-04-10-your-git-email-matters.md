---
layout: post
title:  "Why your git email address matters"
date:   2022-04-10 22:25
categories: [Links]
tags: [git, development]
link: https://www.juliaferraioli.com/blog/2022/your-git-email-matters/
---

Julia Ferraioli:

>We all operate in different *contexts*. I have personal, volunteer, side-project, and corporate contexts – and different email addresses associated with each of them. The email address that I use for a specific commit tells the project in which context my contribution has been made.
>
>So in addition to (or instead of) running setting a global configuration for your email address, you can run:
>
>`$ git config user.email yourname@company.com`
>
>within your clone of a specific repository to configure the email address that your commits should use. If you have set a global `user.email` as well, that’s what commits will use if you haven’t set one within a repository ([git-scm documentation that describes this behavior](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#_your_identity)).

This is certainly a good habit to pick up. I would add that taking the time to setup GPG keys to ensure your commits are verified is just as important too.
