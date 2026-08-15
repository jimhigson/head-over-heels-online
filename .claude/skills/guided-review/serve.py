#!/usr/bin/env python3
"""Serve a built guided review, with save-back, note and tick persistence.

The page build.py writes is static and read-only. Served through here it gains
three things: the modified side of each Monaco diff becomes editable with a Save
button that writes to the working tree, and review notes and ticks persist to
json files instead of localStorage.

    serve.py --html <scratchpad>/review.html [--repo .] [--port 0] [--open]

Those files live in a directory named after the review's id (which build.py
derives from what is being reviewed and embeds in the page), beside the html:

    <scratchpad>/<review id>/{ticks.json, notes.json, notes.md, token}

so rebuilding the same review anywhere picks up the progress it already has.

Localhost only, and every write is gated on a token minted at startup plus the
sha256 the page was built from - a file that moved on disk since then is a 409,
not a silent clobber.
"""

import argparse
import hashlib
import json
import re
import secrets
import subprocess
import sys
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

MARKER = "<!--REVIEW_SERVER-->"
PAYLOAD = re.compile(r'<script type="application/json" id="payload">(?P<json>.*?)</script>', re.S)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--html", required=True, type=Path, help="the file build.py wrote")
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="repo root paths are under")
    parser.add_argument("--port", type=int, default=0, help="0 picks a free one")
    parser.add_argument("--open", action="store_true", help="open a browser on it")
    return parser.parse_args()


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


