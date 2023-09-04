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
 * Complete the 'maxMin' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function maxMin(k: number, arr: number[]): number {
    
    const sortedArray = [...arr].sort((a,b) => a-b);
    const kMinusOne = k -1;
    let minimumUnfairness = sortedArray[k] - sortedArray[0];

    for(let i =0;i<sortedArray.length - kMinusOne; i++) {
        const minimumEl = sortedArray[i];
        const maximumEl = sortedArray[i + kMinusOne];
        const diff = (maximumEl-minimumEl);
        
        if(minimumUnfairness >  diff)
            minimumUnfairness = diff
    }
    
    return minimumUnfairness;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const k: number = parseInt(readLine().trim(), 10);

    let arr: number[] = [];

    for (let i: number = 0; i < n; i++) {
        const arrItem: number = parseInt(readLine().trim(), 10);

        arr.push(arrItem);
    }

    const result: number = maxMin(k, arr);

    ws.write(result + '\n');

    ws.end();
}
