#!/bin/bash
set -euo pipefail

excluded=(
  '*.mp4'
  'reports/*'
)

printf "Excluding %s from cache\n" "${excluded[@]}"

find_excludes=()
for pat in "${excluded[@]}"; do
  find_excludes+=( ! -path "public/$pat" )
done

files=$(
  find public -type f "${find_excludes[@]}" \
    | sed 's%^public/%%' \
    | sort \
    | sed 's%^%\"%; s%$%\", %'
)

echo "Found $(echo "$files" | wc -l) files to cache"

files="$(echo "$files" | tr -d '\n')"

sed -i "s%let CACHED = \[\]\;%let CACHED = \[$files\]\;%;" public/sw.js
