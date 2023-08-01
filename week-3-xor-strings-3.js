// UNFORTUNATELY, THIS QUESTION HAS A TYPESCRIPT COMPILER ERROR BUG 
// THEREFORE, I SOLVED THIS QUESTION IN JAVASCRIPT

process.stdin.resume();
process.stdin.setEncoding("ascii");

var input = "";
var inputLines = []
process.stdin.on("data", function (chunk) {
    input += chunk;
});
process.stdin.on("end", function () {
    inputLines.push(String(input.replace(/\/n/g)))
    main()
});

function main() {
    const lines = (String(inputLines).replace("\n"," ").split(" "))

    if(lines.length === 2) {
        const firstLine = lines[0];
        const secondLine = lines[1];
        let clone = '';
    
        for(let i=0;i<firstLine.length;i++) {
            const a = firstLine[i]
            const b = secondLine[i]
            const result =  xor(a,b);
            
            clone += result;
        }

        process.stdout.write(clone)
    }

}
function xor(a,b) {
    if(a === b) return '0';
    else return '1'
}
