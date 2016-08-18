var fs = require('fs')
var path = require('path')
var matchdep = require('matchdep')

var options = {
  port: 8080
}

function makeClean() {
  var mainDir = path.join(process.cwd(), 'main')

  var clean = []

  fs.readdirSync(mainDir)
    .filter(function (dir) {
      return fs.statSync(path.join(mainDir, dir)).isDirectory()
    })
    .forEach(function (dir) {
      var dir = path.join(mainDir, dir, 'build')
      clean.push(dir)
    })

  return clean
}

module.exports = function (grunt) {
  grunt.initConfig({
    options: options,

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      files: [
        {
          cwd: './main',
          src: '**/*',
          dest: './_build_',
          expand: true
        },
      ]
    },

    clean: makeClean(),

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
  grunt.registerTask('build', ['copy'])
  grunt.registerTask('clear', ['clean'])

}