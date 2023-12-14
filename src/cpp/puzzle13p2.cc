#include <cstdio>
#include <cstring>

// NOT 33900 (too low)

int main() {
    char *line;
    size_t size;
    int read = 0;

    char grid[128][128];
    int w = 0;
    int h = 0;

    int sum = 0;

    while (read != -1) {
        read = getline(&line, &size, stdin);

        int len;

        if (read != -1)
            len = strlen(line);

        if (read == -1 || len == 1) {
            printf("width: %d, height: %d\n", w, h);
            for (int i = 0; i < h; i++) {
                for (int j = 0; j < w; j++) {
                    printf("%c", grid[i][j]);
                }
                printf("\n");
            }

            for (int i = 0; i < h - 1; i++) {
                bool reflective = true;;
                int noMatch = 0;

                // compare two adjacent rows, keeping a count of how many fails
                for (int j = 0; j < w; j++) {
                    // if doesn't match, smudge it
                    if (grid[i][j] != grid[i + 1][j]) {
                        noMatch++;
                    }
                }

                // if those rows match (with at most 1 smudge), continue checking outwards
                if (noMatch < 2) {
                    int offset = 1;

                    while (i - offset >= 0 && i + offset + 1 < h) {
                        for (int j = 0; j < w; j++) {
                            if (grid[i - offset][j] != grid[i + offset + 1][j]) {
                                noMatch++;
                            }
                        }

                        // if less than 2 smudges, continue to next line
                        // otherwise mark stop checking
                        if (noMatch < 2) {
                            offset++;
                        } else {
                            reflective = false;
                            break;
                        }
                    }

                    // if reflective and exactly one smudge, sucessful
                    if (reflective && noMatch == 1) {
                        printf("%d rows before reflection with %d smudges\n", i + 1, noMatch);
                        sum += 100 * (i + 1);
                    }
                }
            }

            for (int j = 0; j < w - 1; j++) {
                bool reflective = true;
                int noMatch = 0;

                // compare two adjacent cols
                for (int i = 0; i < h; i++) {
                    if (grid[i][j] != grid[i][j + 1]) {
                        noMatch++;
                    }
                }

                // if those cols match, continue checking outwards
                if (noMatch < 2) {
                    int offset = 1;

                    while (j - offset >= 0 && j + offset + 1 < w) {
                        bool colReflective = true;
                        for (int i = 0; i < h; i++) {
                            colReflective = colReflective && (grid[i][j - offset] == grid[i][j + offset + 1]);
                            if (grid[i][j - offset] != grid[i][j + offset + 1]) {
                                noMatch++;
                            }
                        }

                        if (noMatch < 2) {
                            offset++;
                        } else {
                            reflective = false;
                            break;
                        }
                    }
                }

                if (reflective && noMatch == 1) {
                    printf("%d cols before reflection\n", j + 1);
                    sum += j + 1;
                }
            }

            // reset width and height for next iteration
            w = 0;
            h = 0;
        } else if (len > 1) {
            w = len - 1;
            memcpy(grid[h++], line, len);

            printf("copied %i bytes to grid\n", w);
        }
    }

    printf("Result %d\n", sum);

    return 0;
}
