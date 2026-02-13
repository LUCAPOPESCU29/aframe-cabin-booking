#!/bin/bash

echo "🚀 A-Frame Cabin Booking - Vercel Deployment Script"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project detected: A-Frame Cabin Booking"
echo ""

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npx vercel@latest --version > /dev/null 2>&1
fi

echo ""
echo "Choose deployment option:"
echo "1. Deploy to Vercel (requires login)"
echo "2. Just show me what to do"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🔐 Logging in to Vercel..."
        npx vercel login
        
        echo ""
        echo "🚀 Deploying to Vercel..."
        npx vercel
        
        echo ""
        echo "✅ Deployment initiated!"
        echo ""
        echo "📝 IMPORTANT: Don't forget to:"
        echo "   1. Add environment variables in Vercel dashboard"
        echo "   2. Run database migrations in Supabase"
        echo "   3. Test your deployment"
        echo ""
        echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
        ;;
    2)
        echo ""
        echo "📖 Deployment Instructions:"
        echo ""
        echo "Option A - Vercel Dashboard (Easiest):"
        echo "  1. Go to vercel.com and sign up/login"
        echo "  2. Click 'Add New Project'"
        echo "  3. Upload this folder or connect GitHub"
        echo "  4. Click 'Deploy'"
        echo ""
        echo "Option B - Command Line:"
        echo "  1. Run: npx vercel login"
        echo "  2. Run: npx vercel"
        echo "  3. Follow the prompts"
        echo ""
        echo "📖 Full guide: DEPLOYMENT_GUIDE.md"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
