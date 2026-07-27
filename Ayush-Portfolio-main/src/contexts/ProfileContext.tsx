import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
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
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id);

      if (error) throw error;
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      setIsLoading(true);
      if (!user) throw new Error('No user logged in');

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: data.publicUrl });
      
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading avatar:', error.message);
      toast.error('Failed to upload avatar');
      return null;
    } finally {
      setIsLoading(false);
    }
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
