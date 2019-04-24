const fs = require("fs");
const sh = require("shelljs");
const path = require("path");
const {root} = require("./_helpers.js");
const glyphr = require("./glyphr");

sh.rm('-rf',path.join(root,'__fonts'));


const fontfiles = fs.readdirSync(path.join(root,'src')).filter(item => item.endsWith('.txt'));

sh.mkdir('-p',path.join(root,'__fonts'));
fontfiles.map(file => {
    let project_file = path.join(root,'src',file);
    let output_file = path.join(root,'__fonts',file.replace('.txt','.svg'));

    console.log(`Building ${file}...`);

    glyphr.export_svgfont(project_file,output_file);
});

