#!/bin/bash

# Push to GitHub
# If you get an authentication error, you need to:
# 1. Create a Personal Access Token at: https://github.com/settings/tokens/new
# 2. Run: git push https://LUCAPOPESCU29:YOUR_TOKEN@github.com/LUCAPOPESCU29/aframe-cabin-booking.git main

echo "Attempting to push to GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "To fix this, create a Personal Access Token:"
    echo "1. Go to: https://github.com/settings/tokens/new"
    echo "2. Name it: 'Vercel Deployment'"
    echo "3. Select scope: 'repo' (Full control of private repositories)"
    echo "4. Click 'Generate token' and copy it"
    echo ""
    echo "Then run:"
    echo "git push https://LUCAPOPESCU29:YOUR_TOKEN@github.com/LUCAPOPESCU29/aframe-cabin-booking.git main"
    echo ""
    echo "Replace YOUR_TOKEN with the token you just created"
fi
