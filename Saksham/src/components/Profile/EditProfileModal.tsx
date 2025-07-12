import React, { useState } from 'react';
import { X, MapPin, Clock, Globe, Lock, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface EditProfileModalProps {
  onClose: () => void;
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

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    isPublic: user?.isPublic || true,
    skillsOffered: user?.skillsOffered || [],
    skillsWanted: user?.skillsWanted || [],
    availability: user?.availability || [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    updateProfile(formData);
    onClose();
    setIsSubmitting(false);
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Save className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <p className="text-slate-300 text-sm">Update your skills and preferences</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., New York, NY"
                />
              </div>
            </div>

            {/* Privacy Setting */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
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

            {/* Skills Offered */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                Skills I Can Offer
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto scrollbar-hide border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill, 'offered')}
                    className={`skill-tag transition-all duration-200 text-left ${
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

            {/* Skills Wanted */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                Skills I Want to Learn
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto scrollbar-hide border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill, 'wanted')}
                    className={`skill-tag transition-all duration-200 text-left ${
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

            {/* Availability */}
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
                    className={`skill-tag transition-all duration-200 text-left ${
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

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};