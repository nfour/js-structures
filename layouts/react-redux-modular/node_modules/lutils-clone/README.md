# clone `lutils-clone`
Reliably and recursively clone javascript objects

`npm install lutils-clone`

## API

### `clone([mixed], [[options]])`
Clones an object, recursively.


```js
import clone from 'lutils-clone'

const test = new class Test {}

const obj = {
    a  : { b: 2 },
    fn : function() {}
    test,
}

const newObj = clone(obj)

newObj.a.b = 5

obj.a.b               // 2
newObj.a === obj.a    // false
newObj.test === test  // false
newObj.test.__proto__ === test.__proto__ // true
newObj.fn === obj.fn  // true
```

## Advanced usage

### Options
```js
{
    // Decremented with each recursion for each nested object, halting the clone at 0
    // A halted clone will preserve references to any remaining values
    depth: 8,

    // Determines whether recursing will occur. When this type matches, it will be iterated over.
    types: { object: true, array: true }
    types: [ "object", "array" ] // Can also be an array of type strings
}
```
