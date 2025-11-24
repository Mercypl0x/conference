#!/bin/bash
set -euo pipefail

# Glob patterns to exclude (relative to public/)
excluded=(
  '*.mp4'
  'reports/*'
)

printf "Excluding %s from cache\n" "${excluded[@]}"

# Build find exclusion args.
find_excludes=()
for pat in "${excluded[@]}"; do
  find_excludes+=( ! -path "public/$pat" )
done

# Find all files under public/ that are not excluded.
# Output paths relative to public/, quoted, comma-separated.
files=$(
  find public -type f "${find_excludes[@]}" \
    | sed 's%^public/%%' \
    | sort \
    | sed 's%^%\"%; s%$%\", %'
)

echo "Found $(echo "$files" | wc -l) files to cache"

# Make it single-line
files="$(echo "$files" | tr -d '\n')"

# Insert list into public/sw.js CACHED variable.
# Expects a line like: let CACHED = [];
sed -i "s%let CACHED = \[\]\;%let CACHED = \[$files\]\;%;" public/sw.js
