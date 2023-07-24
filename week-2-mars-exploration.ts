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
 * Complete the 'marsExploration' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function marsExploration(message: string): number {

    const groups = message.match(/.{1,3}/g);
    let changedLetters = 0; 
    
    for(let group of groups) {
        if(group[0] !== 'S')  changedLetters++;
        if(group[1] !== 'O')  changedLetters++;
        if(group[2] !== 'S')  changedLetters++;
    }
    
    return changedLetters;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: number = marsExploration(s);

    ws.write(result + '\n');

    ws.end();
}
