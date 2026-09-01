import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface AdminLoginPageProps {
  onNavigate: (route: string) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate, showToast }) => {
  const { login, isAdmin } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in
  if (isAdmin) {
    onNavigate('admin-dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email.trim(), password);
      showToast(t('অ্যাডমিন প্যানেলে স্বাগতম!', 'Welcome to Admin Dashboard!'), 'success');
      onNavigate('admin-dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Please check credentials.');
      showToast(t('লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করুন।', 'Login failed. Please check your credentials.'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@myjourney.com');
    setPassword('admin123456');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-xl space-y-6">
        
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('ওয়েবসাইটে ফিরুন', 'Back to website')}</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white font-sans">
            {t('অ্যাডমিন লগইন', 'Admin Portal Login')}
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {t('তথ্য আপডেট, কনটেন্ট যুক্ত ও সাইট পরিচালনার জন্য প্রবেশ করুন', 'Sign in to manage projects, story timeline, and website content')}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-600 dark:text-rose-400 text-xs">
            {error}
          </div>
        )}

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
                placeholder="admin@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
              {t('পাসওয়ার্ড', 'Password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>{loading ? t('যাচাই করা হচ্ছে...', 'Signing in...') : t('লগইন করুন', 'Sign In')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Fill / Sandbox helper */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center space-y-2">
          <p className="text-[11px] text-stone-400">
            {t('ডেমো অ্যাডমিন ক্রিডেনশিয়াল দিয়ে সরাসরি টেস্ট করুন:', 'Quick test with demo admin credentials:')}
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-3 py-1 text-xs rounded-lg bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 font-medium transition-colors"
          >
            {t('অটো ফিল ক্রিডেনশিয়াল ⚡', 'Auto-fill Demo Credentials ⚡')}
          </button>
        </div>
      </div>
    </div>
  );
};
