/**
 * @file Compiles Sass
 * @module sass
 */

var fs   = require('fs');
var sass = require('node-sass');

/**
 * Watches directory for changes and compiles Sass.
 * @function watchSass
 * 
 * @param {string} sassDir Directory in which the Sass files are kept.
 * @param {string} cssDir Directory where the compiled CSS will be written.
 */

function watchSass(sassDir, cssDir) {
    fs.watch(sassDir, function(event, filename) {
        if (filename.substr(filename.lastIndexOf('.') + 1) === "scss") {
            var sassFile = sassDir + '/' + filename;
            sass.render({
                file: sassFile,
            }, function(sassErr, result) {
                if(!sassErr) {
                    // Replaces .scss extension with .css
                    var cssFilename = filename.replace('.scss', '.css');
                    
                    var cssFile = cssDir + '/' + cssFilename;
                    fs.writeFile(cssFile, result.css, function(writeErr) {
                        if(!writeErr) {
                            console.log('File ' + sassFile + ' was compiled to ' + cssFile);
                        } else {
                            console.log('There was a problem writing the file! Check to make sure node has proper write permissions.');
                        }
                    });
                } else {
                    if (sassErr.status != 4) {
                        completeErr = 'Sass error ' + sassErr.status + ': ' + sassErr.message + ' in file ' + sassErr.file + ' at line ' + sassErr.line + '\n';
                        logFilename = sassFile + '_err' + new Date().toISOString().substring(0,10) + '.log'; // creates a yyyy-mm-dd timestamp
                        fs.appendFile(logFilename, completeErr, function(errorErr) {
                            if(!errorErr) {
                                console.log("Sass compilation error. Logged to " + logFilename);
                            } else {
                                console.log("There was a Sass compilation error, but the log could not be written. Make sure " + logFilename + " can be written to.");
                            }
                        });
                    }
                }
            });
        }
    });
}

module.exports.watchSass = watchSass;