import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, MapPin, Clock, Globe, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const skillOptions = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'PHP',
  'HTML/CSS', 'Vue.js', 'Angular', 'Ruby', 'Go', 'Rust', 'Swift',
  'Machine Learning', 'Data Science', 'DevOps', 'UI/UX Design',
  'Digital Marketing', 'SEO', 'Content Writing', 'Photography',
  'Video Editing', 'Graphic Design', 'Music Production', 'Language Teaching'
];

const availabilityOptions = [
  'Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings',
  'Weekend Mornings', 'Weekend Afternoons', 'Weekend Evenings',
  'Flexible Schedule'
];

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    isPublic: true,
    skillsOffered: [] as string[],
    skillsWanted: [] as string[],
    availability: [] as string[],
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.skillsOffered.length === 0) {
      setError('Please select at least one skill you can offer');
      return;
    }

    setIsLoading(true);

    const success = await register(formData);
    
    if (success) {
      onSuccess();
    } else {
      setError('Email already exists');
    }
    
    setIsLoading(false);
  };

  const handleSkillToggle = (skill: string, type: 'offered' | 'wanted') => {
    const field = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    const currentSkills = formData[field];
    
    if (currentSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        [field]: currentSkills.filter(s => s !== skill)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentSkills, skill]
      }));
    }
  };

  const handleAvailabilityToggle = (availability: string) => {
    const currentAvailability = formData.availability;
    
    if (currentAvailability.includes(availability)) {
      setFormData(prev => ({
        ...prev,
        availability: currentAvailability.filter(a => a !== availability)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        availability: [...currentAvailability, availability]
      }));
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.name || !formData.email || !password || !confirmPassword)) {
      setError('Please fill in all required fields');
      return;
    }
    if (currentStep === 1 && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-2xl w-full space-y-8">
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
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Join SkillForge</h2>
          <p className="text-lg text-slate-600">
            Create your profile and start exchanging skills
          </p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-slate-900 text-white shadow-medium' 
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step < currentStep ? 'bg-slate-900' : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-2 text-xs text-slate-500">
            <span className={currentStep >= 1 ? 'text-slate-900 font-medium' : ''}>Basic Info</span>
            <span className={currentStep >= 2 ? 'text-slate-900 font-medium' : ''}>Skills</span>
            <span className={currentStep >= 3 ? 'text-slate-900 font-medium' : ''}>Preferences</span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="card-elevated p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field pr-12"
                        placeholder="Create a password"
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

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location (Optional)
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., New York, NY"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Skills */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Skills You Can Offer *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto scrollbar-hide border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill, 'offered')}
                        className={`skill-tag transition-all duration-200 ${
                          formData.skillsOffered.includes(skill)
                            ? 'skill-tag-offered shadow-soft scale-105'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-accent-300 hover:text-accent-700'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Selected: {formData.skillsOffered.length} skills
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Skills You Want to Learn
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto scrollbar-hide border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill, 'wanted')}
                        className={`skill-tag transition-all duration-200 ${
                          formData.skillsWanted.includes(skill)
                            ? 'skill-tag-wanted shadow-soft scale-105'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Selected: {formData.skillsWanted.length} skills
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Availability
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availabilityOptions.map((availability) => (
                      <button
                        key={availability}
                        type="button"
                        onClick={() => handleAvailabilityToggle(availability)}
                        className={`skill-tag transition-all duration-200 ${
                          formData.availability.includes(availability)
                            ? 'skill-tag-availability shadow-soft scale-105'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700'
                        }`}
                      >
                        {availability}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <input
                      id="isPublic"
                      name="isPublic"
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                      className="h-5 w-5 text-slate-900 focus:ring-slate-900/20 border-slate-300 rounded"
                    />
                    <label htmlFor="isPublic" className="flex items-center text-sm font-medium text-slate-700">
                      {formData.isPublic ? (
                        <Globe className="h-4 w-4 mr-2 text-emerald-600" />
                      ) : (
                        <Lock className="h-4 w-4 mr-2 text-slate-500" />
                      )}
                      Make my profile public
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 ml-8">
                    {formData.isPublic 
                      ? 'Others can find and contact you for skill exchanges'
                      : 'Your profile will be private and not searchable'
                    }
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-sm animate-slide-down">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-4 pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary flex-1"
                >
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-semibold text-slate-900 hover:text-accent-600 transition-colors duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};