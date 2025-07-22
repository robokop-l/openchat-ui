#!/bin/bash

# This script initializes a new Git repository and prepares it for GitHub

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed. Please install git first."
    exit 1
fi

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files to git
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: OpenChat UI"

echo ""
echo "Repository initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Run the following commands to push to GitHub:"
echo "   git remote add origin https://github.com/robokop-l/openchat-ui.git"
echo "   git branch -M main"
echo "   git push -u origin main"