const autoprefixer = require( 'autoprefixer' );
const cssmqpacker  = require( 'css-mqpacker' );

module.exports = {
    map: false,
    plugins: [
        ["postcss-preset-env"],
        autoprefixer(),
        cssmqpacker({ sort: true })
    ]
};