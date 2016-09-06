module.exports = function () {
    var src = './source/',
        pub = './public/',
        ven = './vendors/',
        npm = './node_modules/',
        config = {
            /**
             * Files paths
             */
            srcTemplates: src + 'html/**/*.html',
            pubTemplates: pub,

            srcStyles: src + 'styles/styles.scss',
            pubStyles: pub + 'styles/',

            srcScripts: src + 'scripts/**/*.js',
            pubScripts: pub + 'scripts/',

            srcImages: src + 'assets/images/*',
            pubImages: pub + 'assets/images/',

            srcFavicon: src + 'favicon.ico',
            pubFavicon: pub,

            srcFonts: src + 'assets/fonts/**/*.{ttf,woff,eof,svg}',
            pubFonts: pub + 'assets/fonts/',

            srcSvgFont: src + 'assets/images/svg/*.svg',
            srcSvgFontStyle: src + '../../../../../vendors/fonts/font-icon/_font-icons.scss',
            pubSvgFont: pub + 'assets/fonts/icon-fonts',

            srcVendors: [
                npm + 'jquery/dist/jquery.min.js',
                npm + 'bootstrap/dist/js/bootstrap.min.js',
                npm + 'gsap/src/minified/TweenMax.min.js',
                ven + 'modernizr-custom.js',
                ven + 'ie-support.min.js'
            ],
            pubVendors: pub + 'scripts/'

        };

    return config;
};
