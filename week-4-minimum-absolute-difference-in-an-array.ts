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
 * Complete the 'minimumAbsoluteDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */


function minimumAbsoluteDifference(arr: number[]): number {
    
    const clonedArray = [...arr].sort((a,b) => a-b);
    let minimum = clonedArray[clonedArray.length-1] - clonedArray[clonedArray.length-2] 
    while(clonedArray.length > 1) {
        
        const current = clonedArray[0];
        const next = clonedArray[1];
        const abs = Math.abs(current - next);
        
        if(minimum > abs) 
            minimum = abs;

        clonedArray.shift();
    }
    
    return minimum
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result: number = minimumAbsoluteDifference(arr);

    ws.write(result + '\n');

    ws.end();
}
