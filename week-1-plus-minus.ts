'use strict';

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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr: number[]): void {
    
   const nonDuplicateArray = arr.filter(value => arr.indexOf(value) !== -1 ); 
   
   let ratio = {
       positive: '',
       negative: '',
       zero: ''
   }
   
    ratio.positive = decimalView(nonDuplicateArray.filter ( value => value > 0).length,arr.length)
    ratio.negative = decimalView(nonDuplicateArray.filter ( value => value < 0).length,arr.length)
    ratio.zero = decimalView(nonDuplicateArray.filter ( value => value === 0).length,arr.length)

    console.log(ratio.positive)
    console.log(ratio.negative)
    console.log(ratio.zero)
    
}

function decimalView(numerator:number,denominator:number):string {
    return (numerator/denominator).toFixed(6).toString()
}

function main() {
    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
