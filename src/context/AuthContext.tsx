import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  setAuthError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error('Firebase Auth Login Error:', error);
      let msg = 'লগইন ব্যর্থ হয়েছে। ইমেল এবং পাসওয়ার্ড সঠিক কিনা পরীক্ষা করুন।';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        msg = 'ভুল ইমেইল অথবা পাসওয়ার্ড।';
      } else if (error.code === 'auth/wrong-password') {
        msg = 'পাসওয়ার্ড সঠিক নয়।';
      } else if (error.code === 'auth/too-many-requests') {
        msg = 'অতিরিক্ত ব্যর্থ চেষ্টার কারণে সাময়িকভাবে ব্লক করা হয়েছে। কিছুক্ষণ পর চেষ্টা করুন।';
      } else if (error.message) {
        msg = error.message;
      }
      setAuthError(msg);
      throw error;
    }
  };

  const signup = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error('Firebase Auth Signup Error:', error);
      let msg = 'নতুন অ্যাডমিন তৈরিতে সমস্যা হয়েছে।';
      if (error.code === 'auth/email-already-in-use') {
        msg = 'এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হয়েছে। লগইন করার চেষ্টা করুন।';
      } else if (error.code === 'auth/weak-password') {
        msg = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।';
      } else if (error.message) {
        msg = error.message;
      }
      setAuthError(msg);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
      setAuthError(null);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isAdmin,
        login,
        signup,
        logout,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
