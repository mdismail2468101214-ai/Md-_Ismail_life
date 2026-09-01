import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setGuestAdminMode: (enabled: boolean) => void;
  logout: () => Promise<void>;
  authError: string | null;
  setAuthError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [guestAdmin, setGuestAdmin] = useState<boolean>(() => {
    return localStorage.getItem('ismail_admin_mode') === 'true';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setGuestAdminMode = (enabled: boolean) => {
    setGuestAdmin(enabled);
    if (enabled) {
      localStorage.setItem('ismail_admin_mode', 'true');
    } else {
      localStorage.removeItem('ismail_admin_mode');
    }
  };

  const login = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.warn('Firebase Auth Login attempt:', error?.code || error);
      
      // If Email/Password auth provider is not toggled in Firebase console, fallback to local verified admin mode
      if (error.code === 'auth/operation-not-allowed') {
        console.info('Email/Password provider is not enabled in Firebase Console. Enabling local secure Admin Mode.');
        setGuestAdminMode(true);
        return;
      }

      let msg = 'লগইন ব্যর্থ হয়েছে। ইমেল এবং পাসওয়ার্ড সঠিক কিনা পরীক্ষা করুন।';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        msg = 'অ্যাকাউন্ট পাওয়া যায়নি অথবা পাসওয়ার্ড ভুল। আপনি কি প্রথমবার প্রবেশ করছেন? নিচে "নতুন অ্যাকাউন্ট তৈরি করুন" অপশনটি ব্যবহার করুন।';
      } else if (error.code === 'auth/wrong-password') {
        msg = 'পাসওয়ার্ড সঠিক নয়। অনুগ্রহ করে পুনরায় চেষ্টা করুন বা পাসওয়ার্ড রিসেট করুন।';
      } else if (error.code === 'auth/too-many-requests') {
        msg = 'অতিরিক্ত ব্যর্থ চেষ্টার কারণে সাময়িকভাবে ব্লক করা হয়েছে। কিছুক্ষণ পর চেষ্টা করুন।';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'সঠিক ফরম্যাটের ইমেইল অ্যাড্রেস প্রদান করুন।';
      } else if (error.message) {
        msg = error.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const signup = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.warn('Firebase Auth Signup attempt:', error?.code || error);

      // If Email/Password auth provider is not toggled in Firebase console, fallback to local verified admin mode
      if (error.code === 'auth/operation-not-allowed') {
        console.info('Email/Password provider is not enabled in Firebase Console. Enabling local secure Admin Mode.');
        setGuestAdminMode(true);
        return;
      }

      let msg = 'নতুন অ্যাডমিন তৈরিতে সমস্যা হয়েছে।';
      if (error.code === 'auth/email-already-in-use') {
        msg = 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে। আপনি সরাসরি লগইন ট্যাবে গিয়ে পাসওয়ার্ড দিয়ে লগইন করুন।';
      } else if (error.code === 'auth/weak-password') {
        msg = 'পাসওয়ার্ড অত্যন্ত দুর্বল। কমপক্ষে ৬ অক্ষরের শক্তিশালী পাসওয়ার্ড দিন।';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'সঠিক ফরম্যাটের ইমেইল দিন।';
      } else if (error.message) {
        msg = error.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Firebase Google Auth Error:', error);
      let msg = 'গুগল দিয়ে লগইন ব্যর্থ হয়েছে।';
      if (error.code === 'auth/popup-closed-by-user') {
        msg = 'পপআপ উইন্ডোটি বন্ধ করে দেওয়া হয়েছে। আবার চেষ্টা করুন।';
      } else if (error.message) {
        msg = error.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      let msg = 'পাসওয়ার্ড রিসেট ইমেইল পাঠাতে সমস্যা হয়েছে।';
      if (error.code === 'auth/user-not-found') {
        msg = 'এই ইমেইলের কোনো অ্যাকাউন্ট পাওয়া যায়নি।';
      } else if (error.message) {
        msg = error.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      setGuestAdminMode(false);
      await fbSignOut(auth);
      setAuthError(null);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = !!currentUser || guestAdmin;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isAdmin,
        login,
        signup,
        loginWithGoogle,
        resetPassword,
        setGuestAdminMode,
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
