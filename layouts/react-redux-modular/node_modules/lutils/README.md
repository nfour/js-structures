# Lutils `lutils`
A few reliable utils. Browser-friendly.

```js
import { typeOf, merge, clone } from 'lutils'
let { typeOf, merge, clone } = require('lutils')

typeOf = require('lutils-typeof')
merge  = require('lutils-merge')
clone  = require('lutils-clone')
```

## API
### `merge`
Recursively merge objects.
See [lutils-merge](https://github.com/nfour/lutils-merge)

### `clone`
Recursively clone objects.
See [lutils-clone](https://github.com/nfour/lutils-clone)

### `typeOf`
Type check for primitives reliably.
See [lutils-typeof](https://github.com/nfour/lutils-typeof)


## Why?
Javascript doesn't need a lot on top of it now that we have ES6/ES7.
Some things are still too hard to do, which is exactly what these utils try to fix.

## Example
Below, a config file, `development.js`, can be composed of multiple files.

```js
import { merge, clone } from 'lutils'

export default merge(
    clone( require('./default') ),
    {
        database: "development",
        server: { port: 1337 }
    }
    clone( require('./local') )
)
/*
    {
        name: "My App",
        database: "development",
        server: {
            host: "0.0.0.0",
            port: 1337,
        },
        ssh: { privateKey: "~/.ssh/myLocalPrivateKey.pem" }
    }
*/
```
The above config would first inherit the default config, overwriting `database` and `server.port`.
`./local`, a git untracked file, would then overwrite aspects specific to the developers machine, such as the `ssh.privateKey`.

Because each config is cloned when required, the file `./default` will not be mutated, even though it is the base.
