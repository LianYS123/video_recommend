const fse = require('fs-extra');

fse.ensureDir('./file').then(()=>{
    fse.writeFile('./file/test.txt','hello');
});

