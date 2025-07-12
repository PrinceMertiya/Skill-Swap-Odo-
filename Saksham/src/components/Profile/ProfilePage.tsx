import React, { useState } from 'react';
import { Edit3, MapPin, Clock, Star, Globe, Lock, Calendar, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { EditProfileModal } from './EditProfileModal';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card-elevated overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-8 py-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-large">
                    <span className="text-white font-bold text-3xl">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  </div>
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-slate-300 text-lg">{user.email}</p>
                  {user.location && (
                    <p className="text-slate-300 flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {user.location}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all duration-200 flex items-center space-x-2 shadow-soft"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center border border-amber-200/50">
                <div className="w-12 h-12 bg-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-amber-900">{user.rating}</p>
                <p className="text-sm text-amber-700 font-medium">Average Rating</p>
              </div>
              
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 text-center border border-accent-200/50">
                <div className="w-12 h-12 bg-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-accent-600" />
                </div>
                <p className="text-2xl font-bold text-accent-900">{user.totalSwaps}</p>
                <p className="text-sm text-accent-700 font-medium">Total Swaps</p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 text-center border border-emerald-200/50">
                <div className="w-12 h-12 bg-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-emerald-900">{user.skillsOffered.length}</p>
                <p className="text-sm text-emerald-700 font-medium">Skills Offered</p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  {user.isPublic ? (
                    <Globe className="h-6 w-6 text-emerald-600" />
                  ) : (
                    <Lock className="h-6 w-6 text-slate-500" />
                  )}
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {user.isPublic ? 'Public' : 'Private'}
                </p>
                <p className="text-sm text-slate-600 font-medium">Profile Visibility</p>
              </div>
            </div>

            {/* Skills Offered */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Award className="h-4 w-4 text-accent-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Skills I Offer</h2>
              </div>
              {user.skillsOffered.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.skillsOffered.map((skill) => (
                    <span key={skill} className="skill-tag skill-tag-offered">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200">
                  <p className="text-slate-500 italic">No skills listed yet</p>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="mt-2 text-accent-600 hover:text-accent-700 font-medium text-sm"
                  >
                    Add your skills
                  </button>
                </div>
              )}
            </div>

            {/* Skills Wanted */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Skills I Want to Learn</h2>
              </div>
              {user.skillsWanted.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.skillsWanted.map((skill) => (
                    <span key={skill} className="skill-tag skill-tag-wanted">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200">
                  <p className="text-slate-500 italic">No learning goals set yet</p>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    Add learning goals
                  </button>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Availability</h2>
              </div>
              {user.availability.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.availability.map((time) => (
                    <span key={time} className="skill-tag skill-tag-availability">
                      {time}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200">
                  <p className="text-slate-500 italic">No availability set</p>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="mt-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    Set your availability
                  </button>
                </div>
              )}
            </div>

            {/* Member Since */}
            <div className="pt-6 border-t border-slate-200 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-3 text-slate-600">
                <Calendar className="h-4 w-4" />
                <p className="text-sm">
                  Member since {new Date(user.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {showEditModal && (
          <EditProfileModal onClose={() => setShowEditModal(false)} />
        )}
      </div>
    </div>
  );
};