// Gruntfile.js
module.exports = (grunt) => {
	// Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		dirs: {
			dest: "dest",
			scss: "scss",
			js: "js",
		},

		// minify / uglify js
		uglify: {
			my_target: {
				files: {
					"<%= dirs.dest %>/jsmain.min.js": ["<%= dirs.js %>/libs/*.js"],
				},
			},
		},
		sass: {
			dist: {
				options: {
					style: "compressed",
					sourcemap: false,
					lineNumbers: true,
				},
				files: {
					"<%= dirs.dest %>/style.min.css": "<%= dirs.scss %>/style.scss",
				},
			},
		},

		watch: {
			options: {
				livereload: true,
				spawn: false,
			},
			sass: {
				files: "<%= dirs.scss %>/**/*.scss",
				tasks: ["sass"],
			},
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						"<%= dirs.dest %>/style.min.css",
						"*.html",
						"<%= dirs.dest %>/*.js",
					],
				},
				options: {
					watchTask: true,
					server: "./",
				},
			},
		},
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-browser-sync");
	grunt.registerTask("default", ["browserSync", "watch"]);
};
