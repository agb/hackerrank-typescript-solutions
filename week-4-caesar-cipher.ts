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
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s: string, k: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const key = k % alphabet.length;
    let cipher = ''
    
    for(let char of s.split('')) {

        let newChar = char;
        const index = alphabet.indexOf(newChar.toLowerCase())

        if(index !== -1) {
            const isUpperCase = char.toUpperCase() === char;
            const crypted = alphabet[(key+index)%alphabet.length]
            
            cipher += isUpperCase ? crypted.toUpperCase() : crypted; 
            
        } else cipher = cipher + newChar; 
    }

    return cipher;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const s: string = readLine();

    const k: number = parseInt(readLine().trim(), 10);

    const result: string = caesarCipher(s, k);

    ws.write(result + '\n');

    ws.end();
}
