import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const allReviews = await db.getAllReviews();
    const reviews = allReviews.filter(r => r.status === 'approved');
    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, cabin, rating, comment } = body;

    // Validate input
    if (!name || !email || !cabin || !rating || !comment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create review (pending approval by default)
    const review = await db.createReview({
      name,
      email,
      cabin,
      rating: parseInt(rating),
      comment,
      status: 'approved' // Auto-approve for now, can be 'pending' if you want manual approval
    });

    return NextResponse.json({
      success: true,
      review
    });
  } catch (error: any) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}
