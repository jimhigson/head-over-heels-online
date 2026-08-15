#!/usr/bin/env python3
"""Build the guided-review artifact from an authored groups json.

The only part of a guided review that needs judgement is the grouping and the
per-file notes; everything else - collecting diffs, stripping headers, counting
lines, escaping, computing github anchors, inlining the font - is mechanical and
happens here.

    build.py --groups review.json --out review.html --mode worktree
    build.py --groups review.json --out review.html --mode commit --ref <sha> \
             --github https://github.com/owner/repo/commit/<sha>
    build.py --groups review.json --out review.html --mode pr \
             --base origin/main --head origin/my-branch \
             --github https://github.com/owner/repo/pull/12/files

The groups json is `{"meta": {...}, "groups": [{title, blurb, items: [{path,
status, note}]}]}`. meta takes title, headerTitle, eyebrow, lede, facts (a list
of html strings, appended after the file and line counts) and footer; lede and
footer may contain html.
"""

import argparse
import base64
import hashlib
import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent
DEFAULT_TEMPLATE = SKILL_DIR / "template.html"
# this repo's own pixel font, used for the display role - harmless if absent
DEFAULT_FONT = Path("src/_generated/font/blockstack-head-over-heels.woff2")

# preact + hooks + htm in one umd bundle (~13KB), which the page's ui is built
# from. It is inlined rather than pulled at runtime: the review has to keep
# working opened as a file and published as an artifact, and both of those cut
# the page off from any cdn - unlike monaco, which the page can do without, a
# missing ui runtime would leave nothing on screen at all
PREACT_VERSION = "3.1.1"
PREACT_URL = f"https://cdn.jsdelivr.net/npm/htm@{PREACT_VERSION}/preact/standalone.umd.js"
PREACT_VENDORED = SKILL_DIR / "vendor" / "htm-preact-standalone.umd.js"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--groups", required=True, type=Path, help="authored groups json")
    parser.add_argument("--out", required=True, type=Path, help="html file to write")
    parser.add_argument("--mode", required=True, choices=("worktree", "commit", "pr"))
    parser.add_argument("--ref", help="commit mode: the sha")
    parser.add_argument("--base", help="pr mode: base ref, eg origin/main")
    parser.add_argument("--head", help="pr mode: head ref, eg origin/my-branch")
    parser.add_argument("--pr", help="pr number, so per-file links point at its Files changed tab")
    parser.add_argument(
        "--github",
        help=(
            "base url for per-file diff anchors, eg https://github.com/o/r/pull/12/files. "
            "Derived from the origin remote when omitted; 'none' to link nothing"
        ),
    )
    parser.add_argument("--repo", type=Path, default=None, help="repo root (default: git toplevel)")
    parser.add_argument(
        "--id",
        help=(
            "names the directory a served review keeps its ticks and notes in. "
            "Derived from the repo and what is being reviewed when omitted, so "
            "rebuilding the same review picks its progress back up"
        ),
    )
    parser.add_argument("--template", type=Path, default=DEFAULT_TEMPLATE)
    parser.add_argument("--font", type=Path, default=None, help="woff2 to inline as the display face")
    parser.add_argument("--max-diff-lines", type=int, default=400)
    parser.add_argument(
        "--max-side-lines",
        type=int,
        default=2_000,
        help="files longer than this keep only their patch, not both whole sides",
    )
    return parser.parse_args()


def git(repo: Path, *args: str) -> str:
    result = subprocess.run(
        ["git", *args], cwd=repo, capture_output=True, text=True, encoding="utf-8"
    )
    # diff exits 1 whenever there are differences, which is the normal case here
    if result.returncode not in (0, 1):
        raise SystemExit(f"git {' '.join(args)} failed:\n{result.stderr}")
    return result.stdout


def git_show(repo: Path, spec: str) -> str:
    """the content of a path at a rev, or empty when it didn't exist there"""
    result = subprocess.run(
        ["git", "show", spec], cwd=repo, capture_output=True, text=True, encoding="utf-8"
    )
    return result.stdout if result.returncode == 0 else ""


