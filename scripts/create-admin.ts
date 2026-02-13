import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../lib/supabase/client';

async function createAdminUser() {
  try {
    const email = 'admin@aframecabins.com';
    const password = 'admin123';
    const fullName = 'Admin User';

    // Check if admin already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      console.log('✅ Admin user already exists:', email);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          email: email.toLowerCase(),
          password_hash: passwordHash,
          full_name: fullName,
          role: 'admin',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating admin user:', error);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Role:', data.role);
  } catch (error) {
    console.error('❌ Script error:', error);
  }
}

createAdminUser();
