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

function decimalTo32BitsBinary(n:number): string {
    const initial = "00000000000000000000000000000000";
    const binary = n.toString(2);
    
    const output = initial.slice(0,initial.length-binary.length)+binary
    
    return output;
}


/*
 * Complete the 'flippingBits' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER n as parameter.
 */

function flippingBits(n: number): number {

    const stringVersionOfNumberValue = decimalTo32BitsBinary(n);
    let invertFlippedBit =''
    let flippedBitsToTenBasedNumber:number = 0;

    stringVersionOfNumberValue.split("").forEach( (value,index) => {
        const flippedBit:number = value === '1' ? 0 : 1;
        invertFlippedBit += flippedBit
        flippedBitsToTenBasedNumber += Math.pow((flippedBit),10*index)
    })
    
    return parseInt(invertFlippedBit,2)
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        const result: number = flippingBits(n);

        ws.write(result + '\n');
    }

    ws.end();
}
