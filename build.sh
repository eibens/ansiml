# Exit if one command fails.
set -e

# Lint and format.
deno lint
deno fmt --check

# Run tests and generate coverage profile.
deno test -A --unstable --coverage=.cov

# Print coverage info to stdout.
deno coverage --unstable .cov

# Generate coverage file.
deno coverage --lcov .cov > mod.lcov

# Delete coverage profile.
rm -rf .cov
