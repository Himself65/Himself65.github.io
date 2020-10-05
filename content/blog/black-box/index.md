---
title: 黑箱
tags: ["code", "life"]
date: "2020-10-05"
---

## 前言

在编写程序的时候，我们经常需要用到一些所谓的 `库` 。

拿下面的代码举例：

```c
#include <stdio.h>

int main() {
   FILE *fp = NULL;
   fp = fopen("/tmp/test.txt", "w+");
   fprintf(fp, "This is testing for fprintf...\n");
   fputs("This is testing for fputs...\n", fp);
   fclose(fp);
   return 0;
}
```

我们不需要记住 `fopen` 具体实现，只需要知道需要传入什么东西（`input`），和它会返回什么（`output`）即可。

这就是黑盒的概念

![black box](./black-box.png)

现代软件开发的模式也基本都是这样，自上而下的开发。

但当我们开始打算研究一个黑盒时候？究竟是先从里面开始还是从外面开始？

## 黑盒

我曾经想要入门 `Machine Learning` 时，曾经不知道如何下手。
问了问朋友，朋友告诉我：“从tensorflow调API开始”。我反问为什么。

“难道你学Vue时候先读一遍Vue源码吗？”

实际上的确是这样。

CS方向上，学一个东西之前先得知道这个东西的实现怎么用，才能讨论黑盒的细节。

那么换成 “如何入门CS（Computer Science）” 呢？

编程语言肯定是必须掌握一个的，问题来到了学哪个编程语言身上。

知识的诅咒（Curse of knowledge）告诉我们：当你掌握了某种知识，你就难以想象没有它是怎样的状态。

在编程上实际上更显而易见，初学编程的小白甚至可能对 `main` 函数 `return 0` 产生疑问。如何打破“知识的诅咒”，可能是对老师最基本的要求了。

所以让人明白到底为什么要这样，其实是最需要解决的问题。

对于学习编程，程序实际上就是一个黑盒（black box），对输入（UI输入、文件……）处理后进行输出（写到文件、发到网上……）

即使是MIT 6.0001 Introduction to Computer Science and Programming，第一节课也告诉了学生编程是在干什么。

## C or Python

问题又来了，初学编程是从Python开始还是C语言开始？

即使是知乎上，也有不少的 [相关讨论] [1] [2]

无论是C还是Python，无非就是让你快点上手写代码，It's the basic of everything.

但是实际上却是方法却产生了偏差，不少拿着谭浩强入门C，或者九块九包教会Python都是错误的方法。

另一方面，说着C语言对以后学OS、编译原理这样的大话，实际上C很可能让真·新手产生挫败，
大部分新手的问题还是如何写一个控制流（if-else, for）、如何把控制台输入（stdin）处理然后打印出去（NOIP普及组难度）。
还依然这么高谈阔论岂不是“何不食肉糜”？

实际上，学习编程就是学习如何处理数据，这在我另一篇文章中有所提到，[数据、计算，以及学习编程](/start-to-learn-programming)。

以上。

## Links

[1]: https://www.zhihu.com/question/423489741
[2]: https://www.zhihu.com/question/23743892

<https://youtu.be/nykOeWgQcHM>: MIT 6.0001

<https://en.wikipedia.org/wiki/Curse_of_knowledge>: Curse of knowledge -- Wikipedia
