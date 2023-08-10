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

function isValidTriangle(a: number, b: number, c: number): boolean {

    if (b + c > a && a + c > b && a + b > c) return true;

    return false
}

/*
 * Complete the 'maximumPerimeterTriangle' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY sticks as parameter.
 */

function maximumPerimeterTriangle(sticks: number[]): number[] {
    sticks.sort((a, b) => b - a);

    const validTriangles:
        | {
              a: number;
              b: number;
              c: number;
              total: number;
          }[]
        | undefined = [];

    let keySticks = sticks;
    let bigOne = 0;

    while (keySticks.length >= 3) {
        const a = keySticks[0];
        keySticks.shift();

        for (let i = 0; i < keySticks.length; i++) {
            const b = keySticks[i];

            for (let t = 1; t < keySticks.length; t++) {
                const c = keySticks[t];

                const total = a + b + c;

                if (total >= bigOne)
                    if (isValidTriangle(a, b, c)) {
                        const lastValidTotal = validTriangles.length
                            ? validTriangles[validTriangles.length - 1].total
                            : 0;
                        bigOne = total;

                        if (total >= lastValidTotal)
                            validTriangles.push({
                                a,
                                b,
                                c,
                                total,
                            });
                    }
            }
        }
    }

    const bigBosses = validTriangles.filter(
        (triangle) => triangle.total === bigOne
    );


    if (bigBosses.length > 0) {
            if (bigBosses.length === 1)
                return [bigBosses[0].a, bigBosses[0].b, bigBosses[0].c].sort(
                    (a, b) => a - b
                );

            let minimumSide = 0;
            let minimumSideIndex = 0;

            for (let i = 0; i < bigBosses.length; i++) {
                const minimum = [
                    bigBosses[i].a,
                    bigBosses[i].b,
                    bigBosses[i].c,
                ].filter((a, b) => a - b)[0];
                if (minimumSide > minimum) {
                    minimumSide = minimum;
                    minimumSideIndex = i;
                }
            }

            return [
                bigBosses[minimumSideIndex].a,
                bigBosses[minimumSideIndex].b,
                bigBosses[minimumSideIndex].c,
            ].sort((a, b) => a - b);
    } else return [-1];
}


function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const sticks: number[] = readLine().replace(/\s+$/g, '').split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    const result: number[] = maximumPerimeterTriangle(sticks);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
