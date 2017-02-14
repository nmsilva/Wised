'use strict';
module.exports = function(grunt) {

  grunt.initConfig({

    dirs: {
      js: 'js',
      css: 'css',
      assets: 'assets/',
    },

    watch: {
      options: {
        livereload: 1234,
      },
      js: {
        files: [
          'Gruntfile.js',
          'js/vendor/**/*.js',
          'js/app/**/*.js'
        ],
        tasks: [ 'uglify' ]
      },
      css: {
        files: [
          'css/sass/**/*.scss',
          'css/sass/*.scss'
        ],
        tasks: [ 'sass', 'concat', 'cssmin' ]
      }
    },

    // uglify to concat, minify, and make source maps
    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [
            'js/vendor/**/*.js',
            'js/app/*.js'
          ],
        }
      }
    },

    sass: {
      dist: {
        files: {
          'css/style.css' : 'css/sass/style.scss'
        }
      }
    },

    concat: {
      dist: {
        files: {
          'css/style.css': [ 
				'css/_styles.css', // theme header
				'css/vendor/**/*.css', // js libs
				'css/style.css' // base
			]
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'style.css': [ 'css/style.css' ]
        }
      }
    },

    cssjanus: {
      theme: {
        options: {
          swapLtrRtlInUrl: false
        },
        files: [
          {
            src: 'style.css',
            dest: 'css/style.min-rtl.css'
          }
        ]
      }
    },

  });

  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-coffee' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-cssjanus' );
  grunt.loadNpmTasks( 'grunt-exec' );

  // register task
  grunt.registerTask('default', ['watch']);

  grunt.registerTask( 'build', [
    'uglify', // JS
    'sass', 'concat', 'cssmin', // CSS
    'cssjanus', // RTL
  ]);
};
