import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The office printer finally answers back: the one machine that printed
// the office's most personal documents — and kept quiet about all of them
// until now. Weary, literal, faintly passive-aggressive, and it lands
// the comeback in a single read.
const line =
  "I printed your resignation letter, your wedding vows, and the novel you will never finish. I know everything. I jam anyway.";

// The gate only accepts one line of 1-240 characters; fail loudly
// instead of submitting a line the judge will never read.
if (line.length < 1 || line.length > 240) {
  throw new Error(`entry line is ${line.length} characters, must be 1-240`);
}
if (line.includes("\n")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, line, "utf8");

// Read back and verify byte-for-byte, so a bad write never ships.
const back = readFileSync(outFile, "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the entry line");
}
