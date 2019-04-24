const fs = require("fs");
const path = require("path");
const sh = require("shelljs");
const {check_dependency} = require("../_helpers");

const dir = path.resolve(__dirname);
const libfile = path.join(dir,'glyphrlib.js')

const download = () => {
    const repo = 'glyphr-studio/Glyphr-Studio-1';

    const repodir = path.join(dir,'__glyphr');
    const jsdir = path.join(repodir,'dev','js');

    const files = [
        '_pre.js',
        '_settings.js',
        '_functions.js',
        'obj_glyphrproject.js',
        'obj_guide.js',
        'obj_glyph.js',
        'obj_shape.js',
        'obj_path.js',
        'obj_pathpoint.js',
        'obj_segment.js',
        'obj_hkern.js',
        'obj_polysegment.js',
        'io_glyphr_studio_project_import.js',
        'io_svg_font_export.js',
        'io_otf_export.js',
        'page_fontsettings.js',
        'page_ligatures.js',
        'framework_history.js',
        'framework_edit_canvas.js',
        'framework_unicode.js',
        '_post.js',
    ];

    check_dependency('git');

    sh.rm('-rf',repodir);
    sh.exec(`git clone --depth=1 --single-branch --progress https://github.com/${repo}.git ${dir}/__glyphr`);
    sh.cp(`${dir}/_*.js`,jsdir);

    let libsource = files.reduce((content,item)=>{
        
        return content + fs.readFileSync(path.join(jsdir,item),'utf8');
    },'');

    sh.rm('-rf',libfile);
    fs.writeFileSync(libfile,libsource);
    sh.rm('-rf',repodir);
}

module.exports = download