class Review:
    def __init__(self, html: Path, repo: Path) -> None:
        self.html = html
        self.repo = repo.resolve()
        self.store = self.store_dir(html)
        self.store.mkdir(parents=True, exist_ok=True)
        self.notes = self.store / "notes.json"
        self.notes_markdown = self.store / "notes.md"
        self.ticks = self.store / "ticks.json"
        self.token = self.stable_token(self.store / "token")
        self.seen = flatten(self.read_notes())

    @staticmethod
    def store_dir(html: Path) -> Path:
        """where this review keeps everything that isn't the page itself.

        Named by the review's own id, read back out of the payload build.py
        embedded - so the same review rebuilt into a different scratchpad still
        finds the ticks and notes it already has"""
        found = PAYLOAD.search(html.read_text(encoding="utf-8"))
        identifier = None if found is None else json.loads(found.group("json")).get("id")
        if identifier is None:
            raise SystemExit(f"{html} carries no review id - rebuild it with the current build.py")
        return html.parent / identifier

    @staticmethod
    def stable_token(token_file: Path) -> str:
        """kept across restarts, so a page left open in a tab keeps working.

        Its job is only to stop some other page in the browser posting to this
        port behind your back - it is not protecting the review from you, and
        losing notes to a restart would be a far worse failure than the one it
        guards against"""
        if token_file.is_file():
            return token_file.read_text(encoding="utf-8").strip()
        token = secrets.token_urlsafe(24)
        token_file.write_text(token, encoding="utf-8")
        token_file.chmod(0o600)
        return token

    def page(self) -> bytes:
        bootstrap = (
            "<script>window.__reviewServer = "
            + json.dumps({"token": self.token})
            + ";</script>"
        )
        text = self.html.read_text(encoding="utf-8")
        if MARKER not in text:
            raise SystemExit(f"{self.html} has no {MARKER} - rebuild it with the current template")
        return text.replace(MARKER, bootstrap).encode("utf-8")

    def resolve(self, path: str) -> Path:
        """a path inside the repo, or an error - never a traversal or a symlink out"""
        candidate = (self.repo / path).resolve()
        if not candidate.is_relative_to(self.repo):
            raise PermissionError(f"{path} is outside the repo")
        return candidate

    def save(self, path: str, content: str, base_sha: str) -> dict:
        target = self.resolve(path)
        on_disk = target.read_text(encoding="utf-8") if target.is_file() else ""
        if sha256(on_disk) != base_sha:
            raise FileExistsError(f"{path} changed on disk since this review was built")
        target.write_text(content, encoding="utf-8")

        return {"sha": sha256(content), **self.line_counts(path)}

    def line_counts(self, path: str) -> dict:
        def numstat(*args: str) -> list[str]:
            return subprocess.run(
                ["git", "diff", "--numstat", *args],
                cwd=self.repo,
                capture_output=True,
                text=True,
                encoding="utf-8",
            ).stdout.split()

        # an untracked file has nothing to diff against but /dev/null
        counts = numstat("--", path) or numstat("--no-index", "--", "/dev/null", path)
        if len(counts) >= 2 and counts[0].isdigit():
            return {"added": int(counts[0]), "removed": int(counts[1])}
        return {"added": 0, "removed": 0}

    def read_ticks(self) -> list:
        """the paths read so far. Same tolerance as the notes: a half-written or
        hand-edited file must not take the server down mid-review"""
        try:
            read = json.loads(self.ticks.read_text(encoding="utf-8")) if self.ticks.is_file() else []
        except json.JSONDecodeError:
            return []
        return read if isinstance(read, list) else []

    def write_ticks(self, ticked: list) -> None:
        self.ticks.write_text(json.dumps(ticked, indent=2), encoding="utf-8")

    def read_notes(self) -> dict:
        # requests are served concurrently, so the notes file can be read while
        # another request is part-way through writing it. Reading no notes for
        # one request is recoverable; taking the server down mid-review is not
        try:
            raw = json.loads(self.notes.read_text(encoding="utf-8")) if self.notes.is_file() else {}
        except json.JSONDecodeError:
            return {}
        return {path: [normalise(note) for note in for_path] for path, for_path in raw.items()}

    def file_state(self, paths: list[str]) -> dict:
        """what the page needs to notice that a file changed under it"""
        state = {}
        for path in paths:
            try:
                target = self.resolve(path)
            except PermissionError:
                continue
            content = target.read_text(encoding="utf-8") if target.is_file() else ""
            state[path] = {"sha": sha256(content), **self.line_counts(path)}
        return state

    def file_content(self, path: str) -> dict:
        target = self.resolve(path)
        content = target.read_text(encoding="utf-8") if target.is_file() else ""
        return {"after": content, "sha": sha256(content), **self.line_counts(path)}

    def write_notes(self, notes: dict) -> None:
        self.notes.write_text(json.dumps(notes, indent=2), encoding="utf-8")
        # the markdown twin is what a person or an agent actually reads
        self.notes_markdown.write_text(as_markdown(notes), encoding="utf-8")
        for line in new_lines(self.seen, notes):
            print(f"  note {line}")
        self.seen = flatten(notes)

    def hand_off(self, notes: dict) -> int:
        """put the notes where the agent running the skill will find them"""
        self.write_notes(notes)
        count = len(flatten(notes))
        print(f"\n=== {count} review note(s) handed off ===")
        print(f"    read {self.notes_markdown}")
        print(as_markdown(notes))
        print("=== end of notes ===\n", flush=True)
        return count


def normalise(note: dict) -> dict:
    """a note is a thread; the single-text shape it started as reads as its first
    message. Never raises: a half-written or hand-edited note file must not take
    the server down mid-review"""
    if isinstance(note.get("messages"), list):
        return note
    first = [{"from": "reviewer", "text": note["text"]}] if "text" in note else []
    return {"line": note.get("line", 1), "messages": first}


def flatten(notes: dict) -> set[str]:
    return {
        f"{path}:{note['line']} {message['from']}: {message['text']}"
        for path, for_path in notes.items()
        for note in map(normalise, for_path)
        for message in note["messages"]
    }


def new_lines(seen: set[str], notes: dict) -> list[str]:
    return sorted(flatten(notes) - seen)


