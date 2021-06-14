# Exit if one command fails.
set -e

# Lint and format.
deno lint
deno fmt

# Run tests and generate coverage profile.
deno test \
-A \
--unstable \
--coverage=.cov

# Print coverage info to stdout.
deno coverage \
--unstable \
.cov

# Generate coverage file.
deno coverage \
--lcov \
.cov \
> mod.lcov

# Delete coverage profile.
rm -rf .cov

# Generate bundle
deno bundle mod.ts mod.js
deno fmt mod.js

# The developer must ensure that all files are updated.
# Therefore, we fail if there are uncommitted changes.
status=$(git status --porcelain)
if [ -n "$status" ]; then
  echo "Repository contains changed files."
  exit 1
fi
