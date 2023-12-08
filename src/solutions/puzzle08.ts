export function puzzle08p1(input: string) {
    const lines = input.split("\n");
    const path = lines[0]
        .split("")
        .map(i => {
            if (i === "L") return 0;
            if (i === "R") return 1;

            return -1;
        });

    const tree: Record<string, string[]> = {};
    for (const line of lines.slice(2, -1)) {
        const [id, left, right] = line.match(/[A-Z]{3}/g) as RegExpMatchArray;
        tree[id] = [left, right];
    }

    let currentNode = "AAA";
    let count = 0;

    while (currentNode !== "ZZZ") {
        currentNode = tree[currentNode][path[count++ % path.length]];
    }

    return count;
}

// part 2

function gcd(a: number, b: number) {
    let low = Math.min(a, b);
    let high = Math.max(a, b);

    let remainder = 0;
    while ((high % low) > 0) {
        remainder = high % low;
        high = low;
        low = remainder;
    }

    return low;
}

function lcm(a: number, b: number) {
    return Math.abs(a * b) / gcd(a, b);
}

export function puzzle08p2(input: string) {
    const lines = input.split("\n");
    const path = lines[0]
        .split("")
        .map(i => {
            if (i === "L") return 0;
            if (i === "R") return 1;

            return -1;
        });

    const currentNodes: string[] = [];

    const tree: Record<string, string[]> = {};
    for (const line of lines.slice(2, -1)) {
        const [id, left, right] = line.match(/[A-Z0-9]{3}/g) as RegExpMatchArray;
        tree[id] = [left, right];

        if (id.endsWith("A")) currentNodes.push(id);
    }

    return currentNodes
        .map(n => {
            let count = 0;

            while (!n.endsWith("Z")) {
                n = tree[n][path[count++ % path.length]];
            }

            return count;
        })
        .reduce((acc, i) => lcm(acc, i), 1);
}
