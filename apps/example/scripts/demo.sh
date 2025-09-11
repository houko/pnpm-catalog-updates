#!/bin/bash

# PCU Demo Script
# This script demonstrates common pnpm-catalog-updates workflows

set -e

echo "🚀 PCU Demo Script"
echo "=================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Helper function to run commands with nice output
run_command() {
    echo -e "${BLUE}➤ $1${NC}"
    echo -e "${YELLOW}Command: $2${NC}"
    echo ""
    eval "$2"
    echo ""
    echo -e "${GREEN}✓ Completed${NC}"
    echo "----------------------------------------"
    echo ""
}

# Demo 1: Show workspace info
run_command "Demo 1: Show workspace information" \
    "pnpm dlx pnpm-catalog-updates workspace --stats"

# Demo 2: Check for updates (table format)
run_command "Demo 2: Check for updates (table format)" \
    "pnpm dlx pnpm-catalog-updates check --format table"

# Demo 3: Check for updates (minimal format)
run_command "Demo 3: Check for updates (minimal format)" \
    "pnpm dlx pnpm-catalog-updates check --format minimal"

# Demo 4: Check specific catalog
run_command "Demo 4: Check React 17 catalog specifically" \
    "pnpm dlx pnpm-catalog-updates check --catalog react17"

# Demo 5: Dry run update
run_command "Demo 5: Preview updates (dry run)" \
    "pnpm dlx pnpm-catalog-updates update --dry-run --format table"

# Demo 6: Analyze specific package
run_command "Demo 6: Analyze React update impact" \
    "pnpm dlx pnpm-catalog-updates analyze default react"

# Demo 7: Check with JSON output
run_command "Demo 7: Machine-readable output (JSON)" \
    "pnpm dlx pnpm-catalog-updates check --format json"

echo ""
echo -e "${GREEN}🎉 Demo completed!${NC}"
echo ""
echo "Next steps you can try:"
echo "  • pnpm dlx pnpm-catalog-updates update --interactive"
echo "  • pnpm dlx pnpm-catalog-updates check --include 'react*'"
echo "  • pnpm dlx pnpm-catalog-updates update --target minor"
echo ""
echo "📖 For more options: pnpm dlx pnpm-catalog-updates --help"