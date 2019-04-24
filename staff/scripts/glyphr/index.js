const fs = require("fs");
const path = require("path");
const sh = require("shelljs");
const {root,check_dependency} = require("../_helpers");
const download = require("./download");

const dir = path.resolve(__dirname);
const libfile = path.join(dir,'glyphrlib.js')

const export_svgfont = (project_file,font_file) => {
    if(!fs.existsSync(libfile)){
        download();
    }
    sh.exec(`node ${libfile} ${project_file} ${font_file}`);
}


module.exports = {
    export_svgfont    
}