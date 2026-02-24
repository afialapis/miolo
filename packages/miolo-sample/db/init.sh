#!/bin/bash

# Database initialization script for miolo-sample
# Usage: ./db/init.sh <database_name>

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DB_NAME=$1

if [ -z "$DB_NAME" ]; then
  echo -e "${RED}Error: Database name is required${NC}"
  echo "Usage: $0 <database_name>"
  exit 1
fi

echo -e "${GREEN}[miolo-sample] Database initialization${NC}"
echo "Database: $DB_NAME"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_DIR="$SCRIPT_DIR/sql"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
  echo -e "${RED}Error: PostgreSQL client (psql) not found${NC}"
  echo "Please install PostgreSQL first"
  exit 1
fi

# Ask for confirmation
echo ""
read -p "Do you want to create/recreate database '$DB_NAME'? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Database creation skipped"
  echo "Proceeding with SQL execution only..."
else
  # Try to create database with sudo
  echo -e "${YELLOW}Creating database as postgres user (requires sudo)...${NC}"
  
  if sudo -u postgres createdb "$DB_NAME" 2>/dev/null; then
    echo -e "${GREEN}✓ Database '$DB_NAME' created${NC}"
  else
    # Database creation failed - probably already exists, continue anyway
    echo -e "${YELLOW}⚠ Database creation failed (database may already exist)${NC}"
    echo -e "${YELLOW}Continuing with SQL execution...${NC}"
  fi
fi

# Execute SQL files in order
echo ""
echo -e "${YELLOW}Executing SQL files...${NC}"

if [ ! -d "$SQL_DIR" ]; then
  echo -e "${RED}Error: SQL directory not found: $SQL_DIR${NC}"
  exit 1
fi

# Find all .sql files and sort them
SQL_FILES=$(find "$SQL_DIR" -name "*.sql" -type f | sort)

if [ -z "$SQL_FILES" ]; then
  echo -e "${YELLOW}No SQL files found in $SQL_DIR${NC}"
else
  for sql_file in $SQL_FILES; do
    filename=$(basename "$sql_file")
    echo -ne "  Executing $filename... "
    
    if psql -d "$DB_NAME" -f "$sql_file" -U postgres -h localhost -q 2>&1 | grep -q "ERROR"; then
      echo -e "${RED}✗ Failed${NC}"
      exit 1
    else
      echo -e "${GREEN}✓${NC}"
    fi
  done
fi

echo ""
echo -e "${GREEN}✓ Database initialization complete!${NC}"
echo ""
echo "Connection info:"
echo "  Database: $DB_NAME"
echo "  Connect: psql -d $DB_NAME"
