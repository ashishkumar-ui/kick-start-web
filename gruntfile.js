module.exports = function (grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		jshint : {
			options : {
				jshintrc : '.jshintrc'
			},
			build : {
				src : ['Content/scripts/modules/*.js']
			}
		},
		uglify : {
			/*options: {
			mangle: true,
			compress:true,
			beautify:false
			},*/
			vendor : {
				files : {
					'Content/scripts/vendor/backbone-marionette.js' : ['Content/scripts/vendor/backbone-min.js', 'Content/scripts/vendor/backbone.marionette.min.js']
				}
			},
			module : {
				files : [{
						expand : true,
						cwd : 'Content/scripts/modules',
						src : '*.js',
						dest : 'Content/scripts/modules-min'
					}
				]
			}
		},
		watch : {
			jsmin : {
				files : ['Content/scripts/modules/*.js'],
				tasks : ['uglify:module']
			},
			options : {
				atBegin : true,
				livereload : false
			}
		},
		sloc : {
			options : {
				reportType : 'json',
				reportPath : 'Content/scripts/sloc-report.json',
			},
			files : {
				'path/to/target' : ['Content/scripts/modules/*.js'],
				'path/to/others' : ['*.java', '*.coffee']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sloc');

	grunt.registerTask('default', ['uglify:module']);

	grunt.registerMultiTask('build', 'Build both JS and CSS targets or specified only.', function () {
		if (this.data && this.data.length) {
			grunt.task.run(this.data);
		}
	});
};
