import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function Settings({ user, themes }) {
    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [newLink, setNewLink] = useState({ title: '', url: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        username: user.username || '',
        headline: user.headline || '',
        bio: user.bio || '',
        location: user.location || '',
        phone: user.phone || '',
        website: user.website || '',
        linkedin_url: user.linkedin_url || '',
        twitter_url: user.twitter_url || '',
        github_url: user.github_url || '',
        instagram_url: user.instagram_url || '',
        facebook_url: user.facebook_url || '',
        youtube_url: user.youtube_url || '',
        tiktok_url: user.tiktok_url || '',
        dribbble_url: user.dribbble_url || '',
        behance_url: user.behance_url || '',
        is_public: user.is_public ?? false,
        show_email: user.show_email ?? false,
        show_phone: user.show_phone ?? false,
        show_projects: user.show_projects ?? true,
        show_resumes: user.show_resumes ?? true,
        show_business_card: user.show_business_card ?? true,
        show_contact_form: user.show_contact_form ?? true,
        show_social_links: user.show_social_links ?? true,
        theme: user.theme || 'default',
        profile_layout: user.profile_layout || 'default',
        custom_links: user.custom_links || [],
    });

    // Show success message when form is successfully submitted
    useEffect(() => {
        if (recentlySuccessful) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('profile.settings.update'), {
            preserveScroll: true,
        });
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        router.post(route('profile.avatar'), formData, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('cover_image', file);

        router.post(route('profile.cover'), formData, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const addCustomLink = () => {
        if (newLink.title && newLink.url) {
            setData('custom_links', [...data.custom_links, { ...newLink }]);
            setNewLink({ title: '', url: '' });
        }
    };

    const removeCustomLink = (index) => {
        setData('custom_links', data.custom_links.filter((_, i) => i !== index));
    };

    const tabs = [
        { id: 'profile', name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'appearance', name: 'Appearance', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
        { id: 'sections', name: 'Sections', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
        { id: 'social', name: 'Social Links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
        { id: 'privacy', name: 'Privacy', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Profile Settings" />

            <div className="py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white">Public Profile Settings</h1>
                        <p className="text-gray-400 mt-1">Customize how your profile appears to visitors</p>
                        {user.is_public && (
                            <a
                                href={user.profile_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 text-violet-400 hover:text-violet-300 text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View your public profile
                            </a>
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Tabs */}
                        <div className="lg:w-64 flex-shrink-0">
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-violet-600 text-white'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                        </svg>
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit}>
                                {/* Success Message */}
                                {showSuccess && (
                                    <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                                        <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-emerald-400 font-medium">Settings saved successfully!</span>
                                    </div>
                                )}

                                {/* Validation Errors */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-red-400 font-medium">Please fix the following errors:</span>
                                        </div>
                                        <ul className="list-disc list-inside text-red-400 text-sm space-y-1">
                                            {Object.entries(errors).map(([field, message]) => (
                                                <li key={field}>{message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <div className="space-y-6">
                                        {/* Avatar & Cover */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                                            {/* Cover Image */}
                                            <div
                                                className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600 relative cursor-pointer group"
                                                onClick={() => coverInputRef.current?.click()}
                                            >
                                                {user.cover_image && (
                                                    <img src={user.cover_image} alt="Cover" className="w-full h-full object-cover" />
                                                )}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <span className="text-white text-sm font-medium">Change Cover</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={coverInputRef}
                                                    onChange={handleCoverUpload}
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                            </div>

                                            {/* Avatar */}
                                            <div className="px-6 pb-6">
                                                <div className="flex items-end gap-4 -mt-12">
                                                    <div
                                                        className="w-24 h-24 rounded-2xl border-4 border-[#0a0a0f] bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center cursor-pointer group relative overflow-hidden"
                                                        onClick={() => avatarInputRef.current?.click()}
                                                    >
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-2xl font-bold text-white">
                                                                {user.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                            </span>
                                                        )}
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={avatarInputRef}
                                                            onChange={handleAvatarUpload}
                                                            accept="image/*"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                    <div className="pb-2">
                                                        <h2 className="text-lg font-bold text-white">{user.name}</h2>
                                                        <p className="text-gray-400 text-sm">@{data.username}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Basic Info */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Username *</label>
                                                    <div className="flex items-center">
                                                        <span className="px-4 py-3 bg-white/10 border border-white/10 border-r-0 rounded-l-xl text-gray-400">@</span>
                                                        <input
                                                            type="text"
                                                            value={data.username}
                                                            onChange={(e) => setData('username', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                                                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-r-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                            placeholder="yourname"
                                                        />
                                                    </div>
                                                    {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Headline</label>
                                                    <input
                                                        type="text"
                                                        value={data.headline}
                                                        onChange={(e) => setData('headline', e.target.value)}
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                        placeholder="Full Stack Developer | Open Source Enthusiast"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                                                    <textarea
                                                        value={data.bio}
                                                        onChange={(e) => setData('bio', e.target.value)}
                                                        rows={4}
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                                                        placeholder="Tell visitors about yourself..."
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                                        <input
                                                            type="text"
                                                            value={data.location}
                                                            onChange={(e) => setData('location', e.target.value)}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                            placeholder="San Francisco, CA"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
                                                        <input
                                                            type="url"
                                                            value={data.website}
                                                            onChange={(e) => setData('website', e.target.value)}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                            placeholder="https://yourwebsite.com"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Custom Links */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h3 className="text-lg font-semibold text-white mb-4">Custom Links</h3>
                                            <p className="text-gray-400 text-sm mb-4">Add custom buttons to your profile (like Linktree)</p>

                                            {data.custom_links.length > 0 && (
                                                <div className="space-y-2 mb-4">
                                                    {data.custom_links.map((link, index) => (
                                                        <div key={index} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                                                            <div className="flex-1">
                                                                <p className="text-white font-medium">{link.title}</p>
                                                                <p className="text-gray-400 text-sm truncate">{link.url}</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeCustomLink(index)}
                                                                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newLink.title}
                                                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                                    placeholder="Link title"
                                                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                />
                                                <input
                                                    type="url"
                                                    value={newLink.url}
                                                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                                    placeholder="https://..."
                                                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={addCustomLink}
                                                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Appearance Tab */}
                                {activeTab === 'appearance' && (
                                    <div className="space-y-6">
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h3 className="text-lg font-semibold text-white mb-4">Choose Your Theme</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {themes.map((theme) => (
                                                    <button
                                                        key={theme.id}
                                                        type="button"
                                                        onClick={() => setData('theme', theme.id)}
                                                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                            data.theme === theme.id
                                                                ? 'border-violet-500 bg-violet-500/10'
                                                                : 'border-white/10 hover:border-white/30'
                                                        }`}
                                                    >
                                                        {/* Theme Preview */}
                                                        <div
                                                            className="h-20 rounded-lg mb-3 relative overflow-hidden"
                                                            style={{ backgroundColor: theme.preview.background }}
                                                        >
                                                            <div
                                                                className="absolute top-2 left-2 w-8 h-8 rounded-full"
                                                                style={{ backgroundColor: theme.preview.accent }}
                                                            />
                                                            <div
                                                                className="absolute bottom-2 left-2 right-2 h-2 rounded"
                                                                style={{ backgroundColor: theme.preview.text, opacity: 0.3 }}
                                                            />
                                                            <div
                                                                className="absolute bottom-5 left-2 w-16 h-2 rounded"
                                                                style={{ backgroundColor: theme.preview.text, opacity: 0.5 }}
                                                            />
                                                        </div>
                                                        <h4 className="font-semibold text-white">{theme.name}</h4>
                                                        <p className="text-xs text-gray-400">{theme.description}</p>
                                                        {data.theme === theme.id && (
                                                            <span className="inline-flex items-center gap-1 mt-2 text-xs text-violet-400">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                Active
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Sections Tab */}
                                {activeTab === 'sections' && (
                                    <div className="space-y-6">
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h3 className="text-lg font-semibold text-white mb-2">Profile Sections</h3>
                                            <p className="text-gray-400 text-sm mb-6">Choose which sections appear on your public profile</p>

                                            <div className="space-y-4">
                                                {[
                                                    { key: 'show_projects', label: 'Projects', desc: 'Display your portfolio projects' },
                                                    { key: 'show_resumes', label: 'Resumes', desc: 'Show your public resumes' },
                                                    { key: 'show_business_card', label: 'Business Card', desc: 'Link to your digital business card' },
                                                    { key: 'show_contact_form', label: 'Contact Form', desc: 'Let visitors send you messages' },
                                                    { key: 'show_social_links', label: 'Social Links', desc: 'Display your social media links' },
                                                ].map((section) => (
                                                    <label
                                                        key={section.key}
                                                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
                                                    >
                                                        <div>
                                                            <span className="text-white font-medium">{section.label}</span>
                                                            <p className="text-sm text-gray-400">{section.desc}</p>
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                type="checkbox"
                                                                checked={data[section.key]}
                                                                onChange={(e) => setData(section.key, e.target.checked)}
                                                                className="sr-only"
                                                            />
                                                            <div className={`w-12 h-7 rounded-full transition-colors ${data[section.key] ? 'bg-violet-600' : 'bg-gray-600'}`}>
                                                                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform mt-1 ${data[section.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Social Links Tab */}
                                {activeTab === 'social' && (
                                    <div className="space-y-6">
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h3 className="text-lg font-semibold text-white mb-4">Social Media Links</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    { key: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
                                                    { key: 'twitter_url', label: 'Twitter / X', placeholder: 'https://twitter.com/username' },
                                                    { key: 'github_url', label: 'GitHub', placeholder: 'https://github.com/username' },
                                                    { key: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/username' },
                                                    { key: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/username' },
                                                    { key: 'youtube_url', label: 'YouTube', placeholder: 'https://youtube.com/@channel' },
                                                    { key: 'tiktok_url', label: 'TikTok', placeholder: 'https://tiktok.com/@username' },
                                                    { key: 'dribbble_url', label: 'Dribbble', placeholder: 'https://dribbble.com/username' },
                                                    { key: 'behance_url', label: 'Behance', placeholder: 'https://behance.net/username' },
                                                ].map((social) => (
                                                    <div key={social.key}>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">{social.label}</label>
                                                        <input
                                                            type="url"
                                                            value={data[social.key]}
                                                            onChange={(e) => setData(social.key, e.target.value)}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                            placeholder={social.placeholder}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Privacy Tab */}
                                {activeTab === 'privacy' && (
                                    <div className="space-y-6">
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h3 className="text-lg font-semibold text-white mb-2">Profile Visibility</h3>
                                            <p className="text-gray-400 text-sm mb-6">Control who can see your profile and information</p>

                                            <div className="space-y-4">
                                                <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                                    <div>
                                                        <span className="text-white font-medium">Public Profile</span>
                                                        <p className="text-sm text-gray-400">Allow anyone to view your profile at @{data.username}</p>
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.is_public}
                                                            onChange={(e) => setData('is_public', e.target.checked)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-12 h-7 rounded-full transition-colors ${data.is_public ? 'bg-violet-600' : 'bg-gray-600'}`}>
                                                            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform mt-1 ${data.is_public ? 'translate-x-6' : 'translate-x-1'}`} />
                                                        </div>
                                                    </div>
                                                </label>

                                                <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                                    <div>
                                                        <span className="text-white font-medium">Show Email</span>
                                                        <p className="text-sm text-gray-400">Display your email address on your profile</p>
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.show_email}
                                                            onChange={(e) => setData('show_email', e.target.checked)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-12 h-7 rounded-full transition-colors ${data.show_email ? 'bg-violet-600' : 'bg-gray-600'}`}>
                                                            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform mt-1 ${data.show_email ? 'translate-x-6' : 'translate-x-1'}`} />
                                                        </div>
                                                    </div>
                                                </label>

                                                <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                                    <div>
                                                        <span className="text-white font-medium">Show Phone</span>
                                                        <p className="text-sm text-gray-400">Display your phone number on your profile</p>
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.show_phone}
                                                            onChange={(e) => setData('show_phone', e.target.checked)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-12 h-7 rounded-full transition-colors ${data.show_phone ? 'bg-violet-600' : 'bg-gray-600'}`}>
                                                            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform mt-1 ${data.show_phone ? 'translate-x-6' : 'translate-x-1'}`} />
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-6">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white mb-1">Privacy Note</h4>
                                                    <p className="text-sm text-gray-400">
                                                        Even with "Show Email" disabled, visitors can still contact you through the contact form.
                                                        Your email is never shared with them directly.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Save Button */}
                                <div className="mt-8 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    {user.is_public && (
                                        <a
                                            href={user.profile_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all"
                                        >
                                            Preview
                                        </a>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
