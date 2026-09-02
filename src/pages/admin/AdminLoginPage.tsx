import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { MASTER_ADMIN_EMAIL } from '../../types';

interface AdminLoginPageProps {
  onNavigate: (route: string) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate, showToast }) => {
  const { login, signup, loginWithGoogle, resetPassword, isAdmin } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in as authorized admin, navigate straight to dashboard
  if (isAdmin) {
    onNavigate('admin-dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError(t('ইমেইল অ্যাড্রেস প্রদান করুন।', 'Please provide an email address.'));
      return;
    }

    if (mode === 'forgot') {
      setLoading(true);
      try {
        await resetPassword(cleanEmail);
        setSuccessMsg(
          t(
            'পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে। অনুগ্রহ করে ইনবক্স অথবা স্প্যাম ফোল্ডার চেক করুন।',
            'Password reset link sent to your email. Please check your inbox or spam folder.'
          )
        );
        showToast(t('পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে!', 'Password reset link sent!'), 'success');
      } catch (err: any) {
        setError(err.message || 'Failed to send reset email.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setError(t('পাসওয়ার্ড প্রদান করুন।', 'Please enter your password.'));
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setError(t('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।', 'Password must be at least 6 characters long.'));
        return;
      }
      if (password !== confirmPassword) {
        setError(t('পাসওয়ার্ড দুটি মেলেনি।', 'Passwords do not match.'));
        return;
      }

      setLoading(true);
      try {
        await signup(cleanEmail, password);
        showToast(t('অ্যাডমিন অ্যাকাউন্ট তৈরি ও লগইন সফল হয়েছে!', 'Admin account created and logged in!'), 'success');
        onNavigate('admin-dashboard');
      } catch (err: any) {
        setError(err.message || 'Signup failed. Only authorized emails can register.');
        showToast(t('অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।', 'Signup failed.'), 'error');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Default: Login
    setLoading(true);
    try {
      await login(cleanEmail, password);
      showToast(t('অ্যাডমিন প্যানেলে স্বাগতম!', 'Welcome to Admin Dashboard!'), 'success');
      onNavigate('admin-dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
      showToast(t('লগইন ব্যর্থ হয়েছে।', 'Login failed.'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      showToast(t('গুগল দিয়ে লগইন সফল হয়েছে!', 'Logged in with Google successfully!'), 'success');
      onNavigate('admin-dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign in failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleFillAdminEmail = () => {
    setEmail(MASTER_ADMIN_EMAIL);
    setPassword('admin123456');
    setConfirmPassword('admin123456');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Top Header & Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('ওয়েবসাইটে ফিরুন', 'Back to website')}</span>
          </button>

          <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>{t('মালিকের সংরক্ষিত পোর্টাল', 'Owner Only Portal')}</span>
          </span>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white font-sans">
            {mode === 'login' && t('অ্যাডমিন লগইন', 'Admin Portal Login')}
            {mode === 'signup' && t('অ্যাডমিন পাসওয়ার্ড সেট / তৈরি', 'Set Admin Password')}
            {mode === 'forgot' && t('পাসওয়ার্ড রিসেট', 'Reset Password')}
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            {mode === 'login' && t('শুধুমাত্র অনুমোদিত অ্যাডমিন (মুহাম্মদ ইসমাইল) প্রবেশ করতে পারবেন', 'Only authorized admins can access this dashboard')}
            {mode === 'signup' && t('অনুমোদিত অ্যাডমিন ইমেইলের জন্য পাসওয়ার্ড তৈরি করুন', 'Create or register password for authorized admin email')}
            {mode === 'forgot' && t('আপনার ইমেইলে পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হবে', 'We will send a password reset link to your email')}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800/80 p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {t('লগইন', 'Sign In')}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {t('পাসওয়ার্ড সেট', 'Set Password')}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('forgot');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              mode === 'forgot'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {t('রিসেট', 'Reset')}
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google 1-Click Sign-In */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-2xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>
              {googleLoading
                ? t('গুগল দিয়ে প্রবেশ করা হচ্ছে...', 'Signing in with Google...')
                : t('গুগল অ্যাকাউন্ট দিয়ে সরাসরি প্রবেশ', 'Continue with Google')}
            </span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-stone-200 dark:border-stone-800 w-full" />
            <span className="bg-white dark:bg-stone-900 px-3 text-[11px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-semibold">
              {t('অথবা ইমেইল দিয়ে', 'or with email')}
            </span>
          </div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
              {t('অ্যাডমিন ইমেইল', 'Admin Email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mdismail2468101214@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  {t('পাসওয়ার্ড', 'Password')}
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError(null);
                    }}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {t('পাসওয়ার্ড ভুলে গেছেন?', 'Forgot?')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                {t('পাসওয়ার্ড নিশ্চিত করুন', 'Confirm Password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
          >
            {loading ? (
              <span>{t('অনুগ্রহ করে অপেক্ষা করুন...', 'Processing...')}</span>
            ) : mode === 'login' ? (
              <>
                <span>{t('লগইন করুন', 'Sign In')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : mode === 'signup' ? (
              <>
                <span>{t('পাসওয়ার্ড সেট করুন', 'Set Password')}</span>
                <UserPlus className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>{t('রিসেট লিঙ্ক পাঠান', 'Send Reset Link')}</span>
                <KeyRound className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Helper for Admin Credential filling */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-center space-y-2.5">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleFillAdminEmail}
              className="px-3.5 py-1.5 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-stone-700 font-medium transition-colors border border-stone-200 dark:border-stone-700"
            >
              {t('আমার ইমেইল ও পাসওয়ার্ড বসান ⚡', 'Fill Admin Credentials ⚡')}
            </button>
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 leading-relaxed">
            {t('নিরাপত্তার স্বার্থে শুধুমাত্র মালিক (মুহাম্মদ ইসমাইল) ও অনুমতিপ্রাপ্ত ইমেইলসমূহ এই প্যানেলে প্রবেশ করতে পারে।', 'For security, only the site owner and authorized admins can access this dashboard.')}
          </p>
        </div>
      </div>
    </div>
  );
};

