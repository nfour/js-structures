var typeOf = require('lutils-typeof')

/**
 *  Clones an object by iterating over objects and array, re-wrapping them.
 *  Copies over own properties, refrences previous object's __proto__
 *
 *  @param     {mixed}     obj
 *  @param     {Object}    [options]
 *
 *  @return    {mixed}
 */
function clone(obj, options) {
    options       = options || {}
    options.depth = options.depth || 8
    options.types = _castTypes( options.types || { object: true, array: true } )

    return _iterate( _skeletonize(obj, options), obj, options.depth, options )
}

module.exports = clone


//
// Private Functions
//


function _iterate(obj1, obj2, depth, options) {
    if ( --depth <= 0 ) return obj1

    for ( var key in obj2 ) {
        if ( ! obj2.hasOwnProperty(key) ) continue

        var value = obj2[key]
        var type  = typeOf(value)

        if ( type in options.types ) {
            var skeleton = _skeletonize(value, { type: type, types: options.types })
            value = _iterate(skeleton || value, value, depth, options)
        }

        obj1[key] = value
    }

    return obj1
}

function _skeletonize(value, options) {
    var type = options.type || typeOf(value)

    if ( ! ( type in options.types ) ) return null

    switch ( type ) {
        case 'object':
            return value.__proto__
                ? Object.create( value.__proto__ )
                : {}

        case 'array':
            return []

        default:
            return null
    }
}

function _castTypes(types) {
    if ( typeOf.Object( types ) ) return types

    return types.reduce(function(hash, key) { hash[key] = true; return hash }, {})
}
