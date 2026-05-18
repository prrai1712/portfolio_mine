#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../client"

echo "==> Installing dependencies..."
npm ci

echo "==> Building Vite app..."
npm run build

echo "==> Verifying build output..."
test -f dist/index.html
test -d dist/assets
JS_COUNT="$(find dist/assets -name '*.js' | wc -l | tr -d ' ')"
CSS_COUNT="$(find dist/assets -name '*.css' | wc -l | tr -d ' ')"
echo "    JS bundles: ${JS_COUNT}"
echo "    CSS bundles: ${CSS_COUNT}"
test "${JS_COUNT}" -ge 1 || (echo "ERROR: No JS bundle in dist/assets" && exit 1)
test "${CSS_COUNT}" -ge 1 || (echo "ERROR: No CSS bundle in dist/assets" && exit 1)

ls -la dist/
ls -la dist/assets/
echo "==> Build OK"
