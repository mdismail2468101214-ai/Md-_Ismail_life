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
import { MASTER_ADMIN_EMAIL } from '../types';
import { subscribeSiteSettings, getSiteSettings } from '../services/firestoreService';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  authorizedAdmins: string[];
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  setAuthError: (err: string | null) => void;
  checkEmailAuthorized: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authorizedAdmins, setAuthorizedAdmins] = useState<string[]>([MASTER_ADMIN_EMAIL]);

  // Subscribe to site settings to keep authorized admins list up-to-date
  useEffect(() => {
    const unsubSettings = subscribeSiteSettings((settings) => {
      const list = settings?.authorizedAdmins || [];
      const normalized = Array.from(
        new Set([MASTER_ADMIN_EMAIL.toLowerCase(), ...list.map((e) => e.trim().toLowerCase())])
      );
      setAuthorizedAdmins(normalized);
    });

    return () => unsubSettings();
  }, []);

  const checkEmailAuthorized = async (email: string): Promise<boolean> => {
    if (!email) return false;
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === MASTER_ADMIN_EMAIL.toLowerCase()) return true;

    try {
      const settings = await getSiteSettings();
      const list = (settings.authorizedAdmins || []).map((e) => e.trim().toLowerCase());
      return list.includes(cleanEmail);
    } catch (err) {
      console.warn('Error fetching authorized admin settings:', err);
      return cleanEmail === MASTER_ADMIN_EMAIL.toLowerCase();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        const isAuth = await checkEmailAuthorized(user.email);
        if (isAuth) {
          setCurrentUser(user);
          setIsAdmin(true);
        } else {
          console.warn(`Unauthorized login attempt by: ${user.email}. Signing out immediately.`);
          await fbSignOut(auth);
          setCurrentUser(null);
          setIsAdmin(false);
          setAuthError(
            `অননুমোদিত প্রবেশাধিকার! "${user.email}" অ্যাডমিন প্যানেলে প্রবেশের অনুমতিপ্রাপ্ত নয়। শুধুমাত্র মুহাম্মদ ইসমাইল এবং অনুমতিপ্রাপ্ত অ্যাডমিনগণ প্রবেশ করতে পারবেন।`
          );
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setAuthError(null);
    const cleanEmail = email.trim().toLowerCase();

    // Check authorization before attempting login
    const isAllowed = await checkEmailAuthorized(cleanEmail);
    if (!isAllowed) {
      const msg = `অননুমোদিত ইমেইল! "${email}" অ্যাডমিন প্যানেলে অনুমোদিত নয়। শুধুমাত্র প্রধান অ্যাডমিন (মালিক) অথবা অনুমতিপ্রাপ্ত ব্যক্তি লগইন করতে পারবেন।`;
      setAuthError(msg);
      throw new Error(msg);
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const isAuth = await checkEmailAuthorized(cred.user?.email || cleanEmail);
      if (!isAuth) {
        await fbSignOut(auth);
        throw new Error(`অননুমোদিত ইমেইল: ${email}`);
      }
      setCurrentUser(cred.user);
      setIsAdmin(true);
    } catch (error: any) {
      console.warn('Firebase Auth Login attempt:', error?.code || error);

      let msg = 'লগইন ব্যর্থ হয়েছে। ইমেল এবং পাসওয়ার্ড সঠিক কিনা পরীক্ষা করুন।';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        msg = 'অ্যাকাউন্ট পাওয়া যায়নি অথবা পাসওয়ার্ড ভুল। আপনি কি পাসওয়ার্ড ভুলে গেছেন? নিচে "রিসেট" অপশনটি ব্যবহার করুন।';
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
    const cleanEmail = email.trim().toLowerCase();

    // Strict registration check: only authorized admin emails can be registered
    const isAllowed = await checkEmailAuthorized(cleanEmail);
    if (!isAllowed) {
      const msg = `অননুমোদিত ইমেইল! "${email}" অ্যাডমিন প্যানেলে অনুমোদিত নয়। কোনো অপরিচিত ব্যক্তি এখানে অ্যাকাউন্ট তৈরি করতে পারবেন না।`;
      setAuthError(msg);
      throw new Error(msg);
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      setCurrentUser(cred.user);
      setIsAdmin(true);
    } catch (error: any) {
      console.warn('Firebase Auth Signup attempt:', error?.code || error);

      let msg = 'অ্যাডমিন তৈরিতে সমস্যা হয়েছে।';
      if (error.code === 'auth/email-already-in-use') {
        msg = 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে। অনুগ্রহ করে লগইন করুন।';
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
      const result = await signInWithPopup(auth, provider);
      const googleEmail = result.user?.email || '';

      const isAllowed = await checkEmailAuthorized(googleEmail);
      if (!isAllowed) {
        await fbSignOut(auth);
        setCurrentUser(null);
        setIsAdmin(false);
        const errText = `অননুমোদিত গুগল অ্যাকাউন্ট! "${googleEmail}" অ্যাডমিন হিসেবে অনুমোদিত নয়। শুধুমাত্র অনুমোদিত অ্যাডমিন প্রবেশ করতে পারবেন।`;
        setAuthError(errText);
        throw new Error(errText);
      }

      setCurrentUser(result.user);
      setIsAdmin(true);
    } catch (error: any) {
      console.error('Firebase Google Auth Error:', error);
      let msg = error.message || 'গুগল দিয়ে লগইন ব্যর্থ হয়েছে।';
      if (error.code === 'auth/popup-closed-by-user') {
        msg = 'পপআপ উইন্ডোটি বন্ধ করা হয়েছে। আবার চেষ্টা করুন।';
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    const cleanEmail = email.trim().toLowerCase();
    const isAllowed = await checkEmailAuthorized(cleanEmail);
    if (!isAllowed) {
      const msg = `অননুমোদিত ইমেইল! "${email}" অ্যাডমিন তালিকায় নেই।`;
      setAuthError(msg);
      throw new Error(msg);
    }

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
      await fbSignOut(auth);
      setCurrentUser(null);
      setIsAdmin(false);
      setAuthError(null);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isAdmin,
        authorizedAdmins,
        login,
        signup,
        loginWithGoogle,
        resetPassword,
        logout,
        authError,
        setAuthError,
        checkEmailAuthorized,
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

