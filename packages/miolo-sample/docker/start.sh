#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTAINER_NAME="${1:-miolo-sample}"

cd "$SCRIPT_DIR"

echo "[$CONTAINER_NAME] Is container up?..."
if docker ps --filter "name=^/${CONTAINER_NAME}$" --format '{{.Status}}' | grep -q 'Up'; then
  "$SCRIPT_DIR/stop.sh" "$CONTAINER_NAME"
fi

echo "[$CONTAINER_NAME] Starting container..."
docker compose start "$CONTAINER_NAME"

echo "[$CONTAINER_NAME] Waiting for container to be ready..."
while ! docker ps --filter "name=^/${CONTAINER_NAME}$" --format '{{.Status}}' | grep -q 'Up'; do
  sleep 1
done

echo "[$CONTAINER_NAME] Starting app..."
docker compose exec -d "$CONTAINER_NAME" npm run start

