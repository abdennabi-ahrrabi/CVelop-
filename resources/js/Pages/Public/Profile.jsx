import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

const socialIcons = {
    linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
    ),
    twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
    ),
    github: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
    ),
    instagram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
    ),
    facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
    ),
    youtube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
    ),
    tiktok: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
    ),
    dribbble: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
        </svg>
    ),
    behance: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.63c.55 0 .998-.14 1.35-.41.35-.27.525-.65.525-1.14 0-.3-.06-.55-.17-.75-.11-.2-.26-.36-.45-.47-.19-.11-.41-.19-.65-.24-.24-.05-.5-.08-.77-.08H3.143v3.1h3.403v-.01zm.185 5.427c.3 0 .58-.04.84-.11.26-.07.49-.18.69-.33.2-.15.36-.34.48-.58.12-.24.18-.54.18-.9 0-.72-.22-1.24-.66-1.57-.44-.32-1.01-.49-1.71-.49H3.143v3.98h3.588-.001zM15.93 6.475h6.64v1.59h-6.64V6.475zm3.22 9.91c.57.548 1.37.823 2.42.823.74 0 1.39-.18 1.93-.55.54-.37.87-.79 1-.26h3.12c-.49 1.5-1.21 2.59-2.19 3.26-.98.67-2.17 1-3.59 1-1.03 0-1.94-.17-2.75-.5-.8-.33-1.49-.79-2.04-1.39-.56-.6-.99-1.31-1.28-2.14-.3-.83-.44-1.73-.44-2.71 0-.95.15-1.82.46-2.62.31-.8.74-1.5 1.31-2.08.57-.58 1.25-1.03 2.05-1.36.8-.33 1.68-.5 2.65-.5.98 0 1.86.18 2.64.54.78.36 1.43.87 1.97 1.52.54.65.94 1.43 1.21 2.33.27.91.37 1.91.32 3.02h-8.99c.05 1.13.45 1.99 1.02 2.54l-.01-.01zm4.31-5.34c-.44-.48-1.12-.75-2.05-.75-.6 0-1.11.1-1.51.31-.4.21-.72.47-.97.76-.24.3-.41.6-.5.89-.09.3-.15.55-.17.76h6.18c-.12-.9-.53-1.48-.98-1.97z"/>
        </svg>
    ),
};

// Theme configurations
const themeStyles = {
    default: {
        bg: 'bg-[#0a0a0f]',
        gradient: 'from-violet-600 to-indigo-600',
        accent: 'violet',
        cardBg: 'bg-white/5',
        border: 'border-white/10',
    },
    minimal: {
        bg: 'bg-white',
        gradient: 'from-gray-800 to-gray-900',
        accent: 'gray',
        cardBg: 'bg-gray-50',
        border: 'border-gray-200',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
    },
    ocean: {
        bg: 'bg-[#0c1929]',
        gradient: 'from-cyan-500 to-blue-600',
        accent: 'cyan',
        cardBg: 'bg-white/5',
        border: 'border-white/10',
    },
    forest: {
        bg: 'bg-[#0a1a0f]',
        gradient: 'from-emerald-500 to-green-600',
        accent: 'emerald',
        cardBg: 'bg-white/5',
        border: 'border-white/10',
    },
    sunset: {
        bg: 'bg-[#1a0a0f]',
        gradient: 'from-orange-500 to-pink-600',
        accent: 'orange',
        cardBg: 'bg-white/5',
        border: 'border-white/10',
    },
    neon: {
        bg: 'bg-[#0a0a1a]',
        gradient: 'from-pink-500 to-rose-600',
        accent: 'pink',
        cardBg: 'bg-white/5',
        border: 'border-white/10',
    },
};

