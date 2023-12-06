interface Race {
    length: number
    distance: number
}

function RaceDistance(held: number, length: number) {
    return length * held - held ** 2;
}

export function puzzle06p1(input: string) {
    const raceArr = input
        .split("\n")
        .map(l => l.match(/\d+/g)?.map(Number))
        .filter(i => i !== undefined) as number[][];

    const races = raceArr[0]
        .map((i, idx) => { return { length: i, distance: raceArr[1][idx] } as Race; });

    // formula is (length * held) - held^2
    // maximum, we take derivative length - (2 * held)
    // set to 0, held = length / 2

    const raceWinningCounts = races.map(r => {
        let maxHeld: number = 1;
        // console.log(r);

        const held = Math.floor(r.length / 2);

        let left = Infinity;
        let right = Infinity;
        let dist = 1;

        while (left > r.distance && right > r.distance) {
            if ((left = RaceDistance(held + dist, r.length)) > r.distance) {
                // console.log("Left", left);
                maxHeld++;
            }

            if ((right = RaceDistance(held - dist, r.length)) > r.distance) {
                // console.log("Right", right);
                maxHeld++
            }

            dist++;
        }

        return maxHeld;
    });

    return raceWinningCounts.reduce((acc, i) => acc * i, 1);
}

export function puzzle06p2(input: string) {
    const [length, distance] = input.replaceAll(" ", "").match(/\d+/g)?.map(Number) as number[];

    let maxHeld: number = 1;

    const held = Math.floor(length / 2);
    // console.log("Max:", held);

    let left = Infinity;
    let right = Infinity;
    let dist = 1;

    while (left > distance && right > distance) {
        if ((left = RaceDistance(held + dist, length)) > distance) {
            // console.log("Left", left);
            maxHeld++;
        }

        if ((right = RaceDistance(held - dist, length)) > distance) {
            // console.log("Right", right);
            maxHeld++;
        }

        dist++;
    }

    return maxHeld;
}
