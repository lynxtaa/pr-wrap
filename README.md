# promisify
Wraps callback-based methods in promises

Example in wrapping single function:
```javascript 
promisify(require('fs').readdir)('/some/dir').then().catch()
```
Example in using proxy-object for wrapping all method calls:
```javascript
const fsPr = promisify.all(require('fs'))
fsPr.readdir('/some/dir').then().catch()
```
