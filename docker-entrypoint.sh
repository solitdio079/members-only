#!/bin/sh
set -eu

echo "Preparing database schema..."
npm run db:init

exec "$@"
