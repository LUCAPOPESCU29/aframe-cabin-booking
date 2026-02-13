import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST() {
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
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists',
        email
      });
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
      console.error('Error creating admin:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully!',
      email,
      password,
      role: data.role
    });
  } catch (error: any) {
    console.error('Script error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
