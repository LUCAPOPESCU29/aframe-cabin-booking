'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Trash2, Check, X, AlertCircle } from 'lucide-react';
import { db, Review } from '@/lib/db';
import { Button } from '@/components/ui/button';

interface AdminReviewsProps {
  onUpdate: () => void;
}

export function AdminReviews({ onUpdate }: AdminReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const allReviews = await db.getAllReviews();
    setReviews(allReviews.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.cabin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await db.deleteReview(id);
      loadReviews();
      onUpdate();
    }
  };

  const handleStatusChange = async (id: number, status: Review['status']) => {
    await db.updateReview(id, { status });
    loadReviews();
    onUpdate();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-[#ffc73a] stroke-[#ffc73a]' : 'fill-transparent stroke-[#666]'}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-body)]" size={20} />
            <input
              type="text"
              placeholder="Search by name, cabin, or comment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-body)]" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full pl-10 pr-4 py-3 border-2 border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[var(--brown-deep)]">{review.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      review.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : review.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {review.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-body)]">{review.email}</p>
              </div>

              <button
                onClick={() => handleDelete(review.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Rating and Cabin */}
            <div className="flex items-center justify-between mb-3">
              {renderStars(review.rating)}
              <span className="text-sm font-medium text-[var(--green-deep)]">{review.cabin}</span>
            </div>

            {/* Comment */}
            <p className="text-sm text-[var(--text-body)] leading-relaxed mb-4">
              {review.comment}
            </p>

            {/* Date */}
            <p className="text-xs text-[var(--text-body)] mb-4">
              {new Date(review.createdAt).toLocaleString()}
            </p>

            {/* Actions */}
            {review.status !== 'approved' && (
              <div className="flex gap-2 pt-4 border-t border-[var(--tan-light)]">
                <Button
                  onClick={() => handleStatusChange(review.id, 'approved')}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 rounded-full text-sm"
                  size="sm"
                >
                  <Check size={16} className="mr-1" />
                  Approve
                </Button>
                {review.status !== 'rejected' && (
                  <Button
                    onClick={() => handleStatusChange(review.id, 'rejected')}
                    variant="outline"
                    className="flex-1 border-red-600 text-red-600 hover:bg-red-50 rounded-full text-sm"
                    size="sm"
                  >
                    <X size={16} className="mr-1" />
                    Reject
                  </Button>
                )}
              </div>
            )}

            {review.status === 'approved' && (
              <div className="flex gap-2 pt-4 border-t border-[var(--tan-light)]">
                <Button
                  onClick={() => handleStatusChange(review.id, 'rejected')}
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50 rounded-full text-sm"
                  size="sm"
                >
                  <X size={16} className="mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </motion.div>
        ))}

        {filteredReviews.length === 0 && (
          <div className="col-span-2 bg-white rounded-xl shadow-sm p-12 text-center">
            <Star size={48} className="mx-auto text-[var(--tan-light)] mb-4" />
            <p className="text-[var(--text-body)]">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  );
}
