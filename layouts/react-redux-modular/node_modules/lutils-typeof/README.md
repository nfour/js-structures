# typeOf `lutils-typeof`
Reliable type checks for javascript primitives

`npm install lutils-typeof`


```js
import typeOf from "lutils-typeof"

// Returns a string
typeOf({}) // "object"
typeOf(5000) // "number"
typeOf(NaN) // "nan"

// Returns a boolean
typeOf.Object({}) // true
typeOf.Object(null) // false
typeOf.Boolean(false) // true
typeOf.String("string") // true
typeOf.Function(typeOf) // true
typeOf.Array([]) // true
typeOf.Number(600) // true
typeOf.Number(Infinity) // true
typeOf.Date(new Date()) // true
typeOf.RegExp(/test/i) // true
typeOf.NaN(NaN) // true

typeOf.null(null) // true
typeOf.Null(null) // true
typeOf.undefined(undefined) // true
typeOf.Undefined(undefined) // true
```
