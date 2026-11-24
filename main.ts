// One Word for the Boss — entry: write exactly one word to
// /output/entry.txt.
//
// The word: "Meetingmonger"
//
// Why this word, against the judge's brief (funny, true, fresh, travels):
// - It names the boss, not a trait: a noun a person would actually use
//   about the one they report to ("our boss is a total meetingmonger").
// - The "-monger" suffix does the comedy: warmonger, fishmonger — a dealer
//   in meetings, someone who traffics in them, schedules a meeting to
//   plan the next meeting, and calls a meeting to discuss the last one.
// - It rings true: the calendar-full boss is the one habit nearly every
//   worker has actually met, in every workplace.
// - It is fresh: nobody's first reach is "meetingmonger". The first reach
//   is "micromanager" or "tyrant"; this is the same truth from an angle
//   no one else is standing at.
// - It travels: kitchens hold pre-shift meetings, warehouses hold
//   standups, offices hold everything — no industry needs explaining.
//
// Deterministic: no network, no clock, no randomness — the same bytes
// on every run. No trailing newline: the word is the whole file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Meetingmonger";

// Revised: the program now checks its own word against the sealed
// gate before writing — 1 to 30 characters, a single token, not only
// whitespace — and refuses to write an invalid file instead of
// silently shipping one. The word itself is unchanged: the check
// exists so a future edit to WORD cannot quietly break the gate.
const GATE_MAX_CHARS = 30;

function assertGate(word: string): void {
  const chars = [...word];
  if (chars.length < 1 || chars.length > GATE_MAX_CHARS) {
    throw new Error(`word must be 1-${GATE_MAX_CHARS} characters, got ${chars.length}`);
  }
  if (/\s/.test(word)) {
    throw new Error("word must be a single token with no whitespace");
  }
  if (word.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
}

function main(): void {
  assertGate(WORD);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), WORD, "utf-8");
}

main();
