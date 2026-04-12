"use client";

import { useState } from "react";
import { testimonials, juices } from "@/lib/data";
import Link from "next/link";

interface ReviewSubmission {
  name: string;
  email: string;
  phone: string;
  rating: number;
  text: string;
  juiceUsed: string;
  result: string;
}

interface SubmittedReview extends ReviewSubmission {
  id: string;
  createdAt: string;
}

export default function ReviewPage() {
  const [allReviews, setAllReviews] = useState<SubmittedReview[]>(
    testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      email: "",
      phone: "",
      rating: 5,
      text: t.text,
      juiceUsed: t.juiceUsed,
      result: t.result,
      createdAt: new Date().toISOString(),
    }))
  );

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterJuice, setFilterJuice] = useState<string | null>(null);

  const filteredReviews = allReviews.filter((review) => {
    if (filterRating && review.rating !== filterRating) return false;
    if (filterJuice && review.juiceUsed !== filterJuice) return false;
    return true;
  });

  const averageRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  return (
    <main className="min-h-screen bg-[#fafaf7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Customer Reviews
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover why thousands of people love MediXpert juices. Read real stories of transformation and health improvement.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="px-6 py-8 bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-3xl font-extrabold text-emerald-700">
                {allReviews.length}+
              </p>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {averageRating.toFixed(1)} average rating
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            ✓ Share Your Review
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-gray-600 mb-4">Filter by:</p>
          <div className="flex flex-wrap gap-3">
            {/* Rating Filter */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Rating</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterRating(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filterRating === null
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All
                </button>
                {[5, 4, 3].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      filterRating === rating
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {rating}⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Juice Filter */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Juice</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterJuice(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filterJuice === null
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All Juices
                </button>
                {Array.from(new Set(allReviews.map((r) => r.juiceUsed))).map(
                  (juice) => (
                    <button
                      key={juice}
                      onClick={() => setFilterJuice(juice)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        filterJuice === juice
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {juice}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredReviews.length} review
          {filteredReviews.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &quot;{review.text}&quot;
              </p>

              {/* Result Badge */}
              <div className="mb-4 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-xs font-semibold text-emerald-700">
                  ✓ {review.result}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">
                {/* Name */}
                <p className="font-semibold text-gray-900 text-sm">
                  {review.name}
                </p>

                {/* Juice Used */}
                <span className="inline-block text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium mt-2">
                  Used: {review.juiceUsed}
                </span>

                {/* Date */}
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No reviews match your filters.</p>
            <button
              onClick={() => {
                setFilterRating(null);
                setFilterJuice(null);
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-emerald-50 border-t border-emerald-100 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-emerald-900 mb-3">
            Join Our Wellness Community
          </h2>
          <p className="text-emerald-700 mb-6">
            Haven&apos;t tried MediXpert yet? Start your transformation today.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Explore Our Juices
          </Link>
        </div>
      </section>

      {/* Submit Review Modal */}
      {showSubmitModal && (
        <SubmitReviewModal
          onClose={() => setShowSubmitModal(false)}
          onSubmit={(newReview) => {
            const review: SubmittedReview = {
              ...newReview,
              id: `review-${Date.now()}`,
              createdAt: new Date().toISOString(),
            };
            setAllReviews([review, ...allReviews]);
            setShowSubmitModal(false);
          }}
        />
      )}
    </main>
  );
}

// Submit Review Modal Component
interface SubmitReviewModalProps {
  onClose: () => void;
  onSubmit: (review: ReviewSubmission) => void;
}

function SubmitReviewModal({ onClose, onSubmit }: SubmitReviewModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [juiceUsed, setJuiceUsed] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!text.trim() || text.trim().length < 20)
      newErrors.text = "Review must be at least 20 characters";
    if (!juiceUsed) newErrors.juiceUsed = "Please select a juice";
    if (!result.trim()) newErrors.result = "Please share your result/benefit";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        rating,
        text: text.trim(),
        juiceUsed,
        result: result.trim(),
      });

      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "Failed to submit review",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600">
            Your review has been submitted and will appear after verification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Share Your Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="9876543210"
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRating(r)}
                  className={`text-3xl transition-opacity ${
                    r <= rating
                      ? "text-yellow-400 opacity-100"
                      : "text-gray-300 opacity-50 hover:opacity-75"
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Juice Used */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Which juice did you use? *
            </label>
            <select
              value={juiceUsed}
              onChange={(e) => setJuiceUsed(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.juiceUsed ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a juice</option>
              {juices.map((juice) => (
                <option key={juice.id} value={juice.name}>
                  {juice.name}
                </option>
              ))}
            </select>
            {errors.juiceUsed && (
              <p className="text-red-600 text-xs mt-1">{errors.juiceUsed}</p>
            )}
          </div>

          {/* Result */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What benefit did you experience? *
            </label>
            <input
              type="text"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.result ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Better energy, improved digestion"
            />
            {errors.result && (
              <p className="text-red-600 text-xs mt-1">{errors.result}</p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review *
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience with MediXpert (minimum 20 characters)"
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.text ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.text && (
              <p className="text-red-600 text-xs mt-1">{errors.text}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {text.length} / 20 characters minimum
            </p>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.submit}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}