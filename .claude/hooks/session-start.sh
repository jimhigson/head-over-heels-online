#!/bin/bash
# Ensures the project's required Node version (26, per .node-version) is
# installed and first on PATH in Claude Code web sandbox sessions, which
# provision an older Node. Tests fail on the sandbox default (22) with
# `bytes.toBase64 is not a function` - see CLAUDE.md "Running".
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

nodeVersion="v26.5.0"
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
