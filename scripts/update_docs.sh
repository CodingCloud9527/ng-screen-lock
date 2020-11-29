#!/usr/bin/env bash
set -e

./node_modules/.bin/ng run ng-screen-lock:prerender:github-page
rm -rf docs
mv dist/ng-screen-lock-app/browser docs
git add docs
git commit -m 'docs: update docs'
