# Promisify
Wraps callback-based methods in promises

`promisify(func[, context])`  Wraps single function
`func`  <function>  target function
`context`  <object>  context for function


`promisify.all(srcObj)`  Creates proxy-object for wrapping all method calls
`srcObj`  <object>  source object


Example in wrapping single function:
```javascript
const promisify = require('promisify')
promisify(require('fs').readdir)('/some/dir').then().catch()
```

Example in wrapping whole module:
```javascript
const fsPr = require('promisify').all(require('fs'))
fsPr.readdir('/some/dir').then().catch()
```
