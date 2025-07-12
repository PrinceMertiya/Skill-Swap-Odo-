import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Header } from './components/Layout/Header';
import { BrowseUsers } from './components/Browse/BrowseUsers';
import { RequestsList } from './components/Requests/RequestsList';
import { ProfilePage } from './components/Profile/ProfilePage';
import { AdminPanel } from './components/Admin/AdminPanel';

type Page = 'login' | 'register' | 'browse' | 'requests' | 'profile' | 'admin';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuthSuccess = () => {
    setCurrentPage('browse');
  };

  if (!isAuthenticated) {
    return isRegistering ? (
      <RegisterForm
        onSuccess={handleAuthSuccess}
        onSwitchToLogin={() => setIsRegistering(false)}
      />
    ) : (
      <LoginForm
        onSuccess={handleAuthSuccess}
        onSwitchToRegister={() => setIsRegistering(true)}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'browse':
        return <BrowseUsers />;
      case 'requests':
        return <RequestsList />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <BrowseUsers />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;