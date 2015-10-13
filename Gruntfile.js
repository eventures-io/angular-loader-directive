'use strict';

module.exports = function (grunt) {

    /**
     Load grunt plugins
     @toc 2.
     */
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');

    /**
     Function that wraps everything to allow dynamically setting/changing grunt options and config later by grunt task. This init function is called once immediately (for using the default grunt options, config, and setup) and then may be called again AFTER updating grunt (command line) options.
     @toc 3.
     @method init
     */
    function init(params) {
        /**
         Project configuration.
         @toc 5.
         */
        grunt.initConfig({
            concat: {
                devCss: {
                    src: [],
                    dest: []
                }
            },
            sass: {
                dist: {
                    files: {
                       'dist/styles/loader.css' : 'src/scss/loader.scss'
                    }

                }
            },
            jshint: {
                options: {
                    //force:          true,
                    globalstrict: true,
                    //sub:            true,
                    node: true,
                    loopfunc: true,
                    browser: true,
                    devel: true,
                    globals: {
                        angular: false,
                        $: false,
                        moment: false,
                        Pikaday: false,
                        module: false,
                        forge: false
                    }
                },
                beforeconcat: {
                    options: {
                        force: false,
                        ignores: ['**.min.js']
                    },
                    files: {
                        src: []
                    }
                },
                //quick version - will not fail entire grunt process if there are lint errors
                beforeconcatQ: {
                    options: {
                        force: true,
                        ignores: ['**.min.js']
                    },
                    files: {
                        src: ['**.js']
                    }
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                build: {
                    files: {},
                    src: 'src/js/*.js',
                    dest: 'dist/angular-loader.min.js'
                }
            },
            copy: {
                main: {
                    src: 'src/js/loader.js',
                    dest: 'dist/angular-loader.js'
                }
            },
            karma: {
                unit: {
                    configFile: 'karma.conf.js'
                }
            }
        });


        /**
         register/define grunt tasks
         @toc 6.
         */
            // Default task(s).
        grunt.registerTask('default', ['jshint:beforeconcatQ', 'sass', 'uglify:build', 'copy']);

    }

    init({});		//initialize here for defaults (init may be called again later within a task)

    //push github pages: git push -f origin master:gh-pages

};
