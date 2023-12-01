export function puzzle1_1(input: string): number {
    let sum = 0;

    const nums = input
        .split("\n")
        .map(line => {
            const matches = line.match(/\d/g);

            if (matches === null) return 0;

            return parseInt(matches[0] + matches[matches.length - 1]);
        });

    for (const num of nums) {
        sum += num;
    }

    return sum;
}


