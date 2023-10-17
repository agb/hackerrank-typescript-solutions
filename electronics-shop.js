'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the getMoneySpent function below.
 */
function getMoneySpent(keyboards, drives, budget) {
    const sortedKeyboards = keyboards.sort((a,b) => b-a);
    const sortedDrives = drives.sort((a,b)=>b-a);
    
    let max = 0;
    
    if(sortedKeyboards[sortedKeyboards.length-1]+sortedDrives[sortedDrives.length-1] > budget) return -1;
    else {
        
        for(let keyboard of sortedKeyboards) {
            
            if(keyboard <= budget) {

                for(let drive of sortedDrives) {

                    if(drive <= budget) {

                        const total = keyboard+drive;

                        if(total <= budget) {
                            max = Math.max(max,total);
                            break;
                        }
                    }
                }
            }

        }
    }

    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const bnm = readLine().split(' ');

    const b = parseInt(bnm[0], 10);

    const n = parseInt(bnm[1], 10);

    const m = parseInt(bnm[2], 10);

    const keyboards = readLine().split(' ').map(keyboardsTemp => parseInt(keyboardsTemp, 10));

    const drives = readLine().split(' ').map(drivesTemp => parseInt(drivesTemp, 10));

    /*
     * The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
     */

    let moneySpent = getMoneySpent(keyboards, drives, b);

    ws.write(moneySpent + "\n");

    ws.end();
}
