const RED_PAT = /\d+(?= red)/g;
const GREEN_PAT = /\d+(?= green)/g;
const BLUE_PAT = /\d+(?= blue)/g;

export function puzzle02_2(data: string): number {
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
