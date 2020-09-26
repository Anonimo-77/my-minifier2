const prompt = require('prompt');
const fs = require('fs');
const path = require('path');

function onErr(err) {
    console.log(err);
    return 1;
}

prompt.start();

var minifier = {};

minifier.minify = () => {
    prompt.get(['entry_file'], function (err, result) {
        if (err) { return onErr(err); }
        if (fs.existsSync(result.entry_file)) {
                fs.readFile(result.entry_file, 'utf8',(err,data) => {
                    if (err) { return onErr(err) }
                    let res = data.split('\r\n').join(' ')
                    let name = path.basename(result.entry_file);
                    let newPath = result.entry_file.replace(name,name.substr(0,name.indexOf(path.extname(result.entry_file)))+'.min'+path.extname(result.entry_file));
                    fs.writeFile(newPath, res, 'utf8', (err) => {
                        if (err) { return onErr(err) }
                        console.log('minified');
                    })
                    
                })
        }
    });
}


module.exports = minifier;