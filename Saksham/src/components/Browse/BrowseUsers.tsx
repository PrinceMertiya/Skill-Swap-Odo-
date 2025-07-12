import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Send, Filter, Grid, List, Users, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { SwapRequestModal } from './SwapRequestModal';

export const BrowseUsers: React.FC = () => {
  const { users, searchUsers } = useApp();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = searchTerm
    ? searchUsers(searchTerm)
    : users.filter(u => u.isPublic && u.id !== user?.id);

  const handleRequestSkill = (userId: string) => {
    setSelectedUser(userId);
    setShowRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Discover Amazing Talents
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Connect with skilled professionals and exchange knowledge to grow together
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for skills, technologies, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 shadow-soft transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              
              <div className="flex items-center bg-white rounded-2xl border border-slate-200 p-1 shadow-soft">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-slate-900 text-white shadow-soft' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-slate-900 text-white shadow-soft' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{filteredUsers.length} talented people</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Ready to exchange skills</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No talents found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              {searchTerm 
                ? `No users found with "${searchTerm}" skill. Try searching for something else.`
                : 'No public profiles available at the moment. Check back later!'
              }
            </p>
          </div>
        ) : (
          <div className={`animate-slide-up ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredUsers.map((profileUser, index) => (
              <div
                key={profileUser.id}
                className={`card-elevated hover:scale-[1.02] transition-all duration-300 animate-fade-in ${
                  viewMode === 'grid' ? 'p-6' : 'p-6 flex items-center space-x-6'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* User Info */}
                <div className={`${viewMode === 'list' ? 'flex items-center space-x-4 flex-1' : 'mb-6'}`}>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-soft">
                      <span className="text-slate-700 font-bold text-xl">
                        {profileUser.name.charAt(0)}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'flex-1' : 'text-center'}>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{profileUser.name}</h3>
                    {profileUser.location && (
                      <p className="text-sm text-slate-500 flex items-center mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {profileUser.location}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 justify-center">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm font-semibold text-slate-700">
                          {profileUser.rating}
                        </span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm text-slate-500">
                        {profileUser.totalSwaps} swaps
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className={`space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Skills Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {profileUser.skillsOffered.slice(0, viewMode === 'list' ? 4 : 3).map((skill) => (
                        <span key={skill} className="skill-tag skill-tag-offered text-xs">
                          {skill}
                        </span>
                      ))}
                      {profileUser.skillsOffered.length > (viewMode === 'list' ? 4 : 3) && (
                        <span className="skill-tag bg-slate-100 text-slate-600 text-xs">
                          +{profileUser.skillsOffered.length - (viewMode === 'list' ? 4 : 3)} more
                        </span>
                      )}
                    </div>
                  </div>

                  {profileUser.skillsWanted.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Skills Wanted</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileUser.skillsWanted.slice(0, 2).map((skill) => (
                          <span key={skill} className="skill-tag skill-tag-wanted text-xs">
                            {skill}
                          </span>
                        ))}
                        {profileUser.skillsWanted.length > 2 && (
                          <span className="skill-tag bg-slate-100 text-slate-600 text-xs">
                            +{profileUser.skillsWanted.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {profileUser.availability.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Availability</h4>
                      <p className="text-sm text-slate-600 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {profileUser.availability.slice(0, 2).join(', ')}
                        {profileUser.availability.length > 2 && '...'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className={viewMode === 'list' ? 'ml-6' : 'mt-6'}>
                  <button
                    onClick={() => handleRequestSkill(profileUser.id)}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showRequestModal && selectedUser && (
          <SwapRequestModal
            targetUserId={selectedUser}
            onClose={() => setShowRequestModal(false)}
            onSuccess={() => {
              setShowRequestModal(false);
              setSelectedUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
};