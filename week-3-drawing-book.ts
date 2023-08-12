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

function whichSide(n: number, p: number): 'front' | 'back' {
    
    const half = Math.floor(n/2);
    
    if(p <= half) return 'front'
    else return 'back'
}

/*
 * Complete the 'pageCount' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER p
 */

function pageCount(n: number, p: number): number {
    
    if(p === 0 || p+1 > n || (p ===1 && n === 2)) return 0;
    else if (p+1 === n && p%2===1) return 1;
    
    const isStartFrontSide = whichSide(n,p) === 'front' ? true : false
    
    return isStartFrontSide ? Math.floor(p/2) : Math.floor((n-p)/2)
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const p: number = parseInt(readLine().trim(), 10);

    const result: number = pageCount(n, p);

    ws.write(result + '\n');

    ws.end();
}
