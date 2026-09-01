import React, { useState } from 'react';
import {
  Mail,
  Send,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Sparkles,
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface ContactPageProps {
  onNavigate: (route: string) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, showToast }) => {
  const { profile, addDocument } = useData();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast(t('অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন।', 'Please fill in all required fields.'), 'error');
      return;
    }

    setSubmitting(true);
    try {
      await addDocument('messages', {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || 'General Inquiry',
        message: message.trim(),
        createdAt: new Date().toISOString(),
        read: false,
      });

      setSubmitted(true);
      showToast(t('আপনার বার্তা সফলভাবে পৌঁছেছে! ধন্যবাদ।', 'Message sent successfully! Thank you.'), 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      showToast(t('বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।', 'Could not send message. Please try again.'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = profile.socialLinks || {};

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10 pb-24">
      <Breadcrumbs
        items={[{ label: 'Contact', labelBn: 'যোগাযোগ' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          <Mail className="w-3.5 h-3.5" />
          <span>{t('বার্তা ও সংযোগ', 'Let’s Start a Conversation')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার সাথে যোগাযোগ করুন', 'Get in Touch')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('নতুন কোনো আইডিয়া, কোডিং পরামর্শ, যৌথ প্রজেক্ট বা শুধু কুশল বিনিময়ের জন্য সরাসরি মেসেজ দিন।', 'Whether for collaborative opportunities, project inquiries, or thoughtful discussion.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
            <h3 className="font-bold text-lg text-stone-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t('যোগাযোগের মাধ্যম', 'Direct Channels')}</span>
            </h3>

            <div className="space-y-4">
              {profile.email && (
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-medium">{t('ইমেইল', 'Email')}</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">{t('বর্তমান অবস্থান', 'Location')}</p>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {t(profile.locationBn || profile.location, profile.location)}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
              <p className="text-xs text-stone-400 font-medium mb-3">
                {t('সোশ্যাল মিডিয়া প্রোফাইল', 'Social Networks')}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                  {t('বার্তা সফলভাবে পাঠানো হয়েছে!', 'Message Sent Successfully!')}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  {t('ধন্যবাদ বার্তাটি পাঠানোর জন্য। ইনশাআল্লাহ দ্রুত যোগাযোগ করবো।', 'Thank you for reaching out. I will get back to you as soon as possible, in sha Allah.')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200"
                >
                  {t('আরেকটি বার্তা পাঠান', 'Send another message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">
                  {t('সরাসরি বার্তা লিখুন', 'Send a Direct Note')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                      {t('আপনার নাম *', 'Your Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('যেমন: আব্দুল্লাহ', 'e.g. Abdullah')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                      {t('আপনার ইমেইল *', 'Your Email *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    {t('বিষয় (ঐচ্ছিক)', 'Subject (Optional)')}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t('বার্তার বিষয়বস্তু', 'What is this regarding?')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    {t('আপনার বার্তা *', 'Your Message *')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('এখানে আপনার বিস্তারিত বার্তা লিখুন...', 'Write your message here...')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? t('পাঠানো হচ্ছে...', 'Sending...') : t('বার্তা পাঠান', 'Send Message')}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
