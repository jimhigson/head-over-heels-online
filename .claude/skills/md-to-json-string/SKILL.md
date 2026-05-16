---
name: md-to-json-string
description: Convert a markdown file to a JSON array of strings for embedding inline in room JSON scroll configs
argument-hint: [file-path]
---

Convert the markdown file at the given path to a JSON array of strings (one element per line), preserving unicode characters (like curly apostrophes) as `\uXXXX` escape sequences. This format is used for `"markdown"` fields in inline scroll configs — the array is joined with `"\n"` at runtime.

Run this command, substituting the file path from $ARGUMENTS:

```bash
node -e 'var fs = require("fs"); var s = fs.readFileSync("$ARGUMENTS", "utf8"); var lines = s.replace(/\n$/, "").split("\n"); var escaped = JSON.stringify(lines).replace(/[\u0080-\uffff]/g, function(c) { var hex = c.charCodeAt(0).toString(16); while(hex.length < 4) hex = "0" + hex; return "\\u" + hex; }); process.stdout.write(escaped);'
```

Output the result in a `json` code block.