def diff_for(repo: Path, args: argparse.Namespace, path: str, status: str) -> str:
    if args.mode == "commit":
        return git(repo, "show", args.ref, "--", path)
    if args.mode == "pr":
        return git(repo, "diff", f"{args.base}...{args.head}", "--", path)
    # worktree: untracked files have no index entry, so diff them against nothing
    if status.startswith("A") and not (repo / path).is_symlink() and git(repo, "ls-files", "--", path).strip() == "":
        return git(repo, "diff", "--no-index", "--", "/dev/null", path)
    return git(repo, "diff", "--", path)


def sides_for(repo: Path, args: argparse.Namespace, path: str) -> dict[str, str]:
    """the file's whole before and after, for monaco's diff editor to work from"""
    if args.mode == "commit":
        return {
            "before": git_show(repo, f"{args.ref}^:{path}"),
            "after": git_show(repo, f"{args.ref}:{path}"),
        }
    if args.mode == "pr":
        return {
            "before": git_show(repo, f"{args.base}:{path}"),
            "after": git_show(repo, f"{args.head}:{path}"),
        }
    on_disk = repo / path
    return {
        "before": git_show(repo, f"HEAD:{path}"),
        "after": on_disk.read_text(encoding="utf-8") if on_disk.is_file() else "",
    }


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def preact_runtime() -> str:
    """the vendored ui runtime, fetched from the cdn the first time it is wanted"""
    if not PREACT_VENDORED.is_file():
        print(f"fetching {PREACT_URL}")
        PREACT_VENDORED.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(PREACT_URL, timeout=30) as response:
            PREACT_VENDORED.write_bytes(response.read())
    return PREACT_VENDORED.read_text(encoding="utf-8")


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:40]


def review_id(repo: Path, args: argparse.Namespace) -> str:
    """what this review *is*, as a directory name.

    Derived from the scope rather than from where the html happens to be
    written, so the same review rebuilt tomorrow - a fresh scratchpad, another
    port - finds the ticks and notes it already has. The scope deliberately
    excludes the file list: a pr picking up another commit is still that pr,
    and the reader's progress through it should survive"""
    if args.id:
        return args.id

    if args.mode == "commit":
        scope = f"commit-{args.ref}"
    elif args.mode == "pr":
        scope = f"pr-{args.pr}" if args.pr else f"pr-{args.base}-{args.head}"
    else:
        scope = f"worktree-{git(repo, 'rev-parse', '--abbrev-ref', 'HEAD').strip()}"

    # the repository, not this checkout of it: a pr reviewed from a worktree and
    # from the main checkout is the same review, and should resume as one
    common = git(repo, "rev-parse", "--path-format=absolute", "--git-common-dir").strip()
    home = Path(common).parent if common else repo.resolve()

    # the hash disambiguates two repos of the same name; the readable half is
    # for whoever is looking at the directory
    return f"{slug(home.name)}-{slug(scope)}-{sha256(f'{home}|{scope}')[:8]}"


def web_url(repo: Path, args: argparse.Namespace) -> str | None:
    """where this change can be read on the forge, from the origin remote"""
    if args.github == "none" or args.mode == "worktree":
        return None
    if args.github:
        return args.github

    remote = git(repo, "remote", "get-url", "origin").strip()
    # git@host:owner/name.git, https://host/owner/name.git, ssh://git@host/owner/name
    match = re.search(r"(?:@|//)(?P<host>[^/:]+)[/:](?P<owner>[^/]+)/(?P<name>.+?)(?:\.git)?$", remote)
    if match is None or "github" not in match.group("host"):
        # every other forge anchors its diffs differently; the page carries the
        # diffs anyway, so no link is better than a wrong one
        return None

    base = f"https://{match.group('host')}/{match.group('owner')}/{match.group('name')}"
    if args.pr:
        return f"{base}/pull/{args.pr}/files"
    if args.mode == "commit":
        return f"{base}/commit/{args.ref}"
    return f"{base}/compare/{args.base}...{args.head}"


