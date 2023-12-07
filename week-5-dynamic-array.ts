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

function dynamicArray(n: number, queries: number[][]): number[] {
  let result: number[] = [];
  let arr: number[][] = Array.from({ length: n }, () => []);
  let lastAnswer = 0;

  for (let query of queries) {
      const [type, x, y] = query;
      const idx = xor(x, lastAnswer) % n;

      switch (type) {
          case 1:
              arr[idx].push(y);
              break;
          case 2:
              lastAnswer = arr[idx][y % arr[idx].length];
              result.push(lastAnswer);
              break;
      }
  }

  return result;
}

function xor(a: number, b: number): number {
  return a ^ b;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const q: number = parseInt(firstMultipleInput[1], 10);

    let queries: number[][] = Array(q);

    for (let i: number = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result: number[] = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
