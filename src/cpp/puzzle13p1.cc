#include <cstdio>
#include <cstring>

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
                // compare two adjacent rows
                int cmp = memcmp(grid[i], grid[i + 1], w);

                // if those rows match, continue checking outwards
                if (cmp == 0) {
                    int offset = 1;

                    bool reflective = true;
                    while (i - offset >= 0 && i + offset + 1 < h) {
                        cmp = memcmp(grid[i - offset], grid[i + offset + 1], w);
                        if (cmp == 0) {
                            offset++;
                        } else {
                            reflective = false;
                            break;
                        }
                    }

                    if (reflective) {
                        printf("%d rows before reflection\n", i + 1);
                        sum += 100 * (i + 1);
                    }
                }
            }

            for (int j = 0; j < w - 1; j++) {
                bool reflective = true;

                // compare two adjacent cols
                for (int i = 0; i < h; i++) {
                    reflective = reflective && grid[i][j] == grid[i][j + 1];
                }

                // if those cols match, continue checking outwards
                if (reflective) {
                    int offset = 1;

                    while (j - offset >= 0 && j + offset + 1 < w) {
                        bool colReflective = true;
                        for (int i = 0; i < h; i++) {
                            colReflective = colReflective && (grid[i][j - offset] == grid[i][j + offset + 1]);
                        }

                        if (colReflective) {
                            offset++;
                        } else {
                            reflective = false;
                            break;
                        }
                    }
                }

                if (reflective) {
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
