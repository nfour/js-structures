### `1.2.0` August 7th 2016
- Version bumps

### `1.0.1` April 23rd 2016
- Tidy up
- Constrain versions

### `1.0.0`
- Rebuilt lutils, splitting each function off
	- `lutils-typeof`
	- `lutils-merge`
	- `lutils-clone`
	- `lutils` simply exposes all three
- Converted to ES5 from CoffeeScript
- Refactored API to be more flexible and consitant with similar utilities, such as underscore
	- `merge`, `merge.whtie`, `merge.black`
		- `merge(obj1, obj2, obj3, ...)`
		- `merge(obj1, obj2, obj3, ..., function() {})`
		- `merge([obj1, obj2, obj3, ...], options)`
	- `merge` now supports test functions for custom merging
	- `clone`
		- `clone(obj, options)`
	- `typeOf` reamins the same
	- See each modules readme for precise api

### `0.2.10`
- Fixed `depth` being compared one unit too low.

### `0.2.7`
- Fixed an `{}.__proto__` mutation bug. `clone` is now significantly faster.
