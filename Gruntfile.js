module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'willbo118@gmail.com',
                password: 'aHodjRXj11O8yp98HUJ0',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['*.js']
            }
        }
    });
}
