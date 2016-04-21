module.exports = function( grunt )
{
    grunt.initConfig(
    {
        bower:
        {
            dev:
            {
                dest: 'lib/'
            }
        },

        browserify:
        {
            dev:
            {
                files:{
                    'www/scripts/game.js': ['.tmp/babel/scripts/scripts/**/**/**.js']
                }
            }
        },

        babel:{
            options:{
                sourceMap:true,
                "plugins": ["transform-es2015-arrow-functions"]
            },
            dev:{
                files:[{
                    expand:true,
                    cwd:'client/scripts/',
                    src:['**/**.js'],
                    dest:'.tmp/babel/scripts/scripts/',
                    ext:'.js'
                }]
            }
        },

        concat:{
            options: {
                separator: ';',
            },
            dev:{
                src:['lib/**/*.js'],
                dest:'www/scripts/libs.js'
            },
            template:{
                src:['client/templates/*.html'],
                dest:'www/templates/template.html',
                options: {
                    separator: '\n\n'
                }
            },
            css:{
                src:['client/styles/*.css'],
                dest:'www/styles/styles.css',
                options: {
                    separator: '\n\n'
                }
            }
        },

        copy:
        {
            dev:{
                files:{

                    'www/index.html':'client/index.html',
                    'www/scripts/google-maps.js':'vendor/google-maps.js',
                    'www/scripts/cordova.js':'vendor/cordova.js',
                    'www/':'images/**'
                }
            }
        },

        watch:
        {
            scripts:
            {
                files: ['client/scripts/**/**.js'],
                tasks: [ 'build'],
                options:
                {
                    livereload: true
                }
            },

            template:
            {
                files: ['client/templates/**.html'],
                tasks: [ 'concat:template'],
                options:
                {
                    livereload: true
                }
            },

            html:
            {
                files: ['client/**.html'],
                tasks: [ 'copy'],
                options:
                {
                    livereload: true
                }
            },

            css:
            {
                files: ['client/styles/**.css'],
                tasks: [ 'concat:css'],
                options:
                {
                    livereload: true
                }
            }
        },

        connect:
        {
            server:
            {
                options:
                {
                    host:'*',
                    port: 3000,
                    base: 'www',
                    livereload: true
                }
            }
        },

        clean:{
            dev:{
                src:['www','.tmp']
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-bower' );
    grunt.loadNpmTasks( 'grunt-browserify' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-babel' );

    grunt.registerTask( 'build', [ 'clean:dev','bower','babel:dev','browserify:dev','concat','copy'] );
    grunt.registerTask( 'serve', [ 'build','connect:server','watch' ] );
}
