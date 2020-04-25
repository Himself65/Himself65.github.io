# Never use anonymous

run the script

```cmd
node ./index.js
```

as we can see the output(under `node.js v14.0.0`):

```cmd
function bind: 328.254ms
anonymous function creation: 157.102ms
exist function caller: 153.381ms
anonymous function caller: 141.489ms
```

Conclusion is obviously, 
"function bind" create new function and bind the context to it,
and "anonymous function create" create new function every time but no context, only closure.
"exist function caller", just a normal calling way.
What's more, "anonymous function caller" with no creation every time, and no context.
