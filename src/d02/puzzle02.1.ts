const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const RED_PAT = /\d+(?= red)/g;
const GREEN_PAT = /\d+(?= green)/g;
const BLUE_PAT = /\d+(?= blue)/g;

export function puzzle02_1(data: string): number {
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