export default function Profile({ profile, resumes, projects, businessCard }) {
    const [showQr, setShowQr] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactForm, setContactForm] = useState({
        sender_name: '',
        sender_email: '',
        subject: '',
        message: '',
    });
    const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get theme styles
    const theme = themeStyles[profile.theme] || themeStyles.default;
    const isLightTheme = profile.theme === 'minimal';

    const trackClick = async (linkType, linkUrl) => {
        try {
            await fetch('/track/click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({
                    user_id: profile.id,
                    link_type: linkType,
                    link_url: linkUrl,
                }),
            });
        } catch (e) {
            // Silently fail
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setContactStatus({ type: '', message: '' });

        try {
            await axios.post('/contact', {
                user_id: profile.id,
                ...contactForm,
            });
            setContactStatus({ type: 'success', message: 'Your message has been sent successfully!' });
            setContactForm({ sender_name: '', sender_email: '', subject: '', message: '' });
            setTimeout(() => setShowContactForm(false), 2000);
        } catch (error) {
            setContactStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send message. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head title={`${profile.name} | Indentio`} />

            <div className={`min-h-screen ${theme.bg}`}>
                {/* Cover Image */}
                <div className={`relative h-48 md:h-64 bg-gradient-to-br ${theme.gradient}`}>
                    {profile.cover_image && (
                        <img
                            src={profile.cover_image}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Profile Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16">
                    {/* Avatar & Basic Info */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-32 h-32 rounded-full border-4 border-[#0a0a0f] overflow-hidden bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl">
                            {profile.avatar ? (
                                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-bold text-white">
                                    {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 text-3xl font-bold text-white">{profile.name}</h1>
                        <p className="text-gray-400">@{profile.username}</p>

                        {profile.headline && (
                            <p className="mt-2 text-lg text-violet-400 font-medium">{profile.headline}</p>
                        )}

                        {profile.location && (
                            <div className="mt-2 flex items-center gap-2 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{profile.location}</span>
                            </div>
                        )}

                        {profile.bio && (
                            <p className="mt-4 text-gray-300 max-w-xl">{profile.bio}</p>
                        )}
                    </div>

                    {/* Contact & Social Links */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {profile.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                onClick={() => trackClick('email', profile.email)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </a>
                        )}

                        {profile.phone && (
                            <a
                                href={`tel:${profile.phone}`}
                                onClick={() => trackClick('phone', profile.phone)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call
                            </a>
                        )}

                        {profile.website && (
                            <a
                                href={profile.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackClick('website', profile.website)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                Website
                            </a>
                        )}

                        {profile.show_contact_form !== false && (
                            <button
                                onClick={() => setShowContactForm(true)}
                                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${theme.gradient} hover:opacity-90 rounded-xl text-white transition-all`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Contact Me
                            </button>
                        )}

                        <button
                            onClick={() => setShowQr(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            QR Code
                        </button>
                    </div>

                    {/* Social Links */}
                    {profile.show_social_links !== false && Object.keys(profile.social_links).length > 0 && (
                        <div className="flex justify-center gap-3 mb-8">
                            {Object.entries(profile.social_links).map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackClick(platform, url)}
                                    className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                                    title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                >
                                    {socialIcons[platform] || (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    )}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Custom Links */}
                    {profile.custom_links && profile.custom_links.length > 0 && (
                        <div className="space-y-3 mb-8">
                            {profile.custom_links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackClick('custom', link.url)}
                                    className="block w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 rounded-xl text-center text-white font-medium transition-all"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Business Card Info - Displayed directly */}
                    {profile.show_business_card !== false && businessCard && (
                        <div className="mb-8">
                            <div className={`p-6 rounded-2xl ${theme.cardBg} border ${theme.border}`}>
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Card Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <svg className={`w-5 h-5 ${isLightTheme ? 'text-gray-600' : 'text-violet-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                            <h2 className={`text-lg font-semibold ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Contact Information</h2>
                                        </div>

                                        <div className="space-y-3">
                                            {businessCard.title && (
                                                <p className={`font-medium ${isLightTheme ? 'text-gray-700' : 'text-violet-400'}`}>
                                                    {businessCard.title}
                                                </p>
                                            )}
                                            {businessCard.company && (
                                                <p className={isLightTheme ? 'text-gray-600' : 'text-gray-400'}>
                                                    {businessCard.company}
                                                </p>
                                            )}

                                            {/* Contact Details */}
                                            <div className="pt-3 space-y-2">
                                                {businessCard.email && (
                                                    <a
                                                        href={`mailto:${businessCard.email}`}
                                                        onClick={() => trackClick('card_email', businessCard.email)}
                                                        className={`flex items-center gap-3 ${isLightTheme ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors`}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-sm">{businessCard.email}</span>
                                                    </a>
                                                )}
                                                {businessCard.phone && (
                                                    <a
                                                        href={`tel:${businessCard.phone}`}
                                                        onClick={() => trackClick('card_phone', businessCard.phone)}
                                                        className={`flex items-center gap-3 ${isLightTheme ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors`}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        <span className="text-sm">{businessCard.phone}</span>
                                                    </a>
                                                )}
                                                {businessCard.location && (
                                                    <div className={`flex items-center gap-3 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="text-sm">{businessCard.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={`/card/${businessCard.slug}`}
                                            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${theme.gradient} text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                            View Business Card
                                        </Link>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.origin + `/card/${businessCard.slug}`);
                                            }}
                                            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 ${isLightTheme ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-white/10 hover:bg-white/20 text-white'} text-sm font-medium rounded-xl transition-all`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                            Share Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Projects / Portfolio */}
                    {profile.show_projects !== false && projects && projects.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-white mb-4">Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`group relative overflow-hidden rounded-2xl border ${
                                            project.is_featured
                                                ? 'border-violet-500/50 bg-gradient-to-br from-violet-600/10 to-indigo-600/10'
                                                : 'border-white/10 bg-white/5'
                                        } hover:border-violet-500/50 transition-all`}
                                    >
                                        {project.image && (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    {project.category && (
                                                        <span className="text-xs text-violet-400 font-medium">
                                                            {project.category}
                                                        </span>
                                                    )}
                                                </div>
                                                {project.is_featured && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-400 rounded-full">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            {project.description && (
                                                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                                                    {project.description}
                                                </p>
                                            )}
                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1">
                                                    {project.technologies.slice(0, 4).map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-0.5 text-xs bg-white/10 text-gray-300 rounded-full"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 4 && (
                                                        <span className="px-2 py-0.5 text-xs bg-white/10 text-gray-400 rounded-full">
                                                            +{project.technologies.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="mt-3 flex items-center gap-3">
                                                {project.url && (
                                                    <a
                                                        href={project.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => trackClick('project_url', project.url)}
                                                        className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        Live Demo
                                                    </a>
                                                )}
                                                {project.github_url && (
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => trackClick('project_github', project.github_url)}
                                                        className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                        </svg>
                                                        Code
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Public Resumes */}
                    {profile.show_resumes !== false && resumes && resumes.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4">Resumes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {resumes.map((resume) => (
                                    <Link
                                        key={resume.id}
                                        href={`/@${profile.username}/resume/${resume.id}`}
                                        className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 rounded-xl transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{resume.title}</h3>
                                                <p className="text-sm text-gray-400">View resume</p>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Powered by */}
                    <div className="mt-12 text-center">
                        <a href="/" className="text-gray-500 hover:text-violet-400 text-sm transition-colors">
                            Powered by Indentio
                        </a>
                    </div>
                </div>
            </div>

            {/* QR Code Modal */}
            {showQr && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowQr(false)}>
                    <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Share Profile</h3>
                            <button onClick={() => setShowQr(false)} className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-xl mb-4">
                            <img
                                src={`/qr/generate?url=${encodeURIComponent(window.location.href)}&size=250`}
                                alt="QR Code"
                                className="w-full"
                            />
                        </div>
                        <p className="text-center text-gray-400 text-sm mb-4">
                            Scan to visit @{profile.username}'s profile
                        </p>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                            }}
                            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all"
                        >
                            Copy Link
                        </button>
                    </div>
                </div>
            )}

            {/* Contact Form Modal */}
            {showContactForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowContactForm(false)}>
                    <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Contact {profile.name}</h3>
                            <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {contactStatus.message && (
                            <div className={`mb-4 p-3 rounded-xl text-sm ${
                                contactStatus.type === 'success'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                                {contactStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Your Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={contactForm.sender_name}
                                    onChange={(e) => setContactForm({ ...contactForm, sender_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Your Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={contactForm.sender_email}
                                    onChange={(e) => setContactForm({ ...contactForm, sender_email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={contactForm.subject}
                                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="Let's connect!"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Message *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                                    placeholder="Hi! I'd love to connect..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-4 text-xs text-gray-500 text-center">
                            Your message will be sent directly to {profile.name}'s inbox.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
