import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, ArrowRight, Shield, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      onSuccess();
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async (userType: 'user' | 'admin') => {
    setIsLoading(true);
    const demoCredentials = {
      user: { email: 'alice@example.com', password: 'password' },
      admin: { email: 'admin@skillswap.com', password: 'password' }
    };

    const { email: demoEmail, password: demoPassword } = demoCredentials[userType];
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    const success = await login(demoEmail, demoPassword);
    if (success) {
      onSuccess();
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl flex items-center justify-center shadow-large">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Welcome back</h2>
          <p className="text-lg text-slate-600">
            Sign in to <span className="font-semibold text-slate-900">SkillForge</span>
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Where talents meet and skills flourish
          </p>
        </div>

        {/* Login Form */}
        <div className="card-elevated p-8 animate-slide-up">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-sm animate-slide-down">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Demo Access */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-center text-sm font-medium text-slate-600 mb-4">
              Quick demo access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('user')}
                disabled={isLoading}
                className="btn-secondary flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
              >
                <Users className="h-4 w-4" />
                <span>Demo User</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
                className="btn-secondary flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
              >
                <Shield className="h-4 w-4" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-semibold text-slate-900 hover:text-accent-600 transition-colors duration-200"
              >
                Create one now
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="p-4">
            <div className="w-8 h-8 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="h-4 w-4 text-accent-600" />
            </div>
            <p className="text-xs font-medium text-slate-600">Connect</p>
          </div>
          <div className="p-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-xs font-medium text-slate-600">Exchange</p>
          </div>
          <div className="p-4">
            <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Shield className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-xs font-medium text-slate-600">Grow</p>
          </div>
        </div>
      </div>
    </div>
  );
};