def strip_header(diff: str) -> str:
    """drop everything before the first hunk - the path is already on the row"""
    lines = diff.splitlines()
    for index, line in enumerate(lines):
        if line.startswith("@@"):
            return "\n".join(lines[index:])
    # no hunks (mode change, pure rename): keep whatever git said
    return "\n".join(line for line in lines if not line.startswith("index "))


def counts(diff: str) -> tuple[int, int]:
    added = sum(1 for line in diff.splitlines() if line.startswith("+") and not line.startswith("+++"))
    removed = sum(1 for line in diff.splitlines() if line.startswith("-") and not line.startswith("---"))
    return added, removed


def truncate(diff: str, limit: int) -> str:
    lines = diff.splitlines()
    if len(lines) <= limit:
        return diff
    dropped = len(lines) - limit
    return "\n".join([*lines[:limit], f"… {dropped} more lines - read this one in the file itself"])


def main() -> None:
    args = parse_args()
    repo = args.repo or Path(git(Path.cwd(), "rev-parse", "--show-toplevel").strip())

    if args.mode == "commit" and not args.ref:
        raise SystemExit("commit mode needs --ref")
    if args.mode == "pr" and not (args.base and args.head):
        raise SystemExit("pr mode needs --base and --head")

    authored = json.loads(args.groups.read_text(encoding="utf-8"))
    groups = authored["groups"]
    meta = authored.get("meta", {})

    diffs: dict[str, str] = {}
    sides: dict[str, dict[str, str]] = {}
    stats: dict[str, list[int]] = {}
    links: dict[str, str] = {}
    empty: list[str] = []
    forge = web_url(repo, args)

    for group in groups:
        for item in group["items"]:
            path, status = item["path"], item["status"]
            body = strip_header(diff_for(repo, args, path, status))
            if body.strip() == "":
                empty.append(path)
            added, removed = counts(body)
            diffs[path] = truncate(body, args.max_diff_lines)
            stats[path] = [added, removed]

            # whole-file sides feed monaco's diff editor; past the cap it is
            # cheaper (and no less readable) to leave that file on the patch
            side = sides_for(repo, args, path)
            if max(side["before"].count("\n"), side["after"].count("\n")) <= args.max_side_lines:
                # the hash lets a served page refuse to save over a file that
                # moved on disk after the review was built
                side["sha"] = sha256(side["after"])
                sides[path] = side

            if forge is not None:
                links[path] = f"{forge}#diff-{sha256(path)}"

    font_path = args.font or (repo / DEFAULT_FONT)
    font = base64.b64encode(font_path.read_bytes()).decode() if font_path.is_file() else ""

    identifier = review_id(repo, args)
    payload = json.dumps(
        {
            "id": identifier,
            "meta": meta,
            "groups": groups,
            "diffs": diffs,
            "sides": sides,
            "stats": stats,
            "links": links,
        }
    )
    # no literal `<` reaches the document: `</script>` would close the block
    # early, and a reviewed file that quotes serve.py's `<!--REVIEW_SERVER-->`
    # marker would otherwise have a script injected into the middle of the
    # payload. < is a valid json escape, so the parser undoes this for free
    payload = payload.replace("<", "\\u003c")

    html = args.template.read_text(encoding="utf-8")
    for placeholder, value in (
        ("FONT_B64", font),
        ("PREACT_JS", preact_runtime()),
        ("PAYLOAD_JSON", payload),
    ):
        if placeholder not in html:
            raise SystemExit(f"template is missing the {placeholder} placeholder")
        html = html.replace(placeholder, value)

    args.out.write_text(html, encoding="utf-8")

    total_added = sum(added for added, _ in stats.values())
    total_removed = sum(removed for _, removed in stats.values())
    print(f"{len(diffs)} files  +{total_added} −{total_removed}")
    print(f"wrote {args.out}  ({len(html.encode()) / 1024:.0f} KiB)")
    print(f"links   {forge if forge is not None else 'none (nothing to link to)'}")
    print(f"id      {identifier}  (ticks and notes live in a directory of this name)")
    if empty:
        print(f"warning: no diff found for {len(empty)} file(s):", file=sys.stderr)
        for path in empty:
            print(f"  {path}", file=sys.stderr)


if __name__ == "__main__":
    main()
