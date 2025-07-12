import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SwapRequest, Rating, User } from '../types';

interface AppContextType {
  users: User[];
  swapRequests: SwapRequest[];
  ratings: Rating[];
  createSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  updateSwapRequest: (id: string, updates: Partial<SwapRequest>) => void;
  deleteSwapRequest: (id: string) => void;
  addRating: (rating: Omit<Rating, 'id' | 'createdAt'>) => void;
  searchUsers: (skill: string) => User[];
  getUserById: (id: string) => User | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedRequests = localStorage.getItem('swapRequests');
    const storedRatings = localStorage.getItem('ratings');

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with sample data
      const sampleUsers: User[] = [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          location: 'New York, NY',
          isPublic: true,
          skillsOffered: ['React', 'JavaScript', 'Node.js'],
          skillsWanted: ['Python', 'Machine Learning', 'Data Science'],
          availability: ['Weekends', 'Evenings'],
          joinDate: '2024-01-01',
          rating: 4.8,
          totalSwaps: 12
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@example.com',
          location: 'San Francisco, CA',
          isPublic: true,
          skillsOffered: ['Python', 'Data Science', 'Machine Learning'],
          skillsWanted: ['React', 'Frontend Development'],
          availability: ['Weekdays', 'Mornings'],
          joinDate: '2024-01-15',
          rating: 4.9,
          totalSwaps: 8
        },
        {
          id: 'admin',
          name: 'Admin User',
          email: 'admin@skillswap.com',
          isPublic: false,
          skillsOffered: [],
          skillsWanted: [],
          availability: [],
          joinDate: '2024-01-01',
          rating: 5.0,
          totalSwaps: 0
        }
      ];
      setUsers(sampleUsers);
      localStorage.setItem('users', JSON.stringify(sampleUsers));
    }

    if (storedRequests) {
      setSwapRequests(JSON.parse(storedRequests));
    }

    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
  }, []);

  const createSwapRequest = (request: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    const newRequest: SwapRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedRequests = [...swapRequests, newRequest];
    setSwapRequests(updatedRequests);
    localStorage.setItem('swapRequests', JSON.stringify(updatedRequests));
  };

  const updateSwapRequest = (id: string, updates: Partial<SwapRequest>) => {
    const updatedRequests = swapRequests.map(req =>
      req.id === id ? { ...req, ...updates } : req
    );
    setSwapRequests(updatedRequests);
    localStorage.setItem('swapRequests', JSON.stringify(updatedRequests));
  };

  const deleteSwapRequest = (id: string) => {
    const updatedRequests = swapRequests.filter(req => req.id !== id);
    setSwapRequests(updatedRequests);
    localStorage.setItem('swapRequests', JSON.stringify(updatedRequests));
  };

  const addRating = (rating: Omit<Rating, 'id' | 'createdAt'>) => {
    const newRating: Rating = {
      ...rating,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);
    localStorage.setItem('ratings', JSON.stringify(updatedRatings));

    // Update user ratings
    const updatedUsers = users.map(user => {
      if (user.id === rating.toUserId) {
        const userRatings = updatedRatings.filter(r => r.toUserId === user.id);
        const avgRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;
        return { ...user, rating: Math.round(avgRating * 10) / 10 };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const searchUsers = (skill: string): User[] => {
    return users.filter(user =>
      user.isPublic &&
      user.skillsOffered.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
  };

  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  return (
    <AppContext.Provider value={{
      users,
      swapRequests,
      ratings,
      createSwapRequest,
      updateSwapRequest,
      deleteSwapRequest,
      addRating,
      searchUsers,
      getUserById,
    }}>
      {children}
    </AppContext.Provider>
  );
};