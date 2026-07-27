import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  github: string | null;
  linkedin: string | null;
  portfolio: string | null;
  resume_url: string | null;
}

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string | null>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>({
    id: 'mock-user-1',
    full_name: 'Ayush Chavan',
    email: 'ayush@example.com',
    avatar_url: null,
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Full Stack Developer',
    github: 'https://github.com/ayush',
    linkedin: 'https://linkedin.com/in/ayush',
    portfolio: 'https://ayush.dev',
    resume_url: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (updates: Partial<Profile>) => {
    setIsLoading(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    setProfile(prev => prev ? { ...prev, ...updates } : null);
    toast.success('Profile updated successfully (Mock)');
    setIsLoading(false);
  };

  const uploadAvatar = async (file: File) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUrl = URL.createObjectURL(file);
    await updateProfile({ avatar_url: mockUrl });
    setIsLoading(false);
    return mockUrl;
  };

  return (
    <ProfileContext.Provider value={{ profile, isLoading, updateProfile, uploadAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
