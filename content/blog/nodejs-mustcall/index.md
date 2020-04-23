---
title: Node.js调试利器 ———— mustCall
tags: ["code", "nodejs"]
date: "2020-04-06"
---

如果你稍微看一下 `Node.js` 官方项目的测试文件，你会发现一个很好用的断言函数。

例如
[node/test/parallel/test-worker-dns-terminate.js](https://github.com/nodejs/node/blob/ed24c19002379063ce100037bfff7ca2da5b6cc8/test/parallel/test-worker-dns-terminate.js) 中

```js
const common = require('../common');
const { Worker } = require('worker_threads');

const w = new Worker(`
const dns = require('dns');
dns.lookup('nonexistent.org', () => {});
require('worker_threads').parentPort.postMessage('0');
`, { eval: true });

w.on('message', common.mustCall(() => {
  // This should not crash the worker during a DNS request.
  w.terminate().then(common.mustCall());
}));
```

`common.mustCall` 保证了封装的函数一定会被调用

当然实现也很简单，就是在 `process` 的 `exit` 事件后检测所有被绑定的函数

一个简单的实现

```js
const checks = []
exports.mustCall = function(fn, expect = 1) {
    const context ={
        expect,
        actual: 0,
        fn
    })
    checks.push(context)
    return (...args) => {
        context.actual++;
        return fn.apply(this, args);
    }
}

process.on('exit', () => {
    checks.forEach(context => {
        if (context.expect !== actual) {
            // do something
        }
    })
})
```

## [Porting common.mustCall to assert](https://github.com/nodejs/node/pull/31982)

即将登录的这个PR，更加抽象了 `mustCall` 函数，加入了 `CallTracker` 类来方便用户进行断言操作

```js
const assert = require('assert');
// Creates call tracker.
const tracker = new assert.CallTracker();
function func() {}
// Returns a function that wraps func() that must be called exact times
// before tracker.verify().
const callsfunc = tracker.calls(func, 2);
callsfunc();
// Will throw an error since callsfunc() was only called once.
tracker.verify();
```

当然，我们可以扩展此类，拓展出各种操作，比如 `mustThrow`, `mustReturn` 等操作
