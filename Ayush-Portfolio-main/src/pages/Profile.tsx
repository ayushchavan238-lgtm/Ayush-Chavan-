import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { User, LogOut, Loader2, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, signOut } = useAuth();
  const { profile, updateProfile, uploadAvatar, isLoading } = useProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    location: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        portfolio: profile.portfolio || '',
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    await uploadAvatar(file);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-slate-900 shadow rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
              <button
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
                className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>

            <div className="flex items-center space-x-6 mb-8">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <User size={40} className="text-slate-500" />
                )}
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Camera size={24} className="text-white" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={isLoading}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{profile?.full_name || 'Anonymous User'}</h3>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-slate-300 mb-2">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
