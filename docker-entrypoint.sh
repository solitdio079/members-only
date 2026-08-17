#!/bin/sh
set -eu

echo "Preparing database schema..."
node db/init.js

exec "$@"
