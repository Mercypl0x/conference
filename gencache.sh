#!/bin/bash
set -e

# TODO: Add anything that should be excluded from cache to the list below (glob patterns).
# Uses the full path (starting with docs/).
excluded=(
  '*.mp4'
  'docs/reports/*'
)

printf "Excluding %s from cache\n" "${excluded[@]}"

# Create an array of parameters for find.
# find expects "! -wholename '<glob>'" for excluding files, using -wholename
# here instead of name to exclude based on path too (e.g. docs/reports).
excluded=("${excluded[@]/#/! -wholename }")

files="$(\
  # Collect exclusion parameters
  printf "%s\n" "${excluded[@]}" |
  # Find all files and dirs in docs/ that are not excluded from cache
  xargs find public |
  # Ensure directories have trailing slash
  xargs ls --file-type -d |
  # Remove public/, wrap with double quotes, append comma
  sed 's/^public\//"/;s/$/", /' |
  # Sort files to easily verify that both PowerShell and Bash gives same output
  sort
)"

echo "Found $(echo "$files" | wc -l) files to cache"

# Make the file list a single line.
files="$(echo "$files" | tr -d '\n')"

# Insert list of files into docs/sw.js CACHED variable.
sed -i "s%let CACHED = \[\]\;%let CACHED = \[$files\]\;%;" public/sw.js
