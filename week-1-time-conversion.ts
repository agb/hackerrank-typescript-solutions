'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s: string): string {
    
    const isPM = s.match('PM')
    
    return isPM ? pmConversion(s) : amConversion(s)
}

function pmConversion(time:string):string {
    const date = getMilitaryDate(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const newMilitaryHour = hours !== 12 ? hours+12 : 12; 
    const newMilitaryMinutes = minutes.toString().length !== 1 ? minutes : '0'+minutes.toString();
    const newMilitarySecond = seconds.toString().length !== 1 ? seconds : '0'+seconds.toString();
       
    return `${newMilitaryHour}:${newMilitaryMinutes}:${newMilitarySecond}`
} 

function amConversion(time:string):string {
    const date = getMilitaryDate(time);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds();
    
    const newMilitaryHour = hours === 12 ? '00' : hours.toString().length === 1 ? '0'+hours.toString() : hours; 
    const newMilitaryMinutes = minutes.toString().length !== 1 ? minutes : '0'+minutes.toString();
    const newMilitarySecond = seconds.toString().length !== 1 ? seconds : '0'+seconds.toString();
    
    return `${newMilitaryHour}:${newMilitaryMinutes}:${newMilitarySecond}`    
}

function getMilitaryDate(time:string) {
    
    const onlyHours = time.replace(/AM|PM/g,'');
    
    return new Date(`1992/10/10 ${onlyHours}`)
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}
