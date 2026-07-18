#!/bin/bash
# Ensures the project's required Node version (from .node-version) is
# installed and first on PATH in Claude Code web sandbox sessions, which
# provision an older Node. Tests fail on the sandbox default with
# `bytes.toBase64 is not a function` - see CLAUDE.md "Running".
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

requiredMajor="$(tr -d '[:space:]' <"${CLAUDE_PROJECT_DIR}/.node-version")"

# resolve the newest release of that major (index.json is ordered newest-first)
nodeVersion="$(curl -sSL https://nodejs.org/dist/index.json |
  grep -oE "\"v${requiredMajor}\.[0-9]+\.[0-9]+\"" | head -1 | tr -d '"')"

if [ -z "${nodeVersion}" ]; then
  echo "could not resolve a Node v${requiredMajor}.x release from nodejs.org" >&2
  exit 1
fi

installDir="/opt/node-${nodeVersion}"

if [ ! -x "${installDir}/bin/node" ]; then
  tmpTar="$(mktemp --suffix=.tar.xz)"
  curl -sSL -o "${tmpTar}" "https://nodejs.org/dist/${nodeVersion}/node-${nodeVersion}-linux-x64.tar.xz"
  mkdir -p "${installDir}"
  tar xf "${tmpTar}" -C "${installDir}" --strip-components=1
  rm -f "${tmpTar}"
fi

"${installDir}/bin/node" --version

echo "export PATH=\"${installDir}/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
