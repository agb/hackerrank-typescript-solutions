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
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function pickingNumbers(a: number[]): number {
    a.sort((a, b) => a - b);

    let max = 0;
    let count = 1;
    let currentElement = a[0];

    for (let i = 1; i < a.length; i++) {
        if (Math.abs(a[i] - currentElement) <= 1) {
            count++;
        } else {
            max = Math.max(max, count);
            count = 1;
            currentElement = a[i];
        }
    }
    max = Math.max(max, count);

    return max;
}



function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const a: number[] = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result: number = pickingNumbers(a);

    ws.write(result + '\n');

    ws.end();
}
