const chalk = require('chalk');
const { inspect } = require('util')
let typename;
let bgColor;
let textColor;
let timeStr;
let INFO = (text) => { let newText = chalk.bgCyan(text); return chalk.black(newText); };
let DEBUG = (text) => { let newText = chalk.bgGreenBright(text); return chalk.black(newText); };
let WARN = (text) => { let newText = chalk.bgYellowBright(text); return chalk.black(newText); };
let ERROR = (text) => { let newText = chalk.bgRedBright(text); return chalk.black(newText); };
let VERBOSE = (text) => { let newText = chalk.bgWhite(text); return chalk.black(newText); };
/**
 * @param {string} args String or object to log to console!
 * @param {{name:string,bgColor:string,textColor:string}} type type of log.
 * @param {Boolean} showTime Boolean to show time and date of log. Ex: [ 4-25-20 - 07:00 ] (defaults to false.)
 */
exports.log = (args, type, showTime) => {
    if(showTime){
        let date = new Date();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes()
        if(month < 10)month = `0${month}`
        if(day < 10)day = `0${day}`
        if(hour < 10)hour = `0${hour}`
        if(minute < 10)minute = `0${minute}`
        timeStr = `[ ${month}-${day}-${year} - ${hour}:${minute} ]`
    }
    if(typeof args === 'object')args = inspect(args, {showHidden:true});
    if(typeof type === 'object'){
        if(type.name)typename = type.name;
        if(typename.length > 7)return this.log(`Length of type name is > 7 characters!`, 'ERROR');
        if(type.bgColor)bgColor = type.bgColor;
        if(type.textColor)textColor = type.textColor;
        let CUSTOM = (text) => { let newText = chalk.bgHex(bgColor)(text); return chalk.hex(textColor)(newText) }
        if(typeof args === 'string')args = args.replace(/[\r\n]+/g, `\n${INFO('[INFO]'.padEnd(9, " "))} `);
        if(showTime){
                console.log(`${timeStr} ${CUSTOM(` ${typename} `.padEnd(9, " "))} ${args}`);
            }else{    
        console.log(`${CUSTOM(` ${typename} `.padEnd(9, " "))} ${args}`);
        }    
        return;
    }else {
    switch(type){
        case 'INFO':{
            if(typeof args === 'string')args = args.replace(/[\r\n]+/g, `\n${INFO('[INFO]'.padEnd(9, " "))} `);
            if(showTime){
                console.log(`${timeStr} ${INFO('[INFO]'.padEnd(9, " "))} ${args}`);
            }else{
            console.log(`${INFO('[INFO]'.padEnd(9, " "))} ${args}`);
            }
            return;
        }
        case 'DEBUG':{
            if(typeof args === 'string')args = args.replace(/[\r\n]+/g, `\n${DEBUG('[DEBUG]'.padEnd(9, " "))} `);
            if(showTime){
                console.log(`${timeStr} ${DEBUG('[DEBUG]'.padEnd(9, " "))} ${args}`);
            }else{
            console.log(`${DEBUG('[DEBUG]'.padEnd(9, " "))} ${args}`);
            }
            return;
        }
        case 'WARN':{
            if(typeof args === 'string')args = args.replace(/[\r\n]+/g, `\n${WARN('[WARN]'.padEnd(9, " "))} `);
            if(showTime){
                console.log(`${timeStr} ${WARN('[WARN]'.padEnd(9, " "))} ${args}`);
            }else{
            console.log(`${WARN('[WARN]'.padEnd(9, " "))} ${args}`);
            }
            return;
        }
        case 'ERROR':{
            if(typeof args === 'string')args = args.replace(/[\r\n]+/g, `\n${ERROR('[ERROR]'.padEnd(9, " "))} `);
            if(showTime){
                console.log(`${timeStr} ${ERROR('[ERROR]'.padEnd(9, " "))} ${args}`);
            }else{
            console.log(`${ERROR('[ERROR]'.padEnd(9, " "))} ${args}`);
            }
            return;
        }
        default: {
            if(typeof args === 'string')args = args.replace(/[\r\n]+/g, `\n${VERBOSE('[VERBOSE]'.padEnd(9, " "))} `);
            if(showTime){
                console.log(`${timeStr} ${VERBOSE('[VERBOSE]'.padEnd(9, " "))} ${args}`);
            }else{
            console.log(`${VERBOSE('[VERBOSE]'.padEnd(9, " "))} ${args}`);
            }
            return;
        };
    }
}
}
