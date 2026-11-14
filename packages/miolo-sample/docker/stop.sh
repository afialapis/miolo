#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTAINER_NAME="${1:-miolo-sample}"

cd "$SCRIPT_DIR"

echo "[$CONTAINER_NAME] Stopping app..."
docker compose exec -d "$CONTAINER_NAME" npm run stop || true

echo "[$CONTAINER_NAME] Stopping container..."
docker compose stop "$CONTAINER_NAME"

