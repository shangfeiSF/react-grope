var fs = require('fs')
var path = require('path')
var matchdep = require('matchdep')

function makeConfig() {
  var mainDir = path.join(process.cwd(), 'main')

  var config = {
    copy: {},
    clean: {}
  }

  fs.readdirSync(mainDir)
    .filter(function (dir) {
      return fs.statSync(path.join(mainDir, dir)).isDirectory()
    })
    .forEach(function (dir) {
      config.copy[dir] = {
        files: [
          {
            cwd: './main/' + dir,
            src: ['build/*', '*', '!src'],
            dest: './_build_/' + dir,
            expand: true
          },
        ]
      }

      config.clean[dir] = [path.join(mainDir, dir, 'build')]
    })

  return config
}

module.exports = function (grunt) {
  var config = makeConfig()

  grunt.initConfig({
    copy: config.copy,

    clean: config.clean,

    connect: {
      server: {
        options: {
          port: 8080
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:8080/all.html'
      }
    },

    watch: {}
  })

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', ['connect', 'open', 'watch'])

  grunt.registerTask('build', '', function (taskname) {
    grunt.task.run('copy:' + taskname)
  })

  grunt.registerTask('clear', '', function (taskname) {
    grunt.task.run('clean:' + taskname)
  })
}