def as_markdown(notes: dict) -> str:
    def thread(note: dict) -> str:
        note = normalise(note)
        messages = note["messages"]
        if not messages:
            return ""
        head = f"- L{note['line']}: {messages[0].get('text', '')}"
        replies = "\n".join(
            f"  - {message.get('from', '?')}: {message.get('text', '')}"
            for message in messages[1:]
        )
        return f"{head}\n{replies}" if replies else head

    def section(path: str, for_path: list) -> str:
        threads = [line for line in map(thread, for_path) if line != ""]
        return f"### {path}\n" + "\n".join(threads) if threads else ""

    return "\n\n".join(
        written
        for written in (section(path, for_path) for path, for_path in sorted(notes.items()))
        if written != ""
    )


def make_handler(review: Review) -> type[BaseHTTPRequestHandler]:
    class Handler(BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, fmt: str, *args) -> None:  # quieter than the default
            # /state is polled every couple of seconds; logging it buries everything else
            if self.path not in ("/notes", "/ticks", "/state"):
                print(f"  {self.command} {self.path} → {args[1] if len(args) > 1 else ''}")

        def respond(self, status: int, body: bytes, content_type: str) -> None:
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def json_response(self, status: int, payload: dict) -> None:
            self.respond(status, json.dumps(payload).encode("utf-8"), "application/json")

        def authorised(self) -> bool:
            return self.headers.get("X-Review-Token") == review.token

        def do_GET(self) -> None:
            if self.path in ("/", "/index.html"):
                self.respond(200, review.page(), "text/html; charset=utf-8")
            elif self.path == "/notes":
                self.json_response(200, review.read_notes())
            elif self.path == "/ticks":
                self.json_response(200, {"ticked": review.read_ticks()})
            else:
                self.json_response(404, {"error": "not found"})

        def do_POST(self) -> None:
            # the body has to come off the socket before anything else can be
            # answered - refusing a request without draining it leaves the next
            # one to be parsed starting halfway through this one's json
            length = int(self.headers.get("Content-Length", "0"))
            raw = self.rfile.read(length)

            if not self.authorised():
                # a page left open across a restart of this server holds a token
                # that no longer exists; it needs to reload, not retry
                self.json_response(403, {"error": "stale token - reload the page"})
                return

            try:
                body = json.loads(raw or b"{}")
            except json.JSONDecodeError as malformed:
                self.json_response(400, {"error": f"unreadable body: {malformed}"})
                return

            if self.path == "/save":
                try:
                    result = review.save(body["path"], body["content"], body["sha"])
                except FileExistsError as conflict:
                    self.json_response(409, {"error": str(conflict)})
                except (PermissionError, OSError) as error:
                    self.json_response(400, {"error": str(error)})
                else:
                    print(f"  saved {body['path']}")
                    self.json_response(200, result)
            elif self.path == "/notes":
                review.write_notes(body)
                self.json_response(200, {"ok": True})
            elif self.path == "/ticks":
                review.write_ticks(body.get("ticked", []))
                self.json_response(200, {"ok": True})
            elif self.path == "/handoff":
                self.json_response(200, {"count": review.hand_off(body)})
            elif self.path == "/state":
                # the page's poll: threads, and whether the files it has open
                # have moved under it (an agent acting on a note)
                self.json_response(
                    200,
                    {
                        "notes": review.read_notes(),
                        "ticked": review.read_ticks(),
                        "files": review.file_state(body.get("paths", [])),
                    },
                )
            elif self.path == "/file":
                self.json_response(200, review.file_content(body["path"]))
            else:
                self.json_response(404, {"error": "not found"})

    return Handler


def main() -> None:
    # run in the background and stdout is a pipe, which python block-buffers -
    # so nothing (including notes as they are written) would appear until exit
    sys.stdout.reconfigure(line_buffering=True)

    args = parse_args()
    review = Review(args.html.resolve(), args.repo)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), make_handler(review))
    url = f"http://127.0.0.1:{server.server_address[1]}/"

    print(f"guided review on {url}")
    print(f"  editing {review.repo}")
    print(f"  ticks   {review.ticks}")
    print(f"  notes   {review.notes_markdown}")
    print("  notes appear below as they are written; 'Send notes to agent' prints them all")
    print("  ctrl-c to stop", flush=True)
    if args.open:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")


if __name__ == "__main__":
    main()
