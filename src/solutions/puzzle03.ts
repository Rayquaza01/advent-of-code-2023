const DIGIT_MATCH = /\d+/g;
const SYMBOL_MATCH = /[^\d.]/g;

interface CubeNumberPosition {
    /** the number that is matching */
    n: number
    /** the indexes a symbol could be adjacent on */
    i: number[]
}

function GeneratePerLineNumbers(line: string): CubeNumberPosition[] {
    const indexes: CubeNumberPosition[] = [];

    let match;
    while ((match = DIGIT_MATCH.exec(line)) !== null) {
        const currentNumber: CubeNumberPosition = {n: Number(match[0]), i: []};

        // gets all possible indexes that a symbol could be adjacent on
        for (let i = match.index - 1; i < match.index + match[0].length + 1; i++) {
            currentNumber.i.push(i);
        }

        indexes.push(currentNumber);
    }

    return indexes;
}

function GeneratePerLineSymbols(line: string): number[] {
    const indexes: number[] = [];

    let match;
    while ((match = SYMBOL_MATCH.exec(line)) !== null) {
        indexes.push(match.index);
    }

    return indexes;
}

export function puzzle03p1(input: string) {
    const lines = input.split("\n");

    const perLineNumbers = lines.map(GeneratePerLineNumbers);
    const perLineSymbols = lines.map(GeneratePerLineSymbols);

    let sum = 0;

    perLineNumbers.forEach((line, idx) => {
        const prevLineIndex = idx - 1;
        const nextLineIndex = idx + 1;

        line.forEach(num => {
            // console.log("Processing", num);
            // console.log("Previous Line", prevLineIndex >= 0 && perLineSymbols[prevLineIndex].find(s => num.i.includes(s)));
            // console.log("Current Line", perLineSymbols[idx].find(s => num.i.includes(s)));
            // console.log("Next Line", nextLineIndex < lines.length && perLineSymbols[nextLineIndex].find(s => num.i.includes(s)));

            // if there's an adjacent symbol on current, above, or below lines
            if (
                perLineSymbols[idx].find(s => num.i.includes(s)) ||
                (prevLineIndex >= 0 && perLineSymbols[prevLineIndex].find(s => num.i.includes(s))) ||
                (nextLineIndex < lines.length && perLineSymbols[nextLineIndex].find(s => num.i.includes(s)))
            ) {
                sum += num.n;
            }
        });

    });

    return sum;
}

// part 2

export function puzzle03p2(input: string) {
    const lines = input.split("\n");

    const perLineNumbers = lines.map(GeneratePerLineNumbers);
    const perLineSymbols = lines.map(GeneratePerLineSymbols);

    let sum = 0;

    perLineSymbols.forEach((line, idx) => {
        const prevLineIndex = idx - 1;
        const nextLineIndex = idx + 1;

        line.forEach(sym => {
            // get array of all numbers adjacent to this symbol
            const GearNumbers = [
                ...perLineNumbers[idx].filter(num => num.i.includes(sym)),
                ...(prevLineIndex >= 0 ? perLineNumbers[prevLineIndex].filter(num => num.i.includes(sym)) : []),
                ...(nextLineIndex < lines.length ? perLineNumbers[nextLineIndex].filter(num => num.i.includes(sym)) : [])
            ].map(i => i.n);

            // if 2 numbers are adjacent, sum their product
            if (GearNumbers.length > 1) sum += GearNumbers[0] * GearNumbers[1];
        });

    });

    return sum;
}
