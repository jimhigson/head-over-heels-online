#!/usr/bin/env python3
"""Block until the reviewer writes a new note, then print it and exit.

Run in the background while serve.py is up. It finishes the moment a note
appears, which is what brings the agent back to the conversation to act on it -
without this, notes sit in a file nobody is looking at until someone thinks to
check.

    awaitNotes.py --notes <review>.notes.json [--timeout 1800] [--poll 0.5]

Exits 0 either way: with the new notes as markdown on stdout, or with
"no new notes" if it timed out. Re-run it after acting to wait for the next one.
"""

import argparse
import json
import sys
import time
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--notes", required=True, type=Path, help="the review's .notes.json")
    parser.add_argument("--timeout", type=float, default=1_800, help="seconds to wait")
    parser.add_argument("--poll", type=float, default=0.5, help="seconds between checks")
    return parser.parse_args()


def read(notes_file: Path) -> dict:
    if not notes_file.is_file():
        return {}
    try:
        return json.loads(notes_file.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        # caught mid-write; the next poll will see it whole
        return {}


def flatten(notes: dict) -> dict[tuple[str, int], str]:
    """the reviewer's side of each thread - your own replies must not wake you"""

    def said(note: dict) -> str:
        # a note is a thread; the single-text shape it started as is its first
        # message. Anything else is read as empty rather than crashing the wait
        messages = (
            note["messages"]
            if isinstance(note.get("messages"), list)
            else [{"from": "reviewer", "text": note["text"]}]
            if "text" in note
            else []
        )
        return " | ".join(
            message.get("text", "")
            for message in messages
            if message.get("from") != "agent"
        )

    return {
        (path, note["line"]): said(note)
        for path, for_path in notes.items()
        for note in for_path
        if "line" in note
    }


def main() -> None:
    args = parse_args()
    before = flatten(read(args.notes))
    deadline = time.monotonic() + args.timeout

    while time.monotonic() < deadline:
        time.sleep(args.poll)
        now = flatten(read(args.notes))
        # a changed note counts as new: the reviewer edited it to say more
        fresh = {key: text for key, text in now.items() if before.get(key) != text}
        if fresh:
            print(f"{len(fresh)} new review note(s):\n")
            for (path, line), text in sorted(fresh.items()):
                print(f"- {path}:{line} — {text}")
            print("\nact on these now, then wait again.")
            sys.exit(0)

    print("no new notes")


if __name__ == "__main__":
    main()
