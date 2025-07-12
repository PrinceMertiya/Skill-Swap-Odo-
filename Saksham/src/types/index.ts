export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  profilePhoto?: string;
  isPublic: boolean;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  joinDate: string;
  rating: number;
  totalSwaps: number;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  skillOffered: string;
  skillRequested: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  completedAt?: string;
}

export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  swapRequestId: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}