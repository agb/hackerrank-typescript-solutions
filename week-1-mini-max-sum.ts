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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr: number[]): void {
    
    const sortedArray = arr.sort((a,b) => a-b)
    
    console.log(`${minimumSum(sortedArray,4)} ${maximumSum(sortedArray,4)}`)
}

function minimumSum(array:number[],howMany:number):number {
    const start = 0;
    const end = howMany
        
    const newArray = array.slice(start,end)
    return newArray.reduce((prev,current)=>prev+current,0)
}

function maximumSum(array:number[],howMany:number):number {
        const end = array.length
        const start = end-howMany;
        
        const newArray = array.slice(start,end)
        return newArray.reduce((prev,current)=>prev+current,0)
}

function main() {

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
