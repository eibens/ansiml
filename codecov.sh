#!/bin/bash

# Exit if one command fails.
set -e

# First argument is the coverage file.
COV_FILE=$1

# Only run this from GitHub Actions.
if [ "$CI" = true ]; then
  # Upload coverage file.
  bash <(curl -s https://codecov.io/bash) -f $COV_FILE
fi
