# Supabase Database Setup - Final Step

## You need to run the SQL schema to create the database tables!

### Step 1: Open SQL Editor in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: **olsfqfgawnyokgitcpso**
3. Click on **SQL Editor** in the left sidebar (icon looks like `</>`)

### Step 2: Copy the SQL Schema

Open this file: `lib/supabase/schema.sql`

Copy ALL the SQL code (it's about 100 lines)

### Step 3: Run the SQL

1. In the SQL Editor, click **New Query**
2. Paste all the SQL code
3. Click **Run** button (or press Ctrl+Enter / Cmd+Enter)
4. You should see: "Success. No rows returned"

### Step 4: Verify Tables Were Created

1. Click on **Table Editor** in the left sidebar
2. You should see two tables:
   - ✅ **bookings**
   - ✅ **reviews**

If you see both tables, you're done! ✅

---

## Troubleshooting

**If you get an error:**
- Make sure you copied the ENTIRE schema.sql file
- Make sure you're in the SQL Editor (not Table Editor)
- Try running it in smaller chunks if needed

**If tables already exist:**
- That's fine! The schema uses `CREATE TABLE IF NOT EXISTS`
- It won't duplicate or break anything

---

## Next Steps

After running the SQL:

**Tell me:** "Tables created" or "SQL ran successfully"

Then I'll:
1. Switch the code to use Supabase instead of localStorage
2. Restart the server
3. Test that everything works
4. You'll have a real database! 🎉

---

**Quick Path:**

```
Supabase Dashboard → SQL Editor → New Query → Paste schema.sql → Run
```

That's it! Let me know when it's done.
