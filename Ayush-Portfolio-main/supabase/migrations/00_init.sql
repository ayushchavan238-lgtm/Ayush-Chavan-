-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  phone text,
  location text,
  bio text,
  github text,
  linkedin text,
  portfolio text,
  resume_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING ( auth.uid() = id );

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING ( auth.uid() = id );

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK ( auth.uid() = id );

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Contact Messages Policies
-- Anyone can insert a contact message (even unauthenticated users)
CREATE POLICY "Anyone can submit a contact message" 
ON public.contact_messages FOR INSERT 
WITH CHECK ( true );

-- Only authenticated users (admins) could theoretically read them, but for this spec we just need insert.
-- We can add a policy for authenticated users if needed, but keeping it secure by default.
CREATE POLICY "Users can view messages" 
ON public.contact_messages FOR SELECT 
USING ( auth.role() = 'authenticated' );

-- Function to handle new user signup and create a profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$;

-- Trigger to call the function after a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
