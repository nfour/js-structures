# merge `lutils-merge`
Merge javascript objects recursively.

`npm install lutils-merge`

## API

`merge`, `merge.white`, `merge.black` supports these patterns:
```js
merge(obj1, obj2, obj3, ...)
merge([obj1, obj2, obj3, ...], options)
merge([obj1, obj2, obj3, ...], ({ key }) => key !== 'keyIReallyDontWant' )
merge([obj1, obj2, obj3, ...], options, ({ key }) => key !== 'keyIReallyDontWant' )
```

### `merge([target], [object], [...[object]])`
Merges all objects into first object.

```js
const obj1 = { a: 1, b: { c: 1 }, e: 3 }
const obj2 = { a: 2, b: { d: 2 } }
const obj3 = { e: () => {} }

// Merges objects obj2 then obj3 into obj1
merge(obj1, obj2, obj3)
/*
	{
		a: 2,
		b: { c: 1, d: 2 },
		e: () => {}
	}
*/

// Use options to customize merge behaviour.
// The first argument is an array of objects,
// and the second is the options object.
merge([
	{ a: { c: 1 } },
	{
		a: { b: 2 },
		d: 1
	}
], { depth: 1 })
/*
	{
		a: { b: 2 },
		d: 1
	}
*/
```

### `merge.white()`
Merges all objects into first object only if there **is** a key match.

```js
merge.white(
	{ a: 1 },
	{
		a: 2,
		b: 2
	}
)
/*
	{ a: 2 }
*/
```

### `merge.black()`
Merges all objects into first object only if there **isn't** a key match.

```js
merge.black(
	{ a: 1 },
	{ a: 2, b: 2 }
)
/*
	{ a: 1, b: 2 }
*/
```

## Advanced usage

### Options
```js
{
	// Decremented with each recursion for each nested object, halting the merge at 0
	depth: 8,

	// Determines whether recursing will occur. When this type matches, it will be iterated over.
	types: { object: true, array: true }
	types: [ "object", "array" ] // Can also be an array of type strings

	// See "Test functions" below
	test: function(params) {}
}
```

### Test Functions
When merging, a test function can be specified in two ways:

```js
merge([obj1, obj2], () => {})
merge([obj1, obj2], { test: () => {} })
```

The test function is supplied paramaters for each iteration through the merge.
```js
merge([obj1, obj2], (params) => {
	params.iterated // The object being iterated over
	params.key // The key being iterated over in `interated`
	params.obj1 // The object being mutated
	params.obj2 // The object supplying mutations
	params.depth // Current depth
	params.options // Initially supplied/generated options
	params.recursing // When `true`, this function determines whether to recurse down another level
	params.assigning // When `true`, this function determines whether a value will be assigned to `obj1`

	// `recursing` and `assigning` are mutally exclusive
})

```

For example; `merge.white` is defined with this test function:
```js
function(params) {
	if ( params.recursing ) return true

	return params.key in params.obj2
}
```
