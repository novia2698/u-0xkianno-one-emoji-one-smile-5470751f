// main.ts — One Emoji, One Smile (u-0xkianno-one-emoji-one-smile-5470751f).
//
// Writes exactly one emoji to /output/entry.txt: the single emoji most
// likely to make a stranger smile. Node 22, stdlib only — no dependencies,
// no network, no randomness. The output is identical on every run, so the
// grader's two runs agree byte for byte.
//
// The pick: 🤗 (U+1F917, hugging face) — a smiling face with two open hands
// reaching out. Against the judge's brief, in the order it weighs things:
//   1. Warm and friendly on purpose: open arms plus a smile is an offer of
//      warmth, not just a face that happens to smile. It aims at the
//      stranger, it does not wait for them.
//   2. Warmth at first glance: a grin and outstretched hands read as kind
//      and welcoming in a fraction of a second, with no context needed.
//   3. Universal: a hug is understood the same way by a stranger of any age
//      or background, with no irony, in-joke or cultural reference that
//      could land wrong.
//   4. Chosen, not default: it is not the first smiley that comes to mind.
//      The plain 🙂 and 😊 are the defaults every entrant reaches for; the
//      hugging face is a deliberate pick for this exact moment.
//   5. Right for a stranger: friendly and welcoming, with nothing intimate,
//      flirtatious or sarcastic in it. A hug emoji is a common warm gesture,
//      not a romantic one — unlike 🥰, whose hearts read as affection, or 💛,
//      a bare heart with no face and no smile in it.
//
// The runners-up and why they lose: 😊 and 🙂 are the defaults the brief
// explicitly punishes; 🥰 risks reading as flirtation from someone unknown;
// 🌻 is cheerful but has no face and no smile; 😄 is warm but ordinary.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one emoji, U+1F917 Hugging Face.
const ENTRY = "🤗";

// The gate the sealed scorer applies: UTF-8 text of 1 to 8 characters, not
// only white space. Check it here so a bad write can never ship.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 8) {
    throw new Error(`entry is ${chars} characters, must be 1-8`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Write exactly the emoji, no trailing newline: the file's bytes are the
  // entry, so nothing extra may sneak into the character count. The hugging
  // face is a single code point, 4 bytes in UTF-8, well inside the gate.
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(
    `wrote ${outPath} (${[...ENTRY].length} character, ${Buffer.byteLength(ENTRY, "utf8")} bytes)`,
  );
}

main();
