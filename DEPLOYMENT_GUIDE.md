# 🚀 Vercel Deployment Guide for A-Frame Cabin Booking

## Prerequisites

Your code is ready for deployment! Git repository initialized and committed.

## Step 1: Deploy to Vercel (2 minutes)

### Option A: Using Vercel Dashboard (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Click "Import Git Repository"
4. Import this folder by:
   - Upload the entire `/Users/lucapopescu/Downloads/azuga/aframe-cabin-booking` folder
   - OR connect your GitHub account and push this repo to GitHub first
5. Vercel will auto-detect Next.js settings ✅
6. Click "Deploy"

### Option B: Using Vercel CLI

Run these commands in your terminal:

```bash
cd /Users/lucapopescu/Downloads/azuga/aframe-cabin-booking
npx vercel login
npx vercel
```

Follow the prompts:
- Link to existing project? → No
- Project name? → aframe-cabin-booking (or your choice)
- Directory? → Press Enter (use current)
- Build settings? → Press Enter (auto-detected)

## Step 2: Configure Environment Variables

After deployment, add these environment variables in Vercel dashboard:

### In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=aframe-cabins-secret-key-change-in-production-2024
RESEND_API_KEY=your_resend_api_key
```

### Get Your Supabase Keys:
1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

### Get Your Resend API Key:
1. Go to [resend.com](https://resend.com)
2. API Keys → Create API Key
3. Copy the key → `RESEND_API_KEY`

## Step 3: Redeploy with Environment Variables

After adding environment variables:
- Vercel Dashboard → Deployments → Click "..." → Redeploy

OR using CLI:
```bash
npx vercel --prod
```

## Step 4: Set Up Your Database

Your Supabase database needs the tables. Run these SQL scripts in Supabase SQL Editor:

### 1. Create Tables:
```sql
-- Copy from: lib/supabase/schema.sql
```

### 2. Create Admin User:
```sql
-- Copy from: lib/supabase/auth-schema.sql
```

## Step 5: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://aframe-cabin-booking.vercel.app`)
2. Test booking flow:
   - Click "Book Now" → Select cabin → Pick dates → Book
3. Test admin login:
   - Go to `/signin`
   - Email: `admin@aframecabins.com`
   - Password: `admin123`

## 🎯 Quick Commands Reference

```bash
# Deploy to production
npx vercel --prod

# Check deployment status
npx vercel ls

# View logs
npx vercel logs

# Link local to deployed project
npx vercel link
```

## 🔒 Security Checklist

- [ ] Changed `JWT_SECRET` to a secure random string
- [ ] Environment variables added to Vercel
- [ ] `.env.local` is in `.gitignore` (✅ already done)
- [ ] Supabase RLS policies configured
- [ ] Changed default admin password after first login

## 📱 Custom Domain (Optional)

In Vercel Dashboard → Settings → Domains:
1. Add your domain (e.g., `aframecabins.com`)
2. Update DNS records as instructed
3. SSL certificate auto-configured ✅

## 🐛 Troubleshooting

### Build fails?
- Check environment variables are set
- Ensure all dependencies are in `package.json`

### Database connection fails?
- Verify Supabase environment variables
- Check Supabase project is active
- Run the schema SQL scripts

### Emails not sending?
- Verify Resend API key
- Check Resend dashboard for logs
- Ensure sender email is verified in Resend

## 📊 Current Status

✅ Git repository initialized
✅ Initial commit created
✅ Code ready for deployment
✅ Environment example file created
⏳ Ready to deploy to Vercel!

## Next Steps

1. **Deploy now**: Run `npx vercel` in this directory
2. **Add environment variables** in Vercel dashboard
3. **Run database migrations** in Supabase
4. **Test the site**
5. **Invite users!** 🎉

---

Need help? The code is production-ready and well-structured for Vercel's automatic deployment.
