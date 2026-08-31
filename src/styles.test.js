import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("global type hierarchy", () => {
  it("makes section eyebrows more legible without enlarging technical labels", () => {
    const styles = readFileSync(resolve("src/styles.css"), "utf8");

    expect(styles).toMatch(/\.eyebrow\s*{[^}]*font-size:\s*0\.8rem;/s);
    expect(styles).toMatch(
      /\.technical-label\s*{[^}]*font-size:\s*0\.72rem;/s,
    );
  });
});
