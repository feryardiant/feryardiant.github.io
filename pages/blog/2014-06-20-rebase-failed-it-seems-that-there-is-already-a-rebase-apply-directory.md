---
layout: post
title: "Rebase Failed! It seems that there is already a rebase-apply directory"
date: 2014-06-20 09:44:44 +0700
comments: true
thumb:
tags: [Playgrounds, Solution, Git, Rebase]
---
> git rebase has found a `.git/rebase-apply` directory and so presumes that you might be in the middle of a rebase. This would have happened if there was a conflict during a previous rebase and the rebase was not finished; i.e. you did not run one of `git rebase --abort`, `git rebase --skip` or `git rebase --continue` (the last one after resolving the conflict).

[Solution by Siddhartha Reddy](http://stackoverflow.com/a/8780538/881743)
