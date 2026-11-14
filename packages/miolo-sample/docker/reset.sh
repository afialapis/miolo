#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTAINER_NAME="${1:-miolo-sample}"

cd "$PROJECT_DIR"
git pull

cd "$SCRIPT_DIR"

echo "[$CONTAINER_NAME] Is container up?..."
if docker ps --filter "name=^/${CONTAINER_NAME}$" --format '{{.Status}}' | grep -q 'Up'; then
  "$SCRIPT_DIR/stop.sh" "$CONTAINER_NAME"
fi

echo "[$CONTAINER_NAME] Resetting container ($CONTAINER_NAME)..."
docker compose up --build -d "$CONTAINER_NAME"
docker compose up --force-recreate --no-deps -d "$CONTAINER_NAME"

echo "[$CONTAINER_NAME] Waiting for container to be ready..."
while ! docker ps --filter "name=^/${CONTAINER_NAME}$" --format '{{.Status}}' | grep -q 'Up'; do
  sleep 1
done

echo "[$CONTAINER_NAME] Installing dependencies..."
docker compose exec "$CONTAINER_NAME" npm i

echo "[$CONTAINER_NAME] Starting app..."
docker compose exec -d "$CONTAINER_NAME" npm run start

