const RED_PAT = /\d+(?= red)/g;
const GREEN_PAT = /\d+(?= green)/g;
const BLUE_PAT = /\d+(?= blue)/g;

// part 1

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;


export function puzzle02p1(data: string): number {
    let sum = 0;

    data
        .split("\n")
        .forEach((line, idx) => {
            if (line === "") return;

            const reds = line.match(RED_PAT)?.map(Number);
            const greens = line.match(GREEN_PAT)?.map(Number);
            const blues = line.match(BLUE_PAT)?.map(Number);

            // console.debug("Reds", reds);
            // console.debug("Greens", greens);
            // console.debug("Blues", blues);

            if (reds?.every(i => i <= MAX_RED) && greens?.every(i => i <= MAX_GREEN) && blues?.every(i => i <= MAX_BLUE)) {
                sum += (idx + 1);
            }
        });

    return sum;
}

// part 2

export function puzzle02p2(data: string): number {
    let sum = 0;

    data
        .split("\n")
        .forEach(line => {
            if (line === "") return;

            // type cast to appease ts
            // as long as input data is correct, should never be undefined anyway
            const reds = line.match(RED_PAT)?.map(Number) as number[];
            const greens = line.match(GREEN_PAT)?.map(Number) as number[];
            const blues = line.match(BLUE_PAT)?.map(Number) as number[];

            // console.debug("Reds", reds);
            // console.debug("Greens", greens);
            // console.debug("Blues", blues);

            sum += (Math.max(...reds) * Math.max(...greens) * Math.max(...blues));
        });

    return sum;
}
