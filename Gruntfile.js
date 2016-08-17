var matchdep = require('matchdep')

var options = {
  port: 8080
}

module.exports = function (grunt) {
  grunt.initConfig({
    options: options,

    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: options.port
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= options.port %>/all.html'
      }
    },

    watch: {}
  })

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', ['connect', 'open', 'watch'])
}