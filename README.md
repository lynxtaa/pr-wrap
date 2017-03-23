# Promisify
Wraps callback-based methods in promises and uses [ES6 Proxy](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for wrapping entire modules.

Install
--------
`npm install https://github.com/lynxtaa/promisify.git --save`

Syntax
--------
Wraps single function:
```javascript
require('promisify')(func[, context])
```

- `func`  *`<function>`*  target function

- `context`  *`<object>`*  context for function

Creates proxy-object for wrapping all method calls:
```javascript
require('promisify').all(srcObj)
```

- `srcObj`  *`<object>`*  source object

Usage
--------
Wrapping single function:
```javascript
const promisify = require('promisify')
promisify(require('fs').readdir)('/some/dir').then().catch()
```

Wrapping whole module:
```javascript
const fsPr = require('promisify').all(require('fs'))
fsPr.readdir('/some/dir').then().catch()
```
