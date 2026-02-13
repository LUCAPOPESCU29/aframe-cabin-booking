#!/bin/bash

echo "=================================="
echo "GitHub Repository Setup"
echo "=================================="
echo ""
echo "Please follow these steps:"
echo ""
echo "1. Go to: https://github.com/new"
echo ""
echo "2. Fill in the following details:"
echo "   - Repository name: aframe-cabin-booking"
echo "   - Description: A-Frame Cabin Booking Website with Next.js and Supabase"
echo "   - Visibility: Choose Public or Private"
echo "   - DO NOT check any boxes (no README, no .gitignore, no license)"
echo ""
echo "3. Click 'Create repository'"
echo ""
echo "4. After creating the repository, come back here and enter your GitHub username:"
read -p "GitHub Username: " username
echo ""

if [ -z "$username" ]; then
    echo "Error: Username cannot be empty"
    exit 1
fi

echo "Great! Now I'll set up the remote and push your code..."
echo ""

# Add remote
git remote add origin "https://github.com/$username/aframe-cabin-booking.git" 2>/dev/null || git remote set-url origin "https://github.com/$username/aframe-cabin-booking.git"

# Push to GitHub
echo "Pushing code to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "=================================="
echo "✅ Success!"
echo "=================================="
echo ""
echo "Your code is now on GitHub at:"
echo "https://github.com/$username/aframe-cabin-booking"
echo ""
echo "Next steps for Vercel deployment:"
echo "1. Go to: https://vercel.com/new"
echo "2. Import your repository: $username/aframe-cabin-booking"
echo "3. Add your environment variables"
echo "4. Click Deploy!"
echo ""
