const sh = require('shelljs');
const path = require("path");

const root =  path.resolve(path.dirname(path.dirname(__dirname)));


const check_dependency = (binary) => {
    if (!sh.which(binary)) {
        error(`Sorry, this script requires ${binary}`);
    }
}

const error = (msg,exit=true) => {
    console.log("ERROR: "+msg);
    if(exit) {
        sh.exit(1);
    } 
}


module.exports = {
    root,
    check_dependency,
    error
}