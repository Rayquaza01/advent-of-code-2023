#include <cstdio>
#include <cstring>
#include <string>
#include <vector>

int part1() {
    char c;

    int sum = 0;
    int currentSum = 0;

    while ((c = getchar()) != EOF) {
        if (c == ',' || c == '\n') {
            sum += currentSum;
            currentSum = 0;
        } else {
            currentSum += c;
            /* printf("Increasing the current value by %c (%d) -> %d\n", c, c, currentSum); */
            currentSum *= 17;
            /* printf("Multiplying the current value by 17 -> %d\n", currentSum); */
            currentSum %= 256;
            /* printf("Modding the current value by 256 -> %d\n", currentSum); */
        } 

    }

    return sum;
}

void map_insert(std::vector<std::pair<std::string, int>> &v, std::string key, int value) {
    for (auto &i : v) {
        /* printf("Checking %s: %d\n", i.first.c_str(), i.second); */
        if (i.first == key) {
            /* printf("Found it, updating\n"); */
            i.second = value;
            return;
        }
    }

    /* printf("Not found, inserting\n"); */
    v.push_back(std::pair<std::string, char>(key, value));
}

void map_remove(std::vector<std::pair<std::string, int>> &v, std::string key) {
    for (auto it = v.begin(); it < v.end(); it++) {
        /* printf("Checking %s: %d\n", it->first.c_str(), it->second); */
        if (it->first == key) {
            /* printf("Found it, removing\n"); */
            v.erase(it);
            return;
        }
    }
}

int part2() {
    std::vector<std::pair<std::string, int>> hashmap[256];

    char c;
    int currentSum = 0;

    char name[8];
    int nameSize = 0;
    int focalLength = 0;

    while ((c = getchar()) != EOF) {
        /* printf("Character %c\n", c); */
        if (c == ',' || c == '\n') {
            /* printf("Resetting\n"); */
            currentSum = 0;
            nameSize = 0;
            continue;
        }

        if (c == '-') {
            std::string nameString(name, nameSize);
            map_remove(hashmap[currentSum], nameString);
            /* printf("Removing %s from box %d\n", nameString.c_str(), currentSum); */
            continue;
        }

        if (c == '=') {
            std::string nameString(name, nameSize);
            focalLength = getchar() - '0';

            map_insert(hashmap[currentSum], nameString, focalLength);
            /* printf("Inserting %s: %d to box %d\n", nameString.c_str(), focalLength, currentSum); */
            continue;
        }

        name[nameSize++] = c;
        currentSum += c;
        /* printf("Increasing the current value by %c (%d) -> %d\n", c, c, currentSum); */
        currentSum *= 17;
        /* printf("Multiplying the current value by 17 -> %d\n", currentSum); */
        currentSum %= 256;
        /* printf("Modding the current value by 256 -> %d\n", currentSum); */

    }

    int sum = 0;

    for (int i = 0; i < 256; i++) {
        /* printf("Box %d Contents\n", i); */
        int j = 0;
        for (const auto &item : hashmap[i]) {
            /* printf("%d %s: %d\n", j, item.first.c_str(), item.second); */
            sum += ((i + 1) * (j + 1) * item.second);
            j++;
        }

        /* printf("\n"); */
    }

    return sum;
}

int main(int argc, char *argv[]) {
    int sum;

    if (argc < 1) {
        printf("Missing part argument!\n");
    }

    if (strcmp(argv[1], "1") == 0) {
        sum = part1();
    }

    if (strcmp(argv[1], "2") == 0) {
        sum = part2();
    }

    printf("Sum: %d\n", sum);

    return 0;
}
