#!/bin/bash

# PCU Update Workflow Script
# A guided workflow for safely updating dependencies

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🔄 PCU Update Workflow${NC}"
echo "========================"
echo ""

# Step 1: Validate workspace
echo -e "${BLUE}Step 1: Validating workspace...${NC}"
if pnpm dlx pnpm-catalog-updates workspace --validate; then
    echo -e "${GREEN}✓ Workspace is valid${NC}"
else
    echo -e "${RED}✗ Workspace validation failed${NC}"
    exit 1
fi
echo ""

# Step 2: Check for updates
echo -e "${BLUE}Step 2: Checking for available updates...${NC}"
pnpm dlx pnpm-catalog-updates check --format table
echo ""

# Step 3: Show impact analysis (optional)
echo -e "${YELLOW}Step 3: Do you want to analyze impact for any specific package? (y/N)${NC}"
read -r analyze_choice
if [[ $analyze_choice =~ ^[Yy]$ ]]; then
    echo "Enter catalog name (default/react17/latest/etc):"
    read -r catalog_name
    echo "Enter package name:"
    read -r package_name
    
    if [[ -n "$catalog_name" && -n "$package_name" ]]; then
        echo -e "${BLUE}Analyzing impact for $catalog_name/$package_name...${NC}"
        pnpm dlx pnpm-catalog-updates analyze "$catalog_name" "$package_name"
        echo ""
    fi
fi

# Step 4: Choose update strategy
echo -e "${YELLOW}Step 4: Choose update strategy:${NC}"
echo "1) Interactive update (recommended)"
echo "2) Minor updates only"
echo "3) Patch updates only"
echo "4) Latest updates"
echo "5) Dry run first"
echo "6) Cancel"
echo ""
echo "Enter your choice (1-6):"
read -r choice

case $choice in
    1)
        echo -e "${BLUE}Starting interactive update...${NC}"
        pnpm dlx pnpm-catalog-updates update --interactive --create-backup
        ;;
    2)
        echo -e "${BLUE}Updating to minor versions...${NC}"
        pnpm dlx pnpm-catalog-updates update --target minor --create-backup
        ;;
    3)
        echo -e "${BLUE}Updating to patch versions...${NC}"
        pnpm dlx pnpm-catalog-updates update --target patch --create-backup
        ;;
    4)
        echo -e "${BLUE}Updating to latest versions...${NC}"
        pnpm dlx pnpm-catalog-updates update --target latest --create-backup --interactive
        ;;
    5)
        echo -e "${BLUE}Running dry run...${NC}"
        pnpm dlx pnpm-catalog-updates update --dry-run --format table
        echo ""
        echo -e "${YELLOW}Do you want to apply these changes? (y/N)${NC}"
        read -r apply_choice
        if [[ $apply_choice =~ ^[Yy]$ ]]; then
            pnpm dlx pnpm-catalog-updates update --create-backup
        else
            echo "Update cancelled."
            exit 0
        fi
        ;;
    6)
        echo "Update cancelled."
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

echo ""

# Step 5: Post-update steps
if [[ $choice != 6 && $choice != 5 ]]; then
    echo -e "${BLUE}Step 5: Post-update verification...${NC}"
    
    echo "Installing updated dependencies..."
    pnpm install
    
    echo ""
    echo -e "${YELLOW}Running post-update checks (recommended):${NC}"
    echo "1) Type checking: pnpm typecheck"
    echo "2) Linting: pnpm lint"
    echo "3) Testing: pnpm test"
    echo "4) Building: pnpm build"
    echo ""
    echo "Run these commands? (Y/n)"
    read -r verify_choice
    
    if [[ ! $verify_choice =~ ^[Nn]$ ]]; then
        echo -e "${BLUE}Running verification...${NC}"
        
        if command -v pnpm run typecheck &> /dev/null; then
            echo "Type checking..."
            pnpm run typecheck || echo -e "${YELLOW}⚠ Type checking failed${NC}"
        fi
        
        if command -v pnpm run lint &> /dev/null; then
            echo "Linting..."
            pnpm run lint || echo -e "${YELLOW}⚠ Linting failed${NC}"
        fi
        
        if command -v pnpm run test &> /dev/null; then
            echo "Testing..."
            pnpm run test || echo -e "${YELLOW}⚠ Tests failed${NC}"
        fi
        
        if command -v pnpm run build &> /dev/null; then
            echo "Building..."
            pnpm run build || echo -e "${YELLOW}⚠ Build failed${NC}"
        fi
    fi
fi

echo ""
echo -e "${GREEN}🎉 Update workflow completed!${NC}"
echo ""
echo -e "${PURPLE}Summary of available commands:${NC}"
echo "  • pcu check              - Check for updates"
echo "  • pcu update --interactive  - Interactive update"
echo "  • pcu workspace --stats  - Workspace statistics"
echo "  • pcu analyze <catalog> <package>  - Impact analysis"
echo ""
echo "📖 Full documentation: https://github.com/houko/pnpm-catalog-updates"