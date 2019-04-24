const fs = require("fs");
const sh = require("shelljs");
const path = require("path");
const {root} = require("./_helpers.js");
const glyphr = require("./glyphr");
const svg2ttf = require('svg2ttf');

const fontsdir = path.join(root,'__fonts');

sh.rm('-rf',fontsdir);
sh.mkdir('-p',fontsdir);

// Generating SVG fonts
const projects = fs.readdirSync(path.join(root,'src')).filter(item => item.endsWith('.txt'));
projects.map(file => {
    let project_file = path.join(root,'src',file);
    let output_file = path.join(fontsdir,file.replace('.txt','.svg'));

    console.log(`Building SVG font from ${file}...`);

    glyphr.export_svgfont(project_file,output_file);
});

// Generating TTF fonts from SVG fonts
const svgfiles = fs.readdirSync(fontsdir).filter(item => item.endsWith('.svg'));
svgfiles.map(file => {
    let svg_file = path.join(fontsdir,file);
    let ttf_file = path.join(fontsdir,file.replace('.svg','.ttf'));

    console.log(`Building TTF font from ${file}...`);
    let ttf = svg2ttf(fs.readFileSync(svg_file, 'utf8'), {});
    fs.writeFileSync(ttf_file, Buffer.from(ttf.buffer));
});