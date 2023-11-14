#!/bin/bash

compare_versions() {
  IFS='.' read -ra current_parts <<< "$1"
  IFS='.' read -ra previous_parts <<< "$2"

  for i in "${!current_parts[@]}"; do
    if (( ${current_parts[i]} > ${previous_parts[i]} )); then
      return 0
    elif (( ${current_parts[i]} < ${previous_parts[i]} )); then
      return 1
    fi
  done

  return 1
}

current_commit=$(git rev-parse HEAD)
previous_commit=$(git rev-parse HEAD~1)

current_version=$(git show $current_commit:app.config.ts | grep "version: '.*'" | head -n 1 | sed -E "s/.*version: '(.*)',/\1/")
previous_version=$(git show $previous_commit:app.config.ts | grep "version: '.*'" | head -n 1 | sed -E "s/.*version: '(.*)',/\1/")

if compare_versions "$current_version" "$previous_version"; then
  echo "Valid version change: $previous_version -> $current_version"
  echo "should_build=true" >> $GITHUB_ENV
  echo "should_build=true" >> $GITHUB_OUTPUT
else
  echo "Invalid version change: $previous_version -> $current_version"
  echo "should_build=false" >> $GITHUB_ENV
  echo "should_build=false" >> $GITHUB_OUTPUT
fi