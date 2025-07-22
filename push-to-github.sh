#!/bin/bash

# This script pushes the repository to GitHub

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed. Please install git first."
    exit 1
fi

# Check if .git directory exists
if [ ! -d ".git" ]; then
    echo "Error: This is not a git repository. Please run setup-github.sh first."
    exit 1
fi

# Add remote if it doesn't exist
if ! git remote | grep -q "origin"; then
    echo "Adding remote origin..."
    git remote add origin https://github.com/robokop-l/openchat-ui.git
fi

# Make sure we're on the main branch
git branch -M main

# Add all files to git
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
else
    # Commit changes
    echo "Committing changes..."
    git commit -m "Update project to OpenChat UI"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "Repository pushed to GitHub successfully!"
echo "Visit https://github.com/robokop-l/openchat-ui to see your repository."