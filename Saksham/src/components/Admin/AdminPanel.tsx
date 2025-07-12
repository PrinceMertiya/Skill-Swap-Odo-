import React, { useState } from 'react';
import { Users, MessageSquare, BarChart3, Shield, AlertTriangle, Activity, TrendingUp, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const AdminPanel: React.FC = () => {
  const { users, swapRequests, ratings } = useApp();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-12 w-12 text-rose-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Access Denied</h1>
          <p className="text-slate-600 max-w-md mx-auto">
            You don't have permission to access the admin panel. Please contact an administrator if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, description: 'Platform analytics' },
    { id: 'users', name: 'Users', icon: Users, description: 'User management' },
    { id: 'requests', name: 'Exchanges', icon: MessageSquare, description: 'Swap requests' },
    { id: 'reports', name: 'Reports', icon: AlertTriangle, description: 'Platform health' },
  ];

  const stats = {
    totalUsers: users.length - 1, // Exclude admin
    activeSwaps: swapRequests.filter(r => r.status === 'accepted').length,
    completedSwaps: swapRequests.filter(r => r.status === 'completed').length,
    pendingRequests: swapRequests.filter(r => r.status === 'pending').length,
  };

  const OverviewTab = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-accent-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.totalUsers}</p>
          <p className="text-sm font-medium text-slate-600">Total Users</p>
        </div>
        
        <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="h-6 w-6 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.activeSwaps}</p>
          <p className="text-sm font-medium text-slate-600">Active Exchanges</p>
        </div>
        
        <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.completedSwaps}</p>
          <p className="text-sm font-medium text-slate-600">Completed</p>
        </div>
        
        <div className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-rose-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{stats.pendingRequests}</p>
          <p className="text-sm font-medium text-slate-600">Pending</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {swapRequests.slice(-8).reverse().map((request, index) => {
            const fromUser = users.find(u => u.id === request.fromUserId);
            const toUser = users.find(u => u.id === request.toUserId);
            return (
              <div key={request.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center border-2 border-white">
                      <span className="text-slate-700 font-medium text-xs">
                        {fromUser?.name.charAt(0)}
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center border-2 border-white">
                      <span className="text-slate-700 font-medium text-xs">
                        {toUser?.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {fromUser?.name} → {toUser?.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      <span className="skill-tag skill-tag-offered text-2xs mr-1">{request.skillOffered}</span>
                      for
                      <span className="skill-tag skill-tag-wanted text-2xs ml-1">{request.skillRequested}</span>
                    </p>
                  </div>
                </div>
                <span className={`status-badge ${
                  request.status === 'pending' ? 'status-pending' :
                  request.status === 'accepted' ? 'status-accepted' :
                  request.status === 'completed' ? 'status-completed' :
                  'status-rejected'
                }`}>
                  {request.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="card overflow-hidden animate-fade-in">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-xl font-bold text-slate-900">User Management</h3>
        <p className="text-sm text-slate-600 mt-1">Manage platform users and their profiles</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Skills Offered
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.filter(u => u.email !== 'admin@skillswap.com').map((user, index) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                      <span className="text-slate-700 font-semibold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 2).map((skill) => (
                      <span key={skill} className="skill-tag skill-tag-offered text-2xs">
                        {skill}
                      </span>
                    ))}
                    {user.skillsOffered.length > 2 && (
                      <span className="skill-tag bg-slate-100 text-slate-600 text-2xs">
                        +{user.skillsOffered.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-semibold text-slate-900">{user.rating}</span>
                    <span className="text-xs text-slate-500">/5.0</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`status-badge ${
                    user.isPublic ? 'status-accepted' : 'status-pending'
                  }`}>
                    {user.isPublic ? 'Public' : 'Private'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RequestsTab = () => (
    <div className="card overflow-hidden animate-fade-in">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-xl font-bold text-slate-900">Skill Exchanges</h3>
        <p className="text-sm text-slate-600 mt-1">Monitor all skill exchange requests and their status</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Participants
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Skills Exchange
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {swapRequests.map((request, index) => {
              const fromUser = users.find(u => u.id === request.fromUserId);
              const toUser = users.find(u => u.id === request.toUserId);
              return (
                <tr key={request.id} className="hover:bg-slate-50 transition-colors duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center border-2 border-white">
                          <span className="text-slate-700 font-medium text-xs">
                            {fromUser?.name.charAt(0)}
                          </span>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center border-2 border-white">
                          <span className="text-slate-700 font-medium text-xs">
                            {toUser?.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900">{fromUser?.name}</p>
                        <p className="text-slate-500">→ {toUser?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="skill-tag skill-tag-offered text-2xs">{request.skillOffered}</span>
                        <span className="text-xs text-slate-400">for</span>
                        <span className="skill-tag skill-tag-wanted text-2xs">{request.skillRequested}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${
                      request.status === 'pending' ? 'status-pending' :
                      request.status === 'accepted' ? 'status-accepted' :
                      request.status === 'completed' ? 'status-completed' :
                      'status-rejected'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Platform Health */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Platform Health</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-emerald-600">
                {swapRequests.length > 0 ? Math.round((stats.completedSwaps / swapRequests.length) * 100) : 0}%
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-900">Success Rate</p>
            <p className="text-sm text-slate-600">Completed exchanges</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-accent-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-accent-600">
                {ratings.length > 0 ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1) : '5.0'}
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-900">Average Rating</p>
            <p className="text-sm text-slate-600">User satisfaction</p>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Recent Feedback</h3>
        </div>
        <div className="space-y-4">
          {ratings.slice(-6).reverse().map((rating, index) => {
            const fromUser = users.find(u => u.id === rating.fromUserId);
            const toUser = users.find(u => u.id === rating.toUserId);
            return (
              <div key={rating.id} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center border-2 border-white">
                        <span className="text-slate-700 font-medium text-xs">
                          {fromUser?.name.charAt(0)}
                        </span>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center border-2 border-white">
                        <span className="text-slate-700 font-medium text-xs">
                          {toUser?.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {fromUser?.name} → {toUser?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < rating.rating ? 'text-amber-400' : 'text-slate-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{rating.feedback}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'users': return <UsersTab />;
      case 'requests': return <RequestsTab />;
      case 'reports': return <ReportsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl flex items-center justify-center shadow-large">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-xl text-slate-600">
            Manage users, monitor activities, and oversee platform health
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="bg-white rounded-2xl p-1 shadow-soft border border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-medium'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <div className="text-left">
                    <span className="block">{tab.name}</span>
                    <span className="text-xs opacity-75">{tab.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};