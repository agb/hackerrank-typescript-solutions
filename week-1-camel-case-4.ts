'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;
let output = '';

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

function main() {

    inputLines.forEach( (input) => {
        
        const operation = input[0];
        const indicate  = input[2];
        const word      = input.slice(4,input.length)
        
        switch(operation) {
            case 'S' : {
                const split = caseTypes(word,'split');

                add(split);
                
            } break;
            
            case 'C' : {
                
                  switch(indicate) {
                    case 'V':
                    case 'M' : {
                        const camelCaseType = caseTypes(word,'camel')
                        const modulePart = indicate === 'M' ?  "()" :''
                        
                        add(camelCaseType+modulePart)

                    } break;
                    
                    case 'C' : {
                        
                        const pascalCaseType = caseTypes(word,'pascal');
                        
                        add(pascalCaseType);
                        
                    } break;
                    
                    default: console.log(`This(${indicate}) indicate is not valid`);
                }
                
            } break;
            
            default: console.log(`This(${operation}) operatin is not valid`);
        }
        
    })
    
    console.log(output);
}

function caseTypes(word:string,type:'camel' | 'pascal' | 'split') {
    if(word === '') return word;
    
    const isUpperCase = (char:string) => {
        return char === char.toUpperCase()
    }
    
    if(type === 'split') {
        const replacedWord = word.replace(/()/g,"");
        let newWord = replacedWord;
        let howMany = 0;
        
        replacedWord.split("").forEach( (char,charIndex) => {
            if(isUpperCase(char)) {
                newWord = newWord.slice(0,charIndex+howMany)+" "+newWord.slice(charIndex+howMany,newWord.length);
                howMany++;
            }
        })
        
        return newWord.toLowerCase().trimLeft();
    }
        
    let pascalCase = '';
    
    word.split(" ").forEach( (sentence) => {
           pascalCase += sentence[0].toUpperCase()+sentence.slice(1,sentence.length).toLowerCase(); 
    })
    
    if(type === 'pascal') return pascalCase;
    
    const camelCase = pascalCase[0].toLowerCase()+pascalCase.slice(1,pascalCase.length);
    
    return camelCase;
}

function add(input:string) {
    output += input+"\n";
}


