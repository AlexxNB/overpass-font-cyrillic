// post.js
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');


const project_file = process.argv[2];
const output_file = process.argv[3];

if(project_file === undefined) process.exit(1);
if(output_file === undefined) process.exit(1);

function saveFile(filename,con){
    fs.writeFileSync(output_file,con);
}

function setupGhostCanvas(){
	_UI.ishereghostctx = createCanvas(1000, 1000).getContext('2d');
}

function setupEditCanvas(){
	_UI.glypheditctx = createCanvas(1000, 1000).getContext('2d');
}


_UI.droppedFileContent = fs.readFileSync(project_file,'utf8');
_UI.ishereghostctx = createCanvas(1000, 1000).getContext('2d');
importGlyphrProjectFromText();
ioSVG_exportSVGfont();