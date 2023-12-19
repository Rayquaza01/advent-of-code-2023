export function puzzle19p1(input: string) {
    const [workflowDefinitions, ratingDefinitions] = input.split("\n\n");

    // rule arrays:
    // [
    //   0: property (x, m, a, or s)
    //   1: comparison (< or >)
    //   2: value (number)
    //   3: target (the workflow to use if successful
    // ]
    //
    // otherwise
    // [ target ]
    const workflows: Record<string, string[][]> = {};

    workflowDefinitions
        .split("\n")
        .forEach(item => {
            const name = (item.match(/^\w+/) as RegExpMatchArray)[0];
            const rules = item
                .slice(name.length + 1, -1)
                .split(",")
                .map(rule => {
                    const match = rule.match(/(x|m|a|s)(<|>)(\d+):(\w+)/);
                    return match === null ? [rule] : match.slice(1);
                });

            workflows[name] = rules;
        });

    console.log(workflows);

    const ratings: Record<string, number>[] = ratingDefinitions
        .split("\n")
        .slice(0, -1)
        .map(item => {
            const [x, m, a, s] = item.match(/\d+/g)?.map(Number) as number[];
            return {x, m, a, s};
        });

    return ratings
        .filter(item => {
            console.log("Processing item", item);
            let wf = "in";

            while (Object.hasOwn(workflows, wf)) {
                for (const rule of workflows[wf]) {
                    if (rule.length === 1) {
                        console.log("No more rules, choosing workflow", rule[0]);
                        wf = rule[0];
                        break;
                    }

                    if (rule[1] === ">") {
                        if (item[rule[0]] > Number(rule[2])) {
                            console.log(`Rule ${rule[0]} ${rule[1]} ${rule[2]} : ${rule[3]} passed`);
                            wf = rule[3];
                            break;
                        }
                        console.log(`Rule ${rule[0]} ${rule[1]} ${rule[2]} : ${rule[3]} failed`);
                    }

                    if (rule[1] === "<") {
                        if (item[rule[0]] < Number(rule[2])) {
                            console.log(`Rule ${rule[0]} ${rule[1]} ${rule[2]} : ${rule[3]} passed`);
                            wf = rule[3];
                            break;
                        }
                        console.log(`Rule ${rule[0]} ${rule[1]} ${rule[2]} : ${rule[3]} failed`);
                    }
                }
            }

            console.log("Finished on workflow", wf);
            return wf === "A";
        })
        .reduce((acc, item) => acc + (item.x + item.m + item.a + item.s), 0);
}

interface Rating {
    wf: string
    ranges: Record<string, [number, number]>
}

export function puzzle19p2(input: string) {
    const workflowDefinitions = input.split("\n\n")[0];

    // rule arrays:
    // [
    //   0: property (x, m, a, or s)
    //   1: comparison (< or >)
    //   2: value (number)
    //   3: target (the workflow to use if successful
    // ]
    //
    // otherwise
    // [ target ]
    const workflows: Record<string, string[][]> = {};

    workflowDefinitions
        .split("\n")
        .forEach(item => {
            const name = (item.match(/^\w+/) as RegExpMatchArray)[0];
            const rules = item
                .slice(name.length + 1, -1)
                .split(",")
                .map(rule => {
                    const match = rule.match(/(x|m|a|s)(<|>)(\d+):(\w+)/);
                    return match === null ? [rule] : match.slice(1);
                });

            workflows[name] = rules;
        });

    console.log(workflows);

    const ratings: Rating[] = [
        { wf: "in", ranges: { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] } }
    ];

    let sum = 0;

    while (ratings.length > 0) {
        const item = ratings.pop() as Rating;
        console.log("Processing item", JSON.stringify(item));

        if (Object.hasOwn(workflows, item.wf)) {
            for (const rule of workflows[item.wf]) {
                if (rule.length === 1) {
                    item.wf = rule[0];
                    ratings.push(item);
                    break;
                }

                // 1, 4000
                // > 50
                // 51, 4000 pass
                // 1, 50 fail

                // 1, 4000
                // < 50
                // 1, 49 pass
                // 50, 4000 fail
                console.log(`Rule ${rule[0]} ${rule[1]} ${rule[2]} : ${rule[3]}`);

                if (rule[1] === ">") {
                    // quick and dirty way to get a deep copy
                    const pass = JSON.parse(JSON.stringify(item));
                    pass.ranges[rule[0]][0] = Number(rule[2]) + 1;
                    pass.wf = rule[3];

                    ratings.push(pass);

                    item.ranges[rule[0]][1] = Number(rule[2]);

                    console.log("Passed:", JSON.stringify(pass));
                    console.log("Failed:", JSON.stringify(item));
                    continue;
                }

                if (rule[1] === "<") {
                    const pass = JSON.parse(JSON.stringify(item));
                    pass.ranges[rule[0]][1] = Number(rule[2]) - 1;
                    pass.wf = rule[3];

                    ratings.push(pass);

                    item.ranges[rule[0]][0] = Number(rule[2]);

                    console.log("Passed:", JSON.stringify(pass));
                    console.log("Failed:", JSON.stringify(item));
                    continue;
                }
            }

            continue;
        }

        if (item.wf === "A") {
            sum +=
                (item.ranges.x[1] - item.ranges.x[0] + 1) *
                (item.ranges.m[1] - item.ranges.m[0] + 1) *
                (item.ranges.a[1] - item.ranges.a[0] + 1) *
                (item.ranges.s[1] - item.ranges.s[0] + 1);
        }
    }

    return sum;
}
