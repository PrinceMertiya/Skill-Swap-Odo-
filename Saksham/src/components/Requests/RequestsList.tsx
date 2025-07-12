import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Trash2, Star, ArrowRight, Send, Inbox } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { RatingModal } from './RatingModal';

export const RequestsList: React.FC = () => {
  const { swapRequests, updateSwapRequest, deleteSwapRequest, getUserById } = useApp();
  const { user } = useAuth();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('received');

  if (!user) return null;

  const sentRequests = swapRequests.filter(req => req.fromUserId === user.id);
  const receivedRequests = swapRequests.filter(req => req.toUserId === user.id);

  const handleAccept = (requestId: string) => {
    updateSwapRequest(requestId, { status: 'accepted' });
  };

  const handleReject = (requestId: string) => {
    updateSwapRequest(requestId, { status: 'rejected' });
  };

  const handleMarkCompleted = (requestId: string) => {
    updateSwapRequest(requestId, { 
      status: 'completed',
      completedAt: new Date().toISOString()
    });
    setSelectedRequest(requestId);
    setShowRatingModal(true);
  };

  const handleDelete = (requestId: string) => {
    deleteSwapRequest(requestId);
  };

  const RequestCard: React.FC<{ request: any; type: 'sent' | 'received' }> = ({ request, type }) => {
    const otherUser = getUserById(type === 'sent' ? request.toUserId : request.fromUserId);
    
    if (!otherUser) return null;

    return (
      <div className="card-elevated p-6 hover:scale-[1.01] transition-all duration-300 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-soft">
                <span className="text-slate-700 font-semibold">
                  {otherUser.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{otherUser.name}</h3>
              <p className="text-sm text-slate-500">
                {new Date(request.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <span className={`status-badge ${
            request.status === 'pending' ? 'status-pending' :
            request.status === 'accepted' ? 'status-accepted' :
            request.status === 'completed' ? 'status-completed' :
            'status-rejected'
          }`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        {/* Skills Exchange */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <p className="text-xs font-medium text-slate-600 mb-1">
                {type === 'sent' ? 'You Offer' : 'They Offer'}
              </p>
              <span className="skill-tag skill-tag-offered">{request.skillOffered}</span>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400" />
            <div className="text-center">
              <p className="text-xs font-medium text-slate-600 mb-1">
                {type === 'sent' ? 'You Want' : 'They Want'}
              </p>
              <span className="skill-tag skill-tag-wanted">{request.skillRequested}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        {request.message && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-700 leading-relaxed">{request.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          {type === 'received' && request.status === 'pending' && (
            <>
              <button
                onClick={() => handleAccept(request.id)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-soft hover:shadow-medium"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Accept</span>
              </button>
              <button
                onClick={() => handleReject(request.id)}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 px-4 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-soft hover:shadow-medium"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject</span>
              </button>
            </>
          )}

          {request.status === 'accepted' && (
            <button
              onClick={() => handleMarkCompleted(request.id)}
              className="flex-1 bg-accent-600 hover:bg-accent-700 text-white py-3 px-4 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-soft hover:shadow-medium"
            >
              <Star className="h-4 w-4" />
              <span>Mark as Completed</span>
            </button>
          )}

          {(request.status === 'pending' || request.status === 'rejected') && type === 'sent' && (
            <button
              onClick={() => handleDelete(request.id)}
              className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-soft hover:shadow-medium"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">My Skill Exchanges</h1>
          <p className="text-xl text-slate-600">
            Manage your skill exchange requests and collaborations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="bg-white rounded-2xl p-1 shadow-soft border border-slate-200">
            <button
              onClick={() => setActiveTab('received')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'received'
                  ? 'bg-slate-900 text-white shadow-medium'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Inbox className="h-4 w-4" />
              <span>Received ({receivedRequests.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'sent'
                  ? 'bg-slate-900 text-white shadow-medium'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Send className="h-4 w-4" />
              <span>Sent ({sentRequests.length})</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'received' ? (
            <div>
              {receivedRequests.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Inbox className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">No requests received</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Make sure your profile is public to receive skill exchange requests from other users!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {receivedRequests.map((request) => (
                    <RequestCard key={request.id} request={request} type="received" />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {sentRequests.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Send className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">No requests sent</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Browse talented users and start exchanging skills to see your sent requests here!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sentRequests.map((request) => (
                    <RequestCard key={request.id} request={request} type="sent" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {showRatingModal && selectedRequest && (
          <RatingModal
            requestId={selectedRequest}
            onClose={() => {
              setShowRatingModal(false);
              setSelectedRequest(null);
            }}
          />
        )}
      </div>
    </div>
  );
};