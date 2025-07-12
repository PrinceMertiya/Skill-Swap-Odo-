import React, { useState } from 'react';
import { X, Send, ArrowRight, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

interface SwapRequestModalProps {
  targetUserId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const SwapRequestModal: React.FC<SwapRequestModalProps> = ({
  targetUserId,
  onClose,
  onSuccess
}) => {
  const { getUserById, createSwapRequest } = useApp();
  const { user } = useAuth();
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetUser = getUserById(targetUserId);

  if (!user || !targetUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOfferedSkill || !selectedRequestedSkill) {
      return;
    }

    setIsSubmitting(true);

    createSwapRequest({
      fromUserId: user.id,
      toUserId: targetUserId,
      skillOffered: selectedOfferedSkill,
      skillRequested: selectedRequestedSkill,
      message: message || `Hi ${targetUser.name}! I'd like to exchange ${selectedOfferedSkill} for ${selectedRequestedSkill}. Let's connect!`,
      status: 'pending'
    });

    onSuccess();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card-elevated max-w-lg w-full p-0 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Request Skill Exchange</h2>
                <p className="text-slate-300 text-sm">Connect and learn together</p>
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
          {/* Target User Info */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                <span className="text-slate-700 font-semibold">
                  {targetUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Requesting exchange with:</p>
                <p className="text-lg font-bold text-slate-900">{targetUser.name}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skills Exchange */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Your Skill to Offer
                </label>
                <select
                  value={selectedOfferedSkill}
                  onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                  required
                  className="input-field"
                >
                  <option value="">Select a skill you offer</option>
                  {user.skillsOffered.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Skill You Want to Learn
                </label>
                <select
                  value={selectedRequestedSkill}
                  onChange={(e) => setSelectedRequestedSkill(e.target.value)}
                  required
                  className="input-field"
                >
                  <option value="">Select a skill you want</option>
                  {targetUser.skillsOffered.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Exchange Preview */}
            {selectedOfferedSkill && selectedRequestedSkill && (
              <div className="bg-gradient-to-r from-accent-50 to-emerald-50 rounded-2xl p-4 border border-accent-200/50 animate-slide-down">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span className="skill-tag skill-tag-offered">{selectedOfferedSkill}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <span className="skill-tag skill-tag-wanted">{selectedRequestedSkill}</span>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Personal Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Add a personal message to introduce yourself..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !selectedOfferedSkill || !selectedRequestedSkill}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};