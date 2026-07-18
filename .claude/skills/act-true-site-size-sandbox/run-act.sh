#!/usr/bin/env bash
cd /home/user/head-over-heels-online
act pull_request -W /tmp/tss-local.yml \
  --container-architecture linux/amd64 \
  -P ubuntu-latest=hoh-act-runner --pull=false \
  --action-offline-mode \
  --local-repository actions/checkout@v6=/tmp/act-actions/checkout \
  --local-repository pnpm/action-setup@v5=/tmp/act-actions/action-setup \
  --local-repository actions/setup-node@v6=/tmp/act-actions/setup-node \
  --local-repository jimhigson/true-site-size@main=/tmp/act-actions/true-site-size \
  -s GITHUB_TOKEN="$GITHUB_TOKEN" \
  --env TRUE_SITE_SIZE_OUTPUT_FILE=/tmp/tss-out/comment.md \
  --env NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt \
  --env NODE_OPTIONS=--use-openssl-ca \
  --container-options "-v /tmp/tss-out:/tmp/tss-out" \
  -e /tmp/tss-event.json
echo "ACT_EXIT=$?"
