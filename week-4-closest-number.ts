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
 * Complete the 'closestNumbers' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function closestNumbers(arr: number[]): number[] {
    const sortedArray: number[] = arr.sort((a,b)=>a-b);
    let diff = arr[1] - arr[0];
    let closestPairs = [sortedArray[0], sortedArray[1]];
    
    do {
        const current = sortedArray[0];
        const next    = sortedArray[1];

        if (next - current < diff) {
            closestPairs = [current, next];
            diff = next - current;
        } else if (next - current === diff) 
            closestPairs = [...closestPairs, current, next];
        
       sortedArray.shift();
    }
    while (sortedArray.length > 0) 
    
    return closestPairs;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result: number[] = closestNumbers(arr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
