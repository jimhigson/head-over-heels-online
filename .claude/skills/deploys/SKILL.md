---
name: deploys
description: How the game and editor are released, hosted and deployed (Cloudflare R2, blockstack.dev / blockstack.ing, release-please → release-triggered deploys, db migrations). Use when working on deploys, releases, hosting, CI deploy workflows, or R2.
---

Read [DEPLOY.md](../../../DEPLOY.md) at the repo root - it is the single source of truth for deploys.

For the live state of what is configured only in Cloudflare (rules, domain bindings, DNS), use the cloudflare MCP.

If cloudflare MCP sign-in lands on "Invalid request: Invalid client_id", Claude Code has cached a client registration that Cloudflare no longer recognises. `/mcp` has no option to clear it, so delete the `cloudflare|…` entry under `mcpOAuth` in the macOS Keychain item "Claude Code-credentials", then sign in again to register a new client.
