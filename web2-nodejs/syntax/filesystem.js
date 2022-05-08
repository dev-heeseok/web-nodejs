var fs = require('fs');

console.log(__dirname + '/file/HTML');

fs.readFile('file/HTML', 'utf8', function(err, data) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(data);        
    }
    
});