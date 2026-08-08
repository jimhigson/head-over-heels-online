#!/usr/bin/env python3
"""Answer a review note, in the note itself.

The reviewer wrote a note against a line; this puts your reply in the same
thread, where the page picks it up within a couple of seconds and pops a toast.
Use it to say what you did, or to ask the one question you need answered before
you can do it.

    reply.py --notes <review>.notes.json --path src/foo.ts --line 12 \
             --text "moved it to src/util/preact — the import sites came with it"

    reply.py --notes <review>.notes.json --path src/foo.ts --line 12 \
             --text "do you want the old path re-exported?" --asking

`--asking` only marks the message as a question, for the reviewer's eye; either
way the reply lands in their note box and they can type straight back.
"""

import argparse
import json
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--notes", required=True, type=Path, help="the review's .notes.json")
    parser.add_argument("--path", required=True, help="the file the note is on")
    parser.add_argument("--line", required=True, type=int, help="the line the note is on")
    parser.add_argument("--text", required=True, help="what to say")
    parser.add_argument(
        "--asking",
        action="store_true",
        help="mark it as a question rather than a report of what you did",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    notes = json.loads(args.notes.read_text(encoding="utf-8")) if args.notes.is_file() else {}

    for_path = notes.setdefault(args.path, [])
    note = next((candidate for candidate in for_path if candidate["line"] == args.line), None)
    if note is None:
        note = {"line": args.line, "messages": []}
        for_path.append(note)
    if "messages" not in note:
        note["messages"] = [{"from": "reviewer", "text": note.pop("text")}]

    note["messages"].append(
        {"from": "agent", "text": args.text, **({"asking": True} if args.asking else {})}
    )
    for_path.sort(key=lambda candidate: candidate["line"])

    args.notes.write_text(json.dumps(notes, indent=2), encoding="utf-8")
    print(f"replied on {args.path}:{args.line}")


if __name__ == "__main__":
    main()
