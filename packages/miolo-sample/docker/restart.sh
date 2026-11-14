#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTAINER_NAME="${1:-miolo-sample}"

"$SCRIPT_DIR/start.sh" "$CONTAINER_NAME"

