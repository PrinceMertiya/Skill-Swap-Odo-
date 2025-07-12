import React, { useState } from 'react';
import { X, Star, Send, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

interface RatingModalProps {
  requestId: string;
  onClose: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ requestId, onClose }) => {
  const { swapRequests, addRating, getUserById } = useApp();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const request = swapRequests.find(req => req.id === requestId);
  
  if (!user || !request) return null;

  const otherUserId = request.fromUserId === user.id ? request.toUserId : request.fromUserId;
  const otherUser = getUserById(otherUserId);

  if (!otherUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    addRating({
      fromUserId: user.id,
      toUserId: otherUserId,
      swapRequestId: requestId,
      rating,
      feedback: feedback || `Great experience exchanging skills with ${otherUser.name}!`
    });

    onClose();
    setIsSubmitting(false);
  };

  const ratingLabels = {
    1: 'Poor experience',
    2: 'Below expectations',
    3: 'Good experience',
    4: 'Great experience',
    5: 'Excellent experience'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card-elevated max-w-md w-full p-0 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Rate Your Experience</h2>
                <p className="text-amber-100 text-sm">Help others learn about this collaboration</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Exchange Summary */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                <span className="text-slate-700 font-semibold text-sm">
                  {otherUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Skill exchange with:</p>
                <p className="font-bold text-slate-900">{otherUser.name}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-slate-200">
              <p className="text-sm text-slate-600 text-center">
                <span className="font-medium text-accent-600">{request.skillOffered}</span>
                {' ↔ '}
                <span className="font-medium text-emerald-600">{request.skillRequested}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                How was your experience?
              </label>
              <div className="flex justify-center space-x-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-2 hover:scale-110 transition-transform duration-200"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors duration-200 ${
                        star <= rating
                          ? 'text-amber-400 fill-current'
                          : 'text-slate-300 hover:text-amber-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm font-medium text-slate-600">
                {ratingLabels[rating as keyof typeof ratingLabels]}
              </p>
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Share your feedback (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Tell others about your experience..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Rating'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};