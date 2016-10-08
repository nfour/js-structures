function typeOf(value) {
    var type = Object.prototype.toString.call(value)
        .slice(8, -1)
        .toLowerCase()

    if ( type === 'number' && isNaN(value) ) return 'nan'

    return type
}

;[
    'Undefined',
    'Boolean',
    'String',
    'Function',
    'Array',
    'Object',
    'Null',
    'Number',
    'Date',
    'RegExp',
    'NaN',
].forEach(function(key) {
    var lowerKey = key.toLowerCase()

    typeOf[lowerKey] =
    typeOf[key]      = function(value) { return typeOf(value) === lowerKey }
})

module.exports = typeOf
