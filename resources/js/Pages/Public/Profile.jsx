import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const socialIcons = {
    linkedin: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>),
    twitter: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>),
    github: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>),
    instagram: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>),
    facebook: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>),
    youtube: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>),
    dribbble: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/></svg>),
    behance: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.63c.55 0 .998-.14 1.35-.41.35-.27.525-.65.525-1.14 0-.3-.06-.55-.17-.75-.11-.2-.26-.36-.45-.47-.19-.11-.41-.19-.65-.24-.24-.05-.5-.08-.77-.08H3.143v3.1h3.403v-.01zm.185 5.427c.3 0 .58-.04.84-.11.26-.07.49-.18.69-.33.2-.15.36-.34.48-.58.12-.24.18-.54.18-.9 0-.72-.22-1.24-.66-1.57-.44-.32-1.01-.49-1.71-.49H3.143v3.98h3.588-.001zM15.93 6.475h6.64v1.59h-6.64V6.475zm3.22 9.91c.57.548 1.37.823 2.42.823.74 0 1.39-.18 1.93-.55.54-.37.87-.79 1-.26h3.12c-.49 1.5-1.21 2.59-2.19 3.26-.98.67-2.17 1-3.59 1-1.03 0-1.94-.17-2.75-.5-.8-.33-1.49-.79-2.04-1.39-.56-.6-.99-1.31-1.28-2.14-.3-.83-.44-1.73-.44-2.71 0-.95.15-1.82.46-2.62.31-.8.74-1.5 1.31-2.08.57-.58 1.25-1.03 2.05-1.36.8-.33 1.68-.5 2.65-.5.98 0 1.86.18 2.64.54.78.36 1.43.87 1.97 1.52.54.65.94 1.43 1.21 2.33.27.91.37 1.91.32 3.02h-8.99c.05 1.13.45 1.99 1.02 2.54l-.01-.01zm4.31-5.34c-.44-.48-1.12-.75-2.05-.75-.6 0-1.11.1-1.51.31-.4.21-.72.47-.97.76-.24.3-.41.6-.5.89-.09.3-.15.55-.17.76h6.18c-.12-.9-.53-1.48-.98-1.97z"/></svg>),
};

// ============================================================================
// EXECUTIVE TEMPLATE - Modern premium design with glassmorphism
// ============================================================================
function ExecutiveTemplate({ profile, projects, testimonials, services, certifications, awards, clientLogos, languages, featuredResume, businessCard, onContact, onShowQr }) {
    const availabilityLabels = {
        available: 'Available for hire',
        open_to_work: 'Open to opportunities',
        freelance: 'Available for freelance',
        employed: 'Currently employed',
        not_available: 'Not available'
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px]"></div>
            </div>

            {/* Glass Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-3">
                            {profile.logo ? (
                                <img src={profile.logo} alt="" className="h-8 w-auto object-contain" />
                            ) : profile.avatar ? (
                                <img src={profile.avatar} alt="" className="w-9 h-9 rounded-xl object-cover ring-2 ring-white/10" />
                            ) : (
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                                    {profile.name.charAt(0)}
                                </div>
                            )}
                            <span className="text-white font-semibold tracking-tight">{profile.name.split(' ')[0]}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-1">
                            <a href="#about" className="px-4 py-2 text-white/60 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all">About</a>
                            {services?.length > 0 && <a href="#services" className="px-4 py-2 text-white/60 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all">Services</a>}
                            {projects?.length > 0 && <a href="#work" className="px-4 py-2 text-white/60 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all">Work</a>}
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={onShowQr} className="p-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            </button>
                            <button onClick={onContact} className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/25">
                                Let's Talk
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Cover */}
            <section id="about" className="relative pt-28">
                {/* Cover Image */}
                <div className="relative h-[320px] md:h-[400px] overflow-hidden">
                    {profile.cover_image ? (
                        <img src={profile.cover_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-violet-900/50 via-indigo-900/50 to-slate-900"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/50 to-transparent"></div>
                </div>

                {/* Profile Content */}
                <div className="relative max-w-7xl mx-auto px-6 -mt-32 md:-mt-40">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Left - Avatar Card */}
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden ring-4 ring-[#0a0a0f] shadow-2xl">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-6xl font-bold text-white">
                                            {profile.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                {profile.availability_status && profile.availability_status !== 'not_available' && (
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full ring-4 ring-[#0a0a0f] flex items-center justify-center">
                                        <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right - Info */}
                        <div className="flex-1 pt-4 lg:pt-8">
                            {profile.availability_status && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                    </span>
                                    {profile.availability_text || availabilityLabels[profile.availability_status]}
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                                {profile.name}
                            </h1>

                            {profile.headline && (
                                <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 font-medium mb-4">{profile.headline}</p>
                            )}

                            {profile.location && (
                                <div className="flex items-center gap-2 text-white/50 mb-6">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{profile.location}</span>
                                </div>
                            )}

                            {/* Quick Actions & Socials */}
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <button onClick={onContact} className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/25 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Get In Touch
                                </button>
                                {profile.website && (
                                    <a href={profile.website} target="_blank" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all border border-white/10 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        Website
                                    </a>
                                )}
                                {Object.keys(profile.social_links || {}).length > 0 && (
                                    <div className="flex gap-2">
                                        {Object.entries(profile.social_links).map(([platform, url]) => (
                                            <a key={platform} href={url} target="_blank" className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                                                {socialIcons[platform]}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bio & Stats Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 mt-12">
                        {/* Bio Card */}
                        {profile.bio && (
                            <div className="lg:col-span-2 p-6 md:p-8 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl">
                                <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">About</h2>
                                <p className="text-white/70 text-lg leading-relaxed">{profile.bio}</p>
                            </div>
                        )}

                        {/* Stats Bento */}
                        {(profile.years_of_experience || profile.projects_completed || profile.clients_served) && (
                            <div className={`${profile.bio ? '' : 'lg:col-span-3'}`}>
                                <div className={`grid ${profile.bio ? 'grid-cols-1' : 'grid-cols-3'} gap-4 h-full`}>
                                    {profile.years_of_experience && (
                                        <div className="p-6 bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl flex flex-col justify-center">
                                            <div className="text-4xl font-bold text-white mb-1">{profile.years_of_experience}<span className="text-violet-400">+</span></div>
                                            <div className="text-white/40 text-sm">Years Experience</div>
                                        </div>
                                    )}
                                    {profile.projects_completed && (
                                        <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 rounded-2xl flex flex-col justify-center">
                                            <div className="text-4xl font-bold text-white mb-1">{profile.projects_completed}<span className="text-indigo-400">+</span></div>
                                            <div className="text-white/40 text-sm">Projects Done</div>
                                        </div>
                                    )}
                                    {profile.clients_served && (
                                        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl flex flex-col justify-center">
                                            <div className="text-4xl font-bold text-white mb-1">{profile.clients_served}<span className="text-blue-400">+</span></div>
                                            <div className="text-white/40 text-sm">Happy Clients</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            {featuredResume?.skills?.length > 0 && (
                <section className="relative py-20 mt-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-10">
                            <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">Expertise</h2>
                            <p className="text-3xl font-bold text-white">Skills & Technologies</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {featuredResume.skills.map((skill, i) => (
                                <span
                                    key={skill.id}
                                    className="px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-violet-500/50 text-white/80 hover:text-white rounded-xl text-sm font-medium transition-all cursor-default"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Client Logos - Marquee Style */}
            {clientLogos?.length > 0 && (
                <section className="py-16 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-sm font-semibold text-white/30 uppercase tracking-wider mb-10 text-center">Trusted By Industry Leaders</h2>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                            {clientLogos.map(client => (
                                <div key={client.id} className="group">
                                    {client.url ? (
                                        <a href={client.url} target="_blank" className="block opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                                            {client.logo && <img src={client.logo} alt={client.name} className="h-8 md:h-12 w-auto object-contain" />}
                                        </a>
                                    ) : (
                                        <div className="opacity-40 grayscale hover:opacity-70 transition-all duration-300">
                                            {client.logo && <img src={client.logo} alt={client.name} className="h-8 md:h-12 w-auto object-contain" />}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services - Modern Cards */}
            {services?.length > 0 && (
                <section id="services" className="relative py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
                            <div>
                                <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">What I Do</h2>
                                <p className="text-4xl font-bold text-white">Services</p>
                            </div>
                            <p className="text-white/50 max-w-md">Professional solutions tailored to bring your vision to life</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, i) => (
                                <div
                                    key={service.id}
                                    className={`group relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
                                        service.is_featured
                                            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-600/20'
                                            : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-violet-500/30'
                                    }`}
                                >
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${service.is_featured ? 'bg-white/20' : 'bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20'}`}>
                                        <span className={`text-2xl font-bold ${service.is_featured ? 'text-white' : 'text-violet-400'}`}>{String(i + 1).padStart(2, '0')}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                    {service.price_display && (
                                        <p className={`text-sm font-semibold mb-3 ${service.is_featured ? 'text-violet-200' : 'text-violet-400'}`}>
                                            {service.price_display}
                                        </p>
                                    )}
                                    {service.description && (
                                        <p className={`leading-relaxed mb-4 ${service.is_featured ? 'text-white/80' : 'text-white/50'}`}>
                                            {service.description}
                                        </p>
                                    )}
                                    {service.features?.length > 0 && (
                                        <ul className="space-y-2 mt-6">
                                            {service.features.map((f, idx) => (
                                                <li key={idx} className={`text-sm flex items-start gap-2.5 ${service.is_featured ? 'text-white/80' : 'text-white/50'}`}>
                                                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${service.is_featured ? 'text-white' : 'text-emerald-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {service.is_featured && (
                                        <div className="absolute top-6 right-6 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold text-white">
                                            Popular
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects - Gallery Grid */}
            {projects?.length > 0 && (
                <section id="work" className="relative py-24 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
                            <div>
                                <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">Portfolio</h2>
                                <p className="text-4xl font-bold text-white">Featured Work</p>
                            </div>
                            <p className="text-white/50 max-w-md">A selection of projects that showcase my skills and experience</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                                        project.is_featured ? 'md:col-span-2 md:row-span-2' : ''
                                    }`}
                                >
                                    {/* Project Image or Gradient */}
                                    <div className={`relative ${project.is_featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-violet-900/50 via-indigo-900/50 to-slate-900 flex items-center justify-center">
                                                    <span className="text-6xl font-bold text-white/10">{project.title.charAt(0)}</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                            {project.category && (
                                                <span className="inline-flex self-start px-3 py-1 bg-violet-500/20 backdrop-blur-sm border border-violet-500/20 rounded-full text-violet-300 text-xs font-medium mb-3">
                                                    {project.category}
                                                </span>
                                            )}
                                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                            {project.description && (
                                                <p className="text-white/60 text-sm line-clamp-2 mb-4">{project.description}</p>
                                            )}

                                            {/* Technologies */}
                                            {project.technologies?.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.technologies.slice(0, project.is_featured ? 5 : 3).map((tech, idx) => (
                                                        <span key={idx} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-white/70 text-xs">{tech}</span>
                                                    ))}
                                                    {project.technologies.length > (project.is_featured ? 5 : 3) && (
                                                        <span className="px-2.5 py-1 text-white/40 text-xs">+{project.technologies.length - (project.is_featured ? 5 : 3)}</span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Links */}
                                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {project.url && (
                                                    <a href={project.url} target="_blank" className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all flex items-center gap-1.5">
                                                        View Project
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                    </a>
                                                )}
                                                {project.github_url && (
                                                    <a href={project.github_url} target="_blank" className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all">
                                                        Source
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Featured Badge */}
                                        {project.is_featured && (
                                            <div className="absolute top-6 right-6 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience from Resume */}
            {featuredResume?.work_experiences?.length > 0 && (
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
                            <div>
                                <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">Journey</h2>
                                <p className="text-4xl font-bold text-white">Work Experience</p>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-indigo-500 to-transparent hidden md:block"></div>
                            <div className="space-y-8">
                                {featuredResume.work_experiences.slice(0, 4).map((exp, i) => (
                                    <div key={exp.id} className="relative flex gap-8 group">
                                        {/* Timeline dot */}
                                        <div className="hidden md:flex w-16 flex-shrink-0 justify-center">
                                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 ring-4 ring-[#0a0a0f] group-hover:scale-125 transition-transform"></div>
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-violet-500/30 transition-all">
                                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                                    <p className="text-violet-400 font-medium">{exp.company}</p>
                                                </div>
                                                <span className="px-3 py-1 bg-white/5 rounded-full text-white/50 text-sm">
                                                    {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                                                </span>
                                            </div>
                                            {exp.description && (
                                                <p className="text-white/50 leading-relaxed">{exp.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
                <section className="py-24 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">Credentials</h2>
                            <p className="text-4xl font-bold text-white">Certifications</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certifications.map(cert => (
                                <div key={cert.id} className="group p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-violet-500/30 transition-all">
                                    <div className="flex items-start gap-4">
                                        {cert.badge_image ? (
                                            <img src={cert.badge_image} alt="" className="w-16 h-16 object-contain" />
                                            ) : (
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-white mb-1">{cert.name}</h3>
                                                <p className="text-white/50 text-sm">{cert.issuer}</p>
                                                {cert.issue_date && (
                                                    <p className="text-white/30 text-xs mt-1">{cert.issue_date}</p>
                                                )}
                                            </div>
                                        </div>
                                        {cert.credential_url && (
                                        <a href={cert.credential_url} target="_blank" className="mt-4 inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-medium">
                                            Verify Credential
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Awards */}
            {awards?.length > 0 && (
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">Recognition</h2>
                            <p className="text-4xl font-bold text-white">Awards & Achievements</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {awards.map(award => (
                                <div key={award.id} className="group flex gap-5 p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-amber-500/30 transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg mb-1">{award.title}</h3>
                                        {award.issuer && <p className="text-white/50">{award.issuer}</p>}
                                        {award.date && <p className="text-white/30 text-sm mt-1">{award.date}</p>}
                                        {award.description && <p className="text-white/50 mt-3 leading-relaxed">{award.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {testimonials?.length > 0 && (
                <section className="py-24 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">Testimonials</h2>
                            <p className="text-4xl font-bold text-white">What Clients Say</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {testimonials.map(t => (
                                <blockquote key={t.id} className="relative p-8 bg-white/[0.03] border border-white/10 rounded-3xl">
                                    {/* Quote Icon */}
                                    <div className="absolute -top-4 -left-2 text-6xl text-violet-500/20 font-serif">"</div>

                                    {t.rating && (
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-5 h-5 ${i < t.rating ? 'text-amber-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-white/70 text-lg leading-relaxed mb-8">"{t.content}"</p>
                                    <footer className="flex items-center gap-4">
                                        {t.client_avatar ? (
                                            <img src={t.client_avatar} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                                {t.client_name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <cite className="text-white font-semibold not-italic block">{t.client_name}</cite>
                                            <p className="text-white/40 text-sm">
                                                {t.client_title}{t.client_company && ` at ${t.client_company}`}
                                            </p>
                                        </div>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
                <section className="py-16 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-wrap items-center gap-6">
                            <h2 className="text-sm font-semibold text-white/30 uppercase tracking-wider">Languages</h2>
                            <div className="flex flex-wrap gap-3">
                                {languages.map(lang => (
                                    <div key={lang.id} className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl">
                                        <span className="text-white font-medium">{lang.language}</span>
                                        <span className="text-white/40 text-sm ml-2">• {lang.proficiency_label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Contact CTA */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Create Something Amazing</h2>
                    <p className="text-white/50 text-xl mb-10 max-w-2xl mx-auto">Ready to bring your vision to life? I'd love to hear about your project.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={onContact} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all shadow-2xl shadow-violet-600/30 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Start a Conversation
                        </button>
                        {profile.email && (
                            <a href={`mailto:${profile.email}`} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all border border-white/10 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {profile.email}
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            {profile.logo ? (
                                <img src={profile.logo} alt="" className="h-8 w-auto object-contain opacity-50" />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                                    {profile.name.charAt(0)}
                                </div>
                            )}
                            <p className="text-white/30 text-sm">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {Object.entries(profile.social_links || {}).map(([platform, url]) => (
                                <a key={platform} href={url} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                                    {socialIcons[platform]}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// ============================================================================
// MINIMAL TEMPLATE - Clean white space design
// ============================================================================
function MinimalTemplate({ profile, projects, testimonials, services, certifications, awards, clientLogos, languages, featuredResume, businessCard, onContact, onShowQr }) {
    const availabilityLabels = {
        available: 'Available for hire',
        open_to_work: 'Open to opportunities',
        freelance: 'Available for freelance',
        employed: 'Currently employed',
        not_available: 'Not available'
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Floating Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-1 px-2 py-2 bg-white rounded-full shadow-xl shadow-black/10 border border-gray-200">
                    <a href="#about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">About</a>
                    <a href="#work" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">Work</a>
                    <button onClick={onContact} className="px-5 py-2 text-sm font-semibold bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
                        Contact
                    </button>
                </div>
            </nav>

            {/* Hero Section - Split Layout */}
            <section id="about" className="min-h-screen pt-24 pb-16 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
                        {/* Left: Content */}
                        <div className="order-2 lg:order-1">
                            {/* Availability Badge */}
                            {profile.availability_status && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border-2 border-slate-300 rounded-full mb-8">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-600"></span>
                                    </span>
                                    <span className="text-sm text-slate-700 font-semibold">{profile.availability_text || availabilityLabels[profile.availability_status]}</span>
                                </div>
                            )}

                            {/* Name & Title */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
                                {profile.name.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>

                            {profile.headline && (
                                <p className="text-xl md:text-2xl text-gray-600 font-medium mb-8 max-w-md">
                                    {profile.headline}
                                </p>
                            )}

                            {profile.location && (
                                <div className="flex items-center gap-2 text-gray-500 mb-8">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="font-medium">{profile.location}</span>
                                </div>
                            )}

                            {/* Stats Row */}
                            {(profile.years_of_experience || profile.projects_completed || profile.clients_served) && (
                                <div className="flex gap-10 mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    {profile.years_of_experience && (
                                        <div>
                                            <div className="text-4xl font-black text-gray-900">{profile.years_of_experience}+</div>
                                            <div className="text-sm font-medium text-gray-500 mt-1">Years Experience</div>
                                        </div>
                                    )}
                                    {profile.projects_completed && (
                                        <div>
                                            <div className="text-4xl font-black text-gray-900">{profile.projects_completed}+</div>
                                            <div className="text-sm font-medium text-gray-500 mt-1">Projects Done</div>
                                        </div>
                                    )}
                                    {profile.clients_served && (
                                        <div>
                                            <div className="text-4xl font-black text-gray-900">{profile.clients_served}+</div>
                                            <div className="text-sm font-medium text-gray-500 mt-1">Happy Clients</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button onClick={onContact} className="group px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2 font-semibold shadow-xl shadow-gray-900/20">
                                    <span>Let's Talk</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                                <button onClick={onShowQr} className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold">
                                    Share Profile
                                </button>
                            </div>

                            {/* Social Links */}
                            {Object.keys(profile.social_links || {}).length > 0 && (
                                <div className="flex gap-3 mt-10 pt-10 border-t-2 border-gray-100">
                                    {Object.entries(profile.social_links).map(([platform, url]) => (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            className="w-12 h-12 rounded-xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
                                        >
                                            {socialIcons[platform]}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Visual */}
                        <div className="order-1 lg:order-2 relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-slate-200 to-zinc-300 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-2xl opacity-50"></div>

                            {/* Profile Image Card */}
                            <div className="relative">
                                {profile.cover_image ? (
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-400/30 border-4 border-white">
                                        <img
                                            src={profile.cover_image}
                                            alt=""
                                            className="w-full aspect-[4/5] object-cover"
                                        />
                                        {/* Overlay with avatar */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex items-end gap-4 p-5 bg-white rounded-2xl shadow-xl border border-gray-100">
                                                {profile.avatar ? (
                                                    <img src={profile.avatar} alt="" className="w-16 h-16 rounded-xl object-cover ring-4 ring-gray-100" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-gray-900 flex items-center justify-center text-xl font-bold text-white ring-4 ring-gray-100">
                                                        {profile.name.charAt(0)}
                                                    </div>
                                                )}
                                                {profile.bio && (
                                                    <p className="text-sm text-gray-600 font-medium line-clamp-2 flex-1">{profile.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-gray-400/20 border-2 border-gray-100">
                                        {/* Dot Pattern */}
                                        <div className="absolute inset-0 opacity-[0.04]" style={{
                                            backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
                                            backgroundSize: '24px 24px'
                                        }}></div>

                                        <div className="relative text-center py-12">
                                            {profile.avatar ? (
                                                <img
                                                    src={profile.avatar}
                                                    alt={profile.name}
                                                    className="w-44 h-44 rounded-3xl object-cover mx-auto ring-4 ring-gray-100 shadow-2xl"
                                                />
                                            ) : (
                                                <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-5xl font-bold text-white mx-auto shadow-2xl">
                                                    {profile.name.charAt(0)}
                                                </div>
                                            )}

                                            {profile.bio && (
                                                <p className="text-gray-600 font-medium mt-8 max-w-sm mx-auto leading-relaxed">{profile.bio}</p>
                                            )}

                                            {profile.logo && (
                                                <div className="mt-8 pt-8 border-t-2 border-gray-100">
                                                    <img src={profile.logo} alt="Logo" className="h-10 mx-auto" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            {featuredResume?.skills?.length > 0 && (
                <section className="py-20 bg-gray-100">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">Technical Expertise</h2>
                        <div className="flex flex-wrap gap-3">
                            {featuredResume.skills.map((skill, idx) => {
                                const colors = [
                                    'bg-slate-700 hover:bg-slate-600',
                                    'bg-zinc-700 hover:bg-zinc-600',
                                    'bg-stone-700 hover:bg-stone-600',
                                    'bg-neutral-700 hover:bg-neutral-600',
                                    'bg-gray-700 hover:bg-gray-600',
                                ];
                                return (
                                    <span
                                        key={idx}
                                        className={`px-5 py-2.5 ${colors[idx % colors.length]} rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all cursor-default`}
                                    >
                                        {skill.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Client Logos */}
            {clientLogos?.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <div className="text-center mb-10">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Trusted By</h2>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-12">
                            {clientLogos.map(client => (
                                <div key={client.id} className="group">
                                    {client.url ? (
                                        <a href={client.url} target="_blank" className="block opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                                            {client.logo && <img src={client.logo} alt={client.name} className="h-10 md:h-12 w-auto object-contain" />}
                                        </a>
                                    ) : (
                                        <div className="opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300">
                                            {client.logo && <img src={client.logo} alt={client.name} className="h-10 md:h-12 w-auto object-contain" />}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {projects?.length > 0 && (
                <section id="work" className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-end justify-between mb-14">
                            <div>
                                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Portfolio</h2>
                                <p className="text-4xl md:text-5xl font-black text-gray-900">Recent Projects</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <span className="text-6xl font-black text-gray-200">{String(projects.length).padStart(2, '0')}</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project, i) => (
                                <div
                                    key={project.id}
                                    className={`group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                                        project.is_featured ? 'md:col-span-2' : ''
                                    }`}
                                >
                                    {/* Project Image or Gradient */}
                                    <div className={`relative ${project.is_featured ? 'h-80' : 'h-56'} overflow-hidden`}>
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
                                                {/* Pattern */}
                                                <div className="absolute inset-0 opacity-20" style={{
                                                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                                    backgroundSize: '24px 24px'
                                                }}></div>
                                            </div>
                                        )}

                                        {/* Featured Badge */}
                                        {project.is_featured && (
                                            <div className="absolute top-4 left-4 px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                Featured
                                            </div>
                                        )}

                                        {/* Number */}
                                        <div className="absolute bottom-4 right-4 text-7xl font-black text-white/20">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        {project.category && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                                                {project.category}
                                            </span>
                                        )}
                                        <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-3 group-hover:text-slate-600 transition-colors">{project.title}</h3>
                                        {project.description && (
                                            <p className="text-gray-600 line-clamp-2 mb-5">{project.description}</p>
                                        )}

                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {project.technologies.slice(0, 4).map((tech, idx) => (
                                                    <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">{tech}</span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex gap-6 pt-5 border-t-2 border-gray-100">
                                            {project.url && (
                                                <a href={project.url} target="_blank" className="text-sm font-bold text-gray-900 hover:text-slate-600 flex items-center gap-2 transition-colors">
                                                    View Project
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Source Code</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Section */}
            {services?.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">What I Offer</h2>
                            <p className="text-4xl md:text-5xl font-black text-gray-900">Services</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, i) => (
                                <div
                                    key={service.id}
                                    className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                                        service.is_featured
                                            ? 'bg-slate-800 text-white shadow-2xl shadow-slate-900/40 scale-[1.02]'
                                            : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl'
                                    }`}
                                >
                                    {/* Top Bar */}
                                    {!service.is_featured && (
                                        <div className="h-1.5 bg-slate-700"></div>
                                    )}

                                    {service.is_featured && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-600 text-white text-xs font-bold rounded-full shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="p-8">
                                        {/* Number */}
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                                            service.is_featured ? 'bg-slate-700' : 'bg-slate-800'
                                        }`}>
                                            <span className="text-xl font-bold text-white">{String(i + 1).padStart(2, '0')}</span>
                                        </div>

                                        <h3 className={`text-xl font-bold mb-3 ${service.is_featured ? 'text-white' : 'text-gray-900'}`}>
                                            {service.title}
                                        </h3>

                                        {service.description && (
                                            <p className={`mb-6 ${service.is_featured ? 'text-slate-400' : 'text-gray-600'}`}>
                                                {service.description}
                                            </p>
                                        )}

                                        {service.features?.length > 0 && (
                                            <ul className="space-y-3 mb-6">
                                                {service.features.slice(0, 4).map((f, idx) => (
                                                    <li key={idx} className={`flex items-center gap-3 ${service.is_featured ? 'text-slate-300' : 'text-gray-700'}`}>
                                                        <svg className={`w-4 h-4 flex-shrink-0 ${service.is_featured ? 'text-slate-400' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="font-medium">{f}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {service.price_display && (
                                            <div className={`pt-6 border-t ${service.is_featured ? 'border-slate-700' : 'border-gray-200'}`}>
                                                <span className={`text-2xl font-bold ${service.is_featured ? 'text-white' : 'text-gray-900'}`}>
                                                    {service.price_display}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience Section - Timeline */}
            {featuredResume?.work_experiences?.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Career Path</h2>
                            <p className="text-4xl md:text-5xl font-black text-gray-900">Experience</p>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2"></div>

                            <div className="space-y-12">
                                {featuredResume.work_experiences.slice(0, 5).map((exp, i) => (
                                    <div key={exp.id} className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-slate-700 rounded-full -translate-x-1/2 z-10 ring-4 ring-white"></div>

                                        {/* Date */}
                                        <div className={`hidden md:block flex-1 ${i % 2 === 0 ? 'text-right pr-14' : 'text-left pl-14'}`}>
                                            <span className="text-sm font-bold text-white bg-slate-700 px-4 py-2 rounded-full">
                                                {exp.start_date?.split('-')[0]} — {exp.is_current ? 'Present' : exp.end_date?.split('-')[0]}
                                            </span>
                                        </div>

                                        {/* Card */}
                                        <div className={`flex-1 ml-10 md:ml-0 ${i % 2 === 0 ? 'md:pl-14' : 'md:pr-14'}`}>
                                            <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 border-l-4 border-l-slate-700 shadow-md hover:shadow-lg transition-all">
                                                <span className="md:hidden text-xs font-bold text-white bg-slate-700 px-3 py-1 rounded-full mb-3 inline-block">
                                                    {exp.start_date?.split('-')[0]} — {exp.is_current ? 'Present' : exp.end_date?.split('-')[0]}
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                                                <p className="text-slate-600 font-semibold">{exp.company}</p>
                                                {exp.description && (
                                                    <p className="text-gray-600 mt-3 line-clamp-3">{exp.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Certifications & Awards */}
            {(certifications?.length > 0 || awards?.length > 0) && (
                <section className="py-24 px-6 md:px-12 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Certifications */}
                            {certifications?.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Credentials</h2>
                                            <p className="text-2xl font-black text-gray-900">Certifications</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {certifications.map((cert, i) => (
                                            <div key={cert.id} className="group flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                                                {cert.badge_image ? (
                                                    <img src={cert.badge_image} alt="" className="w-12 h-12 object-contain rounded-lg" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-lg font-bold text-white">{i + 1}</span>
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                                                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                                                </div>
                                                {cert.credential_url && (
                                                    <a href={cert.credential_url} target="_blank" className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Awards */}
                            {awards?.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recognition</h2>
                                            <p className="text-2xl font-black text-gray-900">Awards</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {awards.map((award, i) => (
                                            <div key={award.id} className="group flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                                                <div className="w-12 h-12 rounded-lg bg-zinc-700 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900">{award.title}</h3>
                                                    <p className="text-gray-600 text-sm">{award.issuer}{award.date && ` · ${award.date}`}</p>
                                                    {award.description && (
                                                        <p className="text-gray-500 mt-2 text-sm line-clamp-2">{award.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {testimonials?.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-gray-900">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Testimonials</h2>
                        <p className="text-4xl md:text-5xl font-black text-white mb-16">What Clients Say</p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {testimonials.map(t => (
                                <blockquote key={t.id} className="bg-white/10 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 text-left hover:bg-white/15 transition-colors">
                                    {t.rating && (
                                        <div className="flex gap-1 mb-5">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-6 h-6 ${i < t.rating ? 'text-amber-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-lg text-white/90 leading-relaxed mb-6 font-medium">"{t.content}"</p>
                                    <footer className="flex items-center gap-4">
                                        {t.client_avatar ? (
                                            <img src={t.client_avatar} alt="" className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/20" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center text-white font-bold text-lg">
                                                {t.client_name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <cite className="text-white font-bold not-italic block text-lg">{t.client_name}</cite>
                                            <p className="text-gray-400 font-medium">{t.client_title}{t.client_company && ` at ${t.client_company}`}</p>
                                        </div>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
                <section className="py-16 px-6 md:px-12 bg-white border-t-2 border-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Languages:</span>
                            {languages.map(lang => (
                                <div key={lang.id} className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border-2 border-gray-200">
                                    <span className="font-bold text-gray-900">{lang.language}</span>
                                    <span className="text-xs font-semibold px-2 py-1 bg-gray-200 text-gray-600 rounded-md">{lang.proficiency_label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact CTA */}
            <section className="py-24 px-6 md:px-12 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-br from-slate-800 to-zinc-900 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-slate-900/50">
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/10 rounded-full blur-2xl"></div>

                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to start a project?</h2>
                            <p className="text-lg text-white/90 mb-10 max-w-md mx-auto font-medium">Let's create something amazing together.</p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={onContact} className="px-10 py-4 bg-white text-slate-800 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl shadow-black/20 text-lg">
                                    Get in Touch
                                </button>
                                <button onClick={onShowQr} className="px-10 py-4 bg-white/15 text-white font-bold rounded-xl hover:bg-white/25 transition-all border-2 border-white/30 text-lg">
                                    Share Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 md:px-12 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            {profile.logo ? (
                                <img src={profile.logo} alt="" className="h-10" />
                            ) : (
                                <span className="text-white font-bold text-lg">{profile.name}</span>
                            )}
                        </div>

                        <p className="text-gray-400 font-medium">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>

                        <div className="flex items-center gap-6">
                            {profile.email && (
                                <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-white font-medium transition-colors">{profile.email}</a>
                            )}
                            <div className="flex gap-3">
                                {Object.entries(profile.social_links || {}).map(([platform, url]) => (
                                    <a key={platform} href={url} target="_blank" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                                        {socialIcons[platform]}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// ============================================================================
// STUDIO TEMPLATE - Bold creative design
// ============================================================================
function StudioTemplate({ profile, projects, testimonials, services, certifications, awards, clientLogos, languages, featuredResume, businessCard, onContact, onShowQr }) {
    const availabilityLabels = {
        available: 'Available for hire',
        open_to_work: 'Open to opportunities',
        freelance: 'Available for freelance',
        employed: 'Currently employed',
        not_available: 'Not available'
    };

    // CSS for magical animations (injected via style tag)
    const magicStyles = `
        @keyframes aurora {
            0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
            25% { transform: translate(10%, 5%) rotate(5deg) scale(1.1); }
            50% { transform: translate(-5%, 10%) rotate(-5deg) scale(0.95); }
            75% { transform: translate(-10%, -5%) rotate(3deg) scale(1.05); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 1; }
        }
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2); }
            50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.3); }
        }
        @keyframes border-dance {
            0%, 100% { border-color: rgba(168, 85, 247, 0.5); }
            33% { border-color: rgba(236, 72, 153, 0.5); }
            66% { border-color: rgba(6, 182, 212, 0.5); }
        }
        @keyframes orb-float-1 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(30px, -20px); }
            50% { transform: translate(-20px, 30px); }
            75% { transform: translate(20px, 20px); }
        }
        @keyframes orb-float-2 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-40px, 30px); }
            50% { transform: translate(30px, -40px); }
            75% { transform: translate(-30px, -20px); }
        }
        @keyframes orb-float-3 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(50px, 20px); }
            66% { transform: translate(-30px, 50px); }
        }
        .aurora-blob { animation: aurora 20s ease-in-out infinite; }
        .aurora-blob-2 { animation: aurora 25s ease-in-out infinite reverse; }
        .aurora-blob-3 { animation: aurora 30s ease-in-out infinite; animation-delay: -10s; }
        .float-slow { animation: float 6s ease-in-out infinite; }
        .float-medium { animation: float 4s ease-in-out infinite; animation-delay: -2s; }
        .float-fast { animation: float 3s ease-in-out infinite; animation-delay: -1s; }
        .breathe { animation: breathe 4s ease-in-out infinite; }
        .glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .border-dance { animation: border-dance 4s ease-in-out infinite; }
        .orb-1 { animation: orb-float-1 15s ease-in-out infinite; }
        .orb-2 { animation: orb-float-2 20s ease-in-out infinite; }
        .orb-3 { animation: orb-float-3 18s ease-in-out infinite; }
        .holographic {
            background: linear-gradient(
                90deg,
                rgba(168, 85, 247, 0.1) 0%,
                rgba(236, 72, 153, 0.2) 25%,
                rgba(6, 182, 212, 0.2) 50%,
                rgba(168, 85, 247, 0.2) 75%,
                rgba(236, 72, 153, 0.1) 100%
            );
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
        }
        .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-3d:hover {
            transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(10px);
        }
    `;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: magicStyles }} />

            {/* Living Aurora Background - Fixed */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Aurora Blobs */}
                <div className="aurora-blob absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent rounded-full blur-[100px]"></div>
                <div className="aurora-blob-2 absolute top-[20%] right-[-20%] w-[50%] h-[50%] bg-gradient-to-bl from-cyan-500/25 via-blue-500/15 to-transparent rounded-full blur-[120px]"></div>
                <div className="aurora-blob-3 absolute bottom-[-10%] left-[20%] w-[55%] h-[55%] bg-gradient-to-tr from-pink-500/20 via-rose-500/15 to-transparent rounded-full blur-[100px]"></div>

                {/* Floating Orbs */}
                <div className="orb-1 absolute top-[15%] left-[10%] w-3 h-3 bg-purple-400/60 rounded-full blur-[2px]"></div>
                <div className="orb-2 absolute top-[25%] right-[15%] w-2 h-2 bg-cyan-400/50 rounded-full blur-[1px]"></div>
                <div className="orb-3 absolute top-[60%] left-[20%] w-4 h-4 bg-pink-400/40 rounded-full blur-[3px]"></div>
                <div className="orb-1 absolute top-[70%] right-[25%] w-2 h-2 bg-fuchsia-400/50 rounded-full blur-[2px]" style={{ animationDelay: '-5s' }}></div>
                <div className="orb-2 absolute top-[40%] left-[60%] w-3 h-3 bg-violet-400/40 rounded-full blur-[2px]" style={{ animationDelay: '-8s' }}></div>
                <div className="orb-3 absolute top-[85%] left-[40%] w-2 h-2 bg-blue-400/50 rounded-full blur-[1px]" style={{ animationDelay: '-3s' }}></div>

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div>
                            {/* Availability - Glowing Badge */}
                            {profile.availability_status && (
                                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 glow-pulse">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                                    </span>
                                    <span className="text-sm font-medium text-white/90">{profile.availability_text || availabilityLabels[profile.availability_status]}</span>
                                </div>
                            )}

                            {/* Name - Holographic Text */}
                            <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
                                {profile.name.split(' ').map((word, i) => (
                                    <span key={i} className="block">
                                        <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] hover:animate-[shimmer_2s_linear_infinite]">
                                            {word}
                                        </span>
                                    </span>
                                ))}
                            </h1>

                            {profile.headline && (
                                <p className="text-xl md:text-2xl text-white/60 mb-8 font-light max-w-lg">{profile.headline}</p>
                            )}

                            {profile.location && (
                                <div className="flex items-center gap-2 text-white/40 mb-8">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <span className="text-sm">{profile.location}</span>
                                </div>
                            )}

                            {/* Stats - Breathing Glow */}
                            {(profile.years_of_experience || profile.projects_completed || profile.clients_served) && (
                                <div className="flex gap-8 mb-10">
                                    {profile.years_of_experience && (
                                        <div className="breathe">
                                            <span className="text-5xl font-black bg-gradient-to-b from-white to-purple-300 bg-clip-text text-transparent">{profile.years_of_experience}</span>
                                            <p className="text-white/40 text-sm mt-1">Years</p>
                                        </div>
                                    )}
                                    {profile.projects_completed && (
                                        <div className="breathe" style={{ animationDelay: '-1s' }}>
                                            <span className="text-5xl font-black bg-gradient-to-b from-white to-pink-300 bg-clip-text text-transparent">{profile.projects_completed}</span>
                                            <p className="text-white/40 text-sm mt-1">Projects</p>
                                        </div>
                                    )}
                                    {profile.clients_served && (
                                        <div className="breathe" style={{ animationDelay: '-2s' }}>
                                            <span className="text-5xl font-black bg-gradient-to-b from-white to-cyan-300 bg-clip-text text-transparent">{profile.clients_served}</span>
                                            <p className="text-white/40 text-sm mt-1">Clients</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* CTA Buttons - Holographic */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={onContact}
                                    className="group relative px-8 py-4 bg-white text-[#0a0a0f] font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                                >
                                    <span className="relative z-10">Let's Create Magic</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="absolute inset-0 z-10 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 text-white transition-opacity">Let's Create Magic</span>
                                </button>
                                <button
                                    onClick={onShowQr}
                                    className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl font-medium hover:bg-white/10 hover:border-white/30 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                >
                                    Share Profile
                                </button>
                            </div>

                            {/* Social Links - Floating */}
                            {Object.keys(profile.social_links || {}).length > 0 && (
                                <div className="flex gap-3 mt-10">
                                    {Object.entries(profile.social_links).map(([platform, url], i) => (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all ${i % 3 === 0 ? 'float-slow' : i % 3 === 1 ? 'float-medium' : 'float-fast'}`}
                                        >
                                            {socialIcons[platform]}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right - Avatar with Magic Effects */}
                        <div className="relative">
                            {/* Glow rings */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>

                            {/* Avatar container */}
                            <div className="relative rounded-3xl overflow-hidden border border-white/20 glow-pulse">
                                {profile.avatar ? (
                                    <img src={profile.avatar} alt={profile.name} className="w-full aspect-square object-cover" />
                                ) : profile.cover_image ? (
                                    <img src={profile.cover_image} alt="" className="w-full aspect-square object-cover" />
                                ) : (
                                    <div className="w-full aspect-square bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 flex items-center justify-center">
                                        <span className="text-[120px] font-black text-white/90">{profile.name.charAt(0)}</span>
                                    </div>
                                )}
                                {/* Holographic overlay */}
                                <div className="absolute inset-0 holographic opacity-30 pointer-events-none"></div>
                            </div>

                            {/* Floating decorative elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-transparent rounded-full blur-2xl float-slow"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-full blur-2xl float-medium"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills - Floating Constellation */}
            {featuredResume?.skills?.length > 0 && (
                <section className="relative py-24">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-4">Expertise</h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {featuredResume.skills.map((skill, i) => {
                                const colors = [
                                    'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]',
                                    'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-400/60 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]',
                                    'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]',
                                    'from-violet-500/20 to-violet-500/5 border-violet-500/30 hover:border-violet-400/60 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]',
                                    'from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/30 hover:border-fuchsia-400/60 hover:shadow-[0_0_25px_rgba(217,70,239,0.3)]',
                                ];
                                const floatClass = i % 3 === 0 ? 'float-slow' : i % 3 === 1 ? 'float-medium' : 'float-fast';
                                return (
                                    <span
                                        key={skill.id}
                                        className={`${floatClass} px-6 py-3 bg-gradient-to-b ${colors[i % colors.length]} backdrop-blur-sm border rounded-2xl text-white/90 font-medium cursor-default transition-all duration-300 hover:scale-110`}
                                        style={{ animationDelay: `${-i * 0.5}s` }}
                                    >
                                        {skill.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Client Logos - Ethereal */}
            {clientLogos?.length > 0 && (
                <section className="relative py-16 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-8">
                        <p className="text-center text-white/30 text-sm uppercase tracking-[0.2em] mb-10">Trusted By</p>
                        <div className="flex flex-wrap justify-center items-center gap-12">
                            {clientLogos.map(client => (
                                <div key={client.id} className="opacity-30 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
                                    {client.logo ? (
                                        client.url ? (
                                            <a href={client.url} target="_blank">
                                                <img src={client.logo} alt={client.name} className="h-10 w-auto object-contain brightness-0 invert" />
                                            </a>
                                        ) : (
                                            <img src={client.logo} alt={client.name} className="h-10 w-auto object-contain brightness-0 invert" />
                                        )
                                    ) : (
                                        <div className="h-10 px-4 flex items-center justify-center bg-white/10 rounded-lg">
                                            <span className="text-white/60 text-sm font-medium">{client.name}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects - Bento Grid with Holographic Cards */}
            {projects?.length > 0 && (
                <section className="relative py-24">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex items-center justify-between mb-16">
                            <div>
                                <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-3">Portfolio</h2>
                                <p className="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                    Featured Work
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, i) => (
                                <div
                                    key={project.id}
                                    className={`card-3d group relative rounded-3xl overflow-hidden border transition-all duration-500 ${
                                        project.is_featured
                                            ? 'md:col-span-2 lg:col-span-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent'
                                            : 'border-white/10 bg-white/5 hover:border-purple-500/30'
                                    }`}
                                >
                                    {/* Project Image */}
                                    {project.image && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                                            {/* Holographic shimmer on hover */}
                                            <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className={`text-6xl font-black ${project.is_featured ? 'bg-gradient-to-b from-purple-400/40 to-transparent bg-clip-text text-transparent' : 'text-white/10'}`}>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            {project.is_featured && (
                                                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                                                    Featured
                                                </span>
                                            )}
                                        </div>

                                        {project.category && (
                                            <span className="text-purple-400 text-xs uppercase tracking-widest mb-2 block">{project.category}</span>
                                        )}

                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors">{project.title}</h3>

                                        {project.description && (
                                            <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>
                                        )}

                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.technologies.slice(0, 4).map((tech, idx) => (
                                                    <span key={idx} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white/60">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-4 border-t border-white/5">
                                            {project.url && (
                                                <a href={project.url} target="_blank" className="inline-flex items-center gap-2 text-white/60 hover:text-purple-400 transition-colors text-sm font-medium">
                                                    <span>View Project</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" className="text-white/40 hover:text-white transition-colors text-sm">
                                                    Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-xl"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services - Iridescent Cards */}
            {services?.length > 0 && (
                <section className="relative py-24">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-3">Services</h2>
                            <p className="text-4xl font-black text-white">What I Create</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, i) => {
                                const gradients = [
                                    'from-purple-500/20 via-purple-500/5 to-transparent hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]',
                                    'from-pink-500/20 via-pink-500/5 to-transparent hover:shadow-[0_0_50px_rgba(236,72,153,0.2)]',
                                    'from-cyan-500/20 via-cyan-500/5 to-transparent hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]',
                                ];
                                const accentColors = ['purple', 'pink', 'cyan'];
                                const accent = accentColors[i % 3];

                                return (
                                    <div
                                        key={service.id}
                                        className={`card-3d group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-b ${gradients[i % 3]} transition-all duration-500 ${
                                            service.is_featured ? 'lg:scale-105 border-purple-500/50' : 'hover:border-white/20'
                                        }`}
                                    >
                                        {service.is_featured && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg shadow-purple-500/30">
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        {/* Service Icon/Number */}
                                        <div className={`w-14 h-14 rounded-2xl bg-${accent}-500/10 border border-${accent}-500/20 flex items-center justify-center mb-6`}>
                                            <span className={`text-2xl font-black text-${accent}-400`}>{String(i + 1).padStart(2, '0')}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>

                                        {service.price_display && (
                                            <p className={`text-${accent}-400 font-semibold mb-4`}>{service.price_display}</p>
                                        )}

                                        {service.description && (
                                            <p className="text-white/50 text-sm mb-6 leading-relaxed">{service.description}</p>
                                        )}

                                        {service.features?.length > 0 && (
                                            <ul className="space-y-3">
                                                {service.features.map((f, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-white/60 text-sm">
                                                        <svg className={`w-5 h-5 text-${accent}-400 flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Holographic border on hover */}
                                        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-dance opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience - Glowing Timeline */}
            {featuredResume?.work_experiences?.length > 0 && (
                <section className="relative py-24">
                    <div className="max-w-5xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-3">Journey</h2>
                            <p className="text-4xl font-black text-white">Experience</p>
                        </div>

                        <div className="relative">
                            {/* Glowing Timeline Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-cyan-500/50"></div>
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 blur-sm"></div>

                            <div className="space-y-12">
                                {featuredResume.work_experiences.map((exp, i) => (
                                    <div key={exp.id} className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        {/* Timeline Node */}
                                        <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 z-10">
                                            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 glow-pulse"></div>
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-50"></div>
                                        </div>

                                        {/* Content Card */}
                                        <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                                            <div className="card-3d group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                                                <div className={`flex items-start gap-4 ${i % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                                    <div className="flex-1">
                                                        <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-medium mb-3">
                                                            {exp.start_date?.split('-')[0]} — {exp.is_current ? 'Present' : exp.end_date?.split('-')[0]}
                                                        </span>
                                                        <h3 className="text-lg font-bold text-white mb-1">{exp.title}</h3>
                                                        <p className="text-purple-400 font-medium mb-3">{exp.company}</p>
                                                        {exp.description && (
                                                            <p className="text-white/50 text-sm leading-relaxed">{exp.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Certifications & Awards - Combined Magical Section */}
            {(certifications?.length > 0 || awards?.length > 0) && (
                <section className="relative py-24">
                    <div className="max-w-7xl mx-auto px-8">
                        {/* Certifications */}
                        {certifications?.length > 0 && (
                            <div className="mb-20">
                                <div className="text-center mb-12">
                                    <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-3">Credentials</h2>
                                    <p className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Certifications</p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {certifications.map((cert, i) => (
                                        <div
                                            key={cert.id}
                                            className="card-3d group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/30 transition-all duration-500 overflow-hidden"
                                        >
                                            {/* Shimmer effect */}
                                            <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-20 transition-opacity"></div>

                                            <div className="relative flex items-start gap-4">
                                                {cert.badge_image ? (
                                                    <img src={cert.badge_image} alt="" className="w-14 h-14 object-contain rounded-xl" />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center float-slow">
                                                        <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-white mb-1 group-hover:text-pink-200 transition-colors">{cert.name}</h3>
                                                    <p className="text-white/50 text-sm">{cert.issuer}</p>
                                                    {cert.issue_date && <p className="text-white/30 text-xs mt-1">{cert.issue_date}</p>}
                                                </div>
                                            </div>

                                            {cert.credential_url && (
                                                <a href={cert.credential_url} target="_blank" className="relative mt-4 inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors">
                                                    <span>Verify Credential</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Awards */}
                        {awards?.length > 0 && (
                            <div>
                                <div className="text-center mb-12">
                                    <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-3">Recognition</h2>
                                    <p className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Awards</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {awards.map(award => (
                                        <div
                                            key={award.id}
                                            className="card-3d group relative flex gap-5 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-20 transition-opacity"></div>

                                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 float-slow">
                                                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            </div>
                                            <div className="relative flex-1">
                                                <h3 className="font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">{award.title}</h3>
                                                {award.issuer && <p className="text-amber-400 text-sm font-medium">{award.issuer}</p>}
                                                {award.date && <p className="text-white/30 text-xs mt-1">{award.date}</p>}
                                                {award.description && <p className="text-white/50 text-sm mt-3 leading-relaxed">{award.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Testimonials - Holographic Cards */}
            {testimonials?.length > 0 && (
                <section className="relative py-24">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-3">Testimonials</h2>
                            <p className="text-4xl font-black text-white">What People Say</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {testimonials.map((t, i) => (
                                <blockquote
                                    key={t.id}
                                    className="card-3d group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Holographic shimmer */}
                                    <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-30 transition-opacity"></div>

                                    {/* Quote mark decoration */}
                                    <div className="absolute top-4 right-6 text-8xl font-serif text-white/5 pointer-events-none">"</div>

                                    <div className="relative">
                                        {t.rating && (
                                            <div className="flex gap-1 mb-6">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-5 h-5 ${i < t.rating ? 'text-amber-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        )}

                                        <p className="text-lg text-white/80 leading-relaxed mb-8 font-light">"{t.content}"</p>

                                        <footer className="flex items-center gap-4">
                                            {t.client_avatar ? (
                                                <img src={t.client_avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border border-white/20" />
                                            ) : (
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg float-slow">
                                                    {t.client_name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <cite className="text-white font-bold not-italic block">{t.client_name}</cite>
                                                <p className="text-white/40 text-sm">{t.client_title}{t.client_company && ` at ${t.client_company}`}</p>
                                            </div>
                                        </footer>
                                    </div>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Languages - Floating Pills */}
            {languages?.length > 0 && (
                <section className="relative py-16 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            <span className="text-white/30 text-sm uppercase tracking-widest mr-4">Languages</span>
                            {languages.map((lang, i) => (
                                <div
                                    key={lang.id}
                                    className={`px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] ${i % 3 === 0 ? 'float-slow' : i % 3 === 1 ? 'float-medium' : 'float-fast'}`}
                                    style={{ animationDelay: `${-i * 0.8}s` }}
                                >
                                    <span className="text-white font-medium">{lang.language}</span>
                                    <span className="text-white/40 text-sm ml-2">· {lang.proficiency_label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact CTA - Magical Glow */}
            <section className="relative py-32 overflow-hidden">
                {/* Extra aurora for CTA */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600/30 via-pink-500/20 to-cyan-500/30 rounded-full blur-[120px] animate-pulse"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-8 text-center">
                    <div className="inline-block mb-8">
                        <span className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/60 text-sm">
                            Ready to collaborate?
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Let's Create
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            Magic Together
                        </span>
                    </h2>

                    <p className="text-white/50 text-xl mb-12 max-w-lg mx-auto">
                        Have a project in mind? Let's bring your vision to life.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={onContact}
                            className="group relative px-10 py-5 bg-white text-[#0a0a0f] font-bold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]"
                        >
                            <span className="relative z-10">Start a Project</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="absolute inset-0 z-10 flex items-center justify-center font-bold text-lg opacity-0 group-hover:opacity-100 text-white transition-opacity">Start a Project</span>
                        </button>

                        {profile.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                            >
                                {profile.email}
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer - Minimal with Glow */}
            <footer className="relative py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Logo/Name */}
                        <div className="flex items-center gap-4">
                            {profile.logo ? (
                                <img src={profile.logo} alt="" className="h-8" />
                            ) : (
                                <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                    {profile.name}
                                </span>
                            )}
                        </div>

                        {/* Copyright */}
                        <p className="text-white/30 text-sm">
                            © {new Date().getFullYear()} {profile.name}. Crafted with magic.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {Object.entries(profile.social_links || {}).map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
                                >
                                    {socialIcons[platform]}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// ============================================================================
// DEVELOPER TEMPLATE - Interactive Profile Card (No Scroll)
// ============================================================================
function DeveloperTemplate({ profile, projects, testimonials, services, certifications, awards, clientLogos, languages, featuredResume, businessCard, onContact, onShowQr }) {
    const [activeSection, setActiveSection] = useState(null);

    const availabilityLabels = {
        available: 'Available for hire',
        open_to_work: 'Open to opportunities',
        freelance: 'Available for freelance',
        employed: 'Currently employed',
        not_available: 'Not available'
    };

    // Section definitions
    const sections = [
        { id: 'about', label: 'About', icon: 'user', show: true },
        { id: 'skills', label: 'Skills', icon: 'code', show: featuredResume?.skills?.length > 0 },
        { id: 'projects', label: 'Projects', icon: 'folder', show: projects?.length > 0 },
        { id: 'experience', label: 'Experience', icon: 'briefcase', show: featuredResume?.work_experiences?.length > 0 },
        { id: 'services', label: 'Services', icon: 'package', show: services?.length > 0 },
        { id: 'testimonials', label: 'Reviews', icon: 'star', show: testimonials?.length > 0 },
    ].filter(s => s.show);

    const sectionIcons = {
        user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
        code: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
        folder: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
        briefcase: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        package: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
        star: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    };

    // Close section
    const closeSection = () => setActiveSection(null);

    return (
        <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden flex flex-col">
            {/* Subtle Background Pattern */}
            <div className="fixed inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_40%)]"></div>
            </div>

            {/* Transforming Header - Appears when section is active */}
            <div className={`relative z-20 transition-all duration-500 ease-out ${
                activeSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-full pointer-events-none'
            }`}>
                <div className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Left: Avatar + Name + Nav */}
                            <div className="flex items-center gap-6">
                                {/* Compact Avatar */}
                                <button
                                    onClick={closeSection}
                                    className="group flex items-center gap-3 hover:opacity-80 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                                        {profile.avatar ? (
                                            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                                                {profile.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-semibold text-white">{profile.name}</p>
                                        <p className="text-xs text-slate-500">{profile.headline?.slice(0, 30)}{profile.headline?.length > 30 ? '...' : ''}</p>
                                    </div>
                                </button>

                                {/* Divider */}
                                <div className="w-px h-8 bg-white/10 hidden md:block"></div>

                                {/* Section Navigation Pills */}
                                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                                activeSection === section.id
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            <span className="hidden sm:inline">{sectionIcons[section.icon]}</span>
                                            {section.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onContact}
                                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-sm font-medium rounded-lg transition-all hover:scale-105"
                                >
                                    Contact
                                </button>
                                <button
                                    onClick={closeSection}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative flex-1 flex flex-col overflow-hidden">
                {/* Profile Card - Centered, transforms when section active */}
                <div className={`flex-1 flex items-center justify-center p-6 transition-all duration-500 ease-out ${
                    activeSection
                        ? 'opacity-0 scale-95 -translate-y-20 pointer-events-none absolute inset-0'
                        : 'opacity-100 scale-100 translate-y-0'
                }`}>
                    <div className="text-center max-w-2xl mx-auto">
                        {/* Availability Badge - Top */}
                        {profile.availability_status && profile.availability_status !== 'not_available' && (
                            <div className="mb-8">
                                <div className={`inline-flex items-center gap-2.5 px-5 py-2 backdrop-blur-sm border rounded-full ${
                                    profile.availability_status === 'employed'
                                        ? 'bg-slate-800/50 border-slate-600/30'
                                        : 'bg-indigo-500/10 border-indigo-500/20'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${
                                        profile.availability_status === 'employed'
                                            ? 'bg-slate-400'
                                            : 'bg-indigo-400 animate-pulse'
                                    }`}></span>
                                    <span className={`text-sm font-medium tracking-wide ${
                                        profile.availability_status === 'employed'
                                            ? 'text-slate-400'
                                            : 'text-indigo-300'
                                    }`}>{profile.availability_text || availabilityLabels[profile.availability_status]}</span>
                                </div>
                            </div>
                        )}

                        {/* Avatar */}
                        <div className="relative inline-block mb-8">
                            <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-white/10 ring-offset-4 ring-offset-slate-950 mx-auto">
                                {profile.avatar ? (
                                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                                        {profile.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Name & Title */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">{profile.name}</h1>
                        {profile.headline && (
                            <p className="text-xl text-slate-400 mb-4 font-light">{profile.headline}</p>
                        )}

                        {/* Location & Email */}
                        <div className="flex flex-wrap justify-center items-center gap-4 mb-8 text-slate-500">
                            {profile.location && (
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                    {profile.location}
                                </span>
                            )}
                            {profile.email && (
                                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    {profile.email}
                                </a>
                            )}
                        </div>

                        {/* Stats */}
                        {(profile.years_of_experience || profile.projects_completed || profile.clients_served) && (
                            <div className="flex justify-center gap-8 mb-10">
                                {profile.years_of_experience && (
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">{profile.years_of_experience}+</div>
                                        <div className="text-sm text-slate-500">Years</div>
                                    </div>
                                )}
                                {profile.projects_completed && (
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">{profile.projects_completed}+</div>
                                        <div className="text-sm text-slate-500">Projects</div>
                                    </div>
                                )}
                                {profile.clients_served && (
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">{profile.clients_served}+</div>
                                        <div className="text-sm text-slate-500">Clients</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className="group flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    <span className="text-slate-400 group-hover:text-white transition-colors">
                                        {sectionIcons[section.icon]}
                                    </span>
                                    <span className="text-slate-300 group-hover:text-white font-medium transition-colors">
                                        {section.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mb-8">
                            <button
                                onClick={onContact}
                                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                            >
                                Get in Touch
                            </button>
                            <button
                                onClick={onShowQr}
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                Share Profile
                            </button>
                        </div>

                        {/* Social Links */}
                        {Object.keys(profile.social_links || {}).length > 0 && (
                            <div className="flex justify-center gap-4">
                                {Object.entries(profile.social_links).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                                    >
                                        {socialIcons[platform]}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Panel - Slides up when section is active */}
                <div className={`flex-1 transition-all duration-500 ease-out overflow-hidden ${
                    activeSection
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full pointer-events-none absolute inset-0 top-20'
                }`}>
                    <div className="h-full overflow-y-auto px-6 py-8">
                        {/* About Section */}
                            {activeSection === 'about' && (
                                <div className="max-w-3xl mx-auto space-y-8">
                                    {profile.bio && (
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">About Me</h3>
                                            <p className="text-lg text-slate-300 leading-relaxed">{profile.bio}</p>
                                        </div>
                                    )}
                                    {(certifications?.length > 0 || awards?.length > 0) && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {certifications?.length > 0 && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Certifications</h3>
                                                    <div className="space-y-3">
                                                        {certifications.slice(0, 4).map(cert => (
                                                            <div key={cert.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                                                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="font-medium text-white truncate">{cert.name}</p>
                                                                    <p className="text-sm text-slate-500">{cert.issuer}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {awards?.length > 0 && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Awards</h3>
                                                    <div className="space-y-3">
                                                        {awards.slice(0, 4).map(award => (
                                                            <div key={award.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                                                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="font-medium text-white truncate">{award.title}</p>
                                                                    <p className="text-sm text-slate-500">{award.issuer}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {languages?.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Languages</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {languages.map(lang => (
                                                    <div key={lang.id} className="px-4 py-2 bg-white/5 rounded-xl">
                                                        <span className="text-white font-medium">{lang.language}</span>
                                                        <span className="text-slate-500 ml-2">· {lang.proficiency_label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Skills Section */}
                            {activeSection === 'skills' && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex flex-wrap gap-3">
                                        {featuredResume?.skills?.map((skill, i) => {
                                            const colors = [
                                                'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
                                                'bg-purple-500/20 text-purple-300 border-purple-500/30',
                                                'bg-pink-500/20 text-pink-300 border-pink-500/30',
                                                'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
                                                'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                                            ];
                                            return (
                                                <span
                                                    key={skill.id}
                                                    className={`px-5 py-2.5 rounded-xl border font-medium transition-all hover:scale-105 cursor-default ${colors[i % colors.length]}`}
                                                >
                                                    {skill.name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Projects Section */}
                            {activeSection === 'projects' && (
                                <div className="max-w-5xl mx-auto">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {projects?.map((project, i) => (
                                            <div
                                                key={project.id}
                                                className={`group relative p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                                                    project.is_featured
                                                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
                                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                                }`}
                                            >
                                                {project.is_featured && (
                                                    <span className="absolute -top-2 -right-2 px-2 py-1 bg-indigo-500 text-white text-xs font-bold rounded-lg">
                                                        Featured
                                                    </span>
                                                )}
                                                <div className="text-4xl font-bold text-white/10 mb-3">{String(i + 1).padStart(2, '0')}</div>
                                                <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                                                {project.description && (
                                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                                                )}
                                                {project.technologies?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-white/10 rounded-lg text-xs text-slate-400">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="flex gap-4">
                                                    {project.url && (
                                                        <a href={project.url} target="_blank" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                                                            View Project →
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Experience Section */}
                            {activeSection === 'experience' && (
                                <div className="max-w-3xl mx-auto">
                                    <div className="relative">
                                        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent"></div>
                                        <div className="space-y-8">
                                            {featuredResume?.work_experiences?.map((exp, i) => (
                                                <div key={exp.id} className="relative pl-12">
                                                    <div className="absolute left-0 w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                                    </div>
                                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                                                                <p className="text-indigo-400">{exp.company}</p>
                                                            </div>
                                                            <span className="px-3 py-1 bg-white/10 rounded-lg text-sm text-slate-400">
                                                                {exp.start_date?.split('-')[0]} — {exp.is_current ? 'Present' : exp.end_date?.split('-')[0]}
                                                            </span>
                                                        </div>
                                                        {exp.description && (
                                                            <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Services Section */}
                            {activeSection === 'services' && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {services?.map((service, i) => (
                                            <div
                                                key={service.id}
                                                className={`relative p-6 rounded-2xl border transition-all ${
                                                    service.is_featured
                                                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
                                                        : 'bg-white/5 border-white/10'
                                                }`}
                                            >
                                                {service.is_featured && (
                                                    <span className="absolute -top-2 left-6 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-lg">
                                                        Popular
                                                    </span>
                                                )}
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                                                    {service.price_display && (
                                                        <span className="text-emerald-400 font-semibold">{service.price_display}</span>
                                                    )}
                                                </div>
                                                {service.description && (
                                                    <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                                                )}
                                                {service.features?.length > 0 && (
                                                    <ul className="space-y-2">
                                                        {service.features.slice(0, 4).map((f, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                {f}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Testimonials Section */}
                            {activeSection === 'testimonials' && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {testimonials?.map(t => (
                                            <div key={t.id} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                                {t.rating && (
                                                    <div className="flex gap-1 mb-4">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className={`w-5 h-5 ${i < t.rating ? 'text-amber-400' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-slate-300 leading-relaxed mb-6">"{t.content}"</p>
                                                <div className="flex items-center gap-3">
                                                    {t.client_avatar ? (
                                                        <img src={t.client_avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                                            {t.client_name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-white">{t.client_name}</p>
                                                        <p className="text-sm text-slate-500">{t.client_title}{t.client_company && ` at ${t.client_company}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>

            {/* Footer - Always visible at bottom */}
            <div className={`relative z-10 px-6 py-4 border-t border-white/5 transition-all duration-500 ${
                activeSection ? 'bg-slate-950/80 backdrop-blur-sm' : ''
            }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <p className="text-slate-600 text-sm">© {new Date().getFullYear()} {profile.name}</p>
                    <div className="flex gap-3">
                        {Object.entries(profile.social_links || {}).map(([platform, url]) => (
                            <a key={platform} href={url} target="_blank" className="text-slate-600 hover:text-white transition-colors">
                                {socialIcons[platform]}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// LUXE TEMPLATE - Cinematic Split-Screen Design
// ============================================================================
function LuxeTemplate({ profile, projects, testimonials, services, certifications, awards, clientLogos, languages, featuredResume, businessCard, onContact, onShowQr }) {
    const [activeSection, setActiveSection] = useState('about');

    const availabilityLabels = {
        available: 'Available for hire',
        open_to_work: 'Open to opportunities',
        freelance: 'Available for freelance',
        employed: 'Currently employed',
        not_available: 'Not available'
    };

    // Navigation sections
    const navSections = [
        { id: 'about', label: 'About', show: true },
        { id: 'work', label: 'Work', show: projects?.length > 0 },
        { id: 'services', label: 'Services', show: services?.length > 0 },
        { id: 'experience', label: 'Experience', show: featuredResume?.work_experiences?.length > 0 },
        { id: 'testimonials', label: 'Praise', show: testimonials?.length > 0 },
    ].filter(s => s.show);

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = navSections.map(s => document.getElementById(s.id)).filter(Boolean);
            const scrollPos = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].offsetTop <= scrollPos) {
                    setActiveSection(navSections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navSections]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Premium animation styles
    const luxeStyles = `
        @keyframes luxe-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        @keyframes luxe-glow {
            0%, 100% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.15); }
            50% { box-shadow: 0 0 60px rgba(245, 158, 11, 0.3); }
        }
        @keyframes luxe-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes luxe-fade-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes luxe-line {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
        @keyframes luxe-pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        @keyframes luxe-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .luxe-shimmer-btn {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            background-size: 200% 100%;
        }
        .luxe-shimmer-btn:hover {
            animation: luxe-shimmer 1.5s ease infinite;
        }
        .luxe-fade-up {
            animation: luxe-fade-up 0.8s ease-out forwards;
        }
        .luxe-line {
            animation: luxe-line 1s ease-out forwards;
            transform-origin: left;
        }
        .luxe-grain {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            opacity: 0.015;
        }
        .luxe-avatar-ring {
            animation: luxe-rotate 20s linear infinite;
        }
        .luxe-avatar-glow {
            animation: luxe-glow 4s ease-in-out infinite;
        }
        .luxe-gold-text {
            background: linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `;

    return (
        <div className="min-h-screen bg-[#080808] text-white">
            <style>{luxeStyles}</style>

            {/* Subtle grain overlay for texture */}
            <div className="fixed inset-0 luxe-grain pointer-events-none z-50"></div>

            {/* Mobile Header - Only visible on small screens */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-amber-900/20">
                <div className="px-6 py-4 flex items-center justify-between">
                    <span className="text-amber-400 font-light tracking-widest uppercase text-xs">{profile.name}</span>
                    <button onClick={onContact} className="text-amber-400 text-sm tracking-wide">Contact</button>
                </div>
            </div>

            {/* Split Screen Layout */}
            <div className="lg:flex min-h-screen">
                {/* Left Panel - Fixed */}
                <div className="lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-[380px] xl:w-[420px] bg-[#080808] border-r border-amber-900/10 flex flex-col pt-16 lg:pt-0">
                    {/* Decorative gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-amber-900/5 pointer-events-none"></div>

                    {/* Decorative gold line */}
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>

                    {/* Floating gold particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-400/30 rounded-full" style={{animation: 'luxe-float 6s ease-in-out infinite'}}></div>
                        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-amber-400/20 rounded-full" style={{animation: 'luxe-float 8s ease-in-out infinite 1s'}}></div>
                        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-amber-400/20 rounded-full" style={{animation: 'luxe-float 7s ease-in-out infinite 2s'}}></div>
                    </div>

                    <div className="relative flex-1 flex flex-col justify-center px-10 xl:px-14 py-16">
                        {/* Logo/Brand Mark */}
                        <div className="absolute top-8 left-10 xl:left-14">
                            {profile.logo ? (
                                <div className="h-12 flex items-center">
                                    <img src={profile.logo} alt="" className="h-10 w-auto object-contain max-w-[120px]" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 border border-amber-500/30 flex items-center justify-center relative overflow-hidden group cursor-default">
                                    <span className="luxe-gold-text text-lg font-light relative z-10">{profile.name.charAt(0)}</span>
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                    {/* Corner accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-amber-500/50"></div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-amber-500/50"></div>
                                </div>
                            )}
                        </div>

                        {/* Avatar with rotating gold ring */}
                        <div className="mb-12">
                            <div className="relative inline-block">
                                {/* Outer glow */}
                                <div className="absolute -inset-4 rounded-full luxe-avatar-glow"></div>

                                {/* Rotating dashed ring */}
                                <div className="absolute -inset-3 rounded-full border border-dashed border-amber-500/30 luxe-avatar-ring"></div>

                                {/* Static ring */}
                                <div className="absolute -inset-1 rounded-full border border-amber-500/20"></div>

                                {/* Avatar */}
                                <div className="relative w-36 h-36 xl:w-44 xl:h-44 rounded-full overflow-hidden">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-5xl font-extralight text-amber-100">
                                            {profile.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                {/* Corner diamonds */}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 transform rotate-45"></div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 transform rotate-45"></div>
                            </div>
                        </div>

                        {/* Name & Title */}
                        <div className="mb-8">
                            <h1 className="text-3xl xl:text-4xl font-extralight tracking-tight mb-3">
                                <span className="luxe-gold-text">{profile.name}</span>
                            </h1>
                            {profile.headline && (
                                <p className="text-neutral-400 font-light leading-relaxed text-lg">{profile.headline}</p>
                            )}
                        </div>

                        {/* Availability */}
                        {profile.availability_status && (
                            <div className="flex items-center gap-3 mb-8 py-2 px-4 bg-amber-500/5 border border-amber-500/10 w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                                <span className="text-amber-400 text-xs tracking-[0.2em] uppercase font-medium">{profile.availability_text || availabilityLabels[profile.availability_status]}</span>
                            </div>
                        )}

                        {/* Location */}
                        {profile.location && (
                            <div className="flex items-center gap-2 text-neutral-500 text-sm mb-10">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                {profile.location}
                            </div>
                        )}

                        {/* Navigation */}
                        <nav className="mb-10">
                            <ul className="space-y-1">
                                {navSections.map((section, i) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className="group flex items-center gap-4 py-2.5 text-left w-full"
                                        >
                                            <span className={`text-xs font-light transition-colors duration-300 ${
                                                activeSection === section.id ? 'text-amber-400' : 'text-amber-500/30'
                                            }`}>0{i + 1}</span>
                                            <span className={`text-sm tracking-wide transition-all duration-300 ${
                                                activeSection === section.id
                                                    ? 'text-amber-400 translate-x-1'
                                                    : 'text-neutral-500 group-hover:text-neutral-300'
                                            }`}>
                                                {section.label}
                                            </span>
                                            <span className={`flex-1 h-px transition-all duration-500 origin-left ${
                                                activeSection === section.id
                                                    ? 'bg-amber-500/40 scale-x-100'
                                                    : 'bg-amber-900/0 scale-x-0 group-hover:scale-x-100 group-hover:bg-amber-900/20'
                                            }`}></span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Social Links */}
                        {Object.keys(profile.social_links || {}).length > 0 && (
                            <div className="flex gap-5 mb-10">
                                {Object.entries(profile.social_links).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        className="text-neutral-600 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                                    >
                                        {socialIcons[platform]}
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={onContact}
                                className="relative w-full py-4 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium tracking-widest uppercase transition-all duration-300 overflow-hidden group"
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <div className="absolute inset-0 luxe-shimmer-btn"></div>
                            </button>
                            <button
                                onClick={onShowQr}
                                className="w-full py-4 border border-amber-900/30 hover:border-amber-500/50 text-neutral-400 hover:text-amber-400 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-amber-500/5"
                            >
                                Share
                            </button>
                        </div>

                        {/* Email */}
                        {profile.email && (
                            <a href={`mailto:${profile.email}`} className="block mt-8 text-neutral-600 hover:text-amber-400 text-xs tracking-wide transition-colors">
                                {profile.email}
                            </a>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="relative px-10 xl:px-14 py-6 border-t border-amber-900/10">
                        <p className="text-neutral-700 text-xs">© {new Date().getFullYear()} {profile.name}</p>
                    </div>
                </div>

                {/* Right Panel - Scrollable Content */}
                <div className="lg:ml-[380px] xl:ml-[420px] min-h-screen">
                    {/* About Section - Hero Style */}
                    <section id="about" className="min-h-screen border-b border-amber-900/10 relative">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-48 h-48 border-l border-t border-amber-500/10"></div>
                        <div className="absolute top-20 right-20 w-24 h-24 border border-amber-500/5 transform rotate-45 hidden xl:block"></div>

                        <div className="px-10 xl:px-20 py-24 xl:py-32">
                            {/* Section Header */}
                            <div className="flex items-center gap-4 mb-16">
                                <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">About</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent luxe-line"></div>
                            </div>

                            {/* Main Bio - Large Statement */}
                            {profile.bio && (
                                <div className="mb-20">
                                    <p className="text-3xl xl:text-4xl font-extralight text-white leading-relaxed mb-6">
                                        {profile.bio.split('.')[0]}.
                                    </p>
                                    {profile.bio.split('.').length > 1 && (
                                        <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-3xl">
                                            {profile.bio.split('.').slice(1).join('.').trim()}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Stats - Premium Horizontal Layout */}
                            {(profile.years_of_experience || profile.projects_completed || profile.clients_served) && (
                                <div className="flex flex-wrap gap-0 mb-20 -mx-6">
                                    {profile.years_of_experience && (
                                        <div className="group px-6 py-8 border-r border-amber-900/20 last:border-r-0">
                                            <div className="flex items-end gap-2 mb-2">
                                                <span className="text-6xl xl:text-7xl font-extralight luxe-gold-text">{profile.years_of_experience}</span>
                                                <span className="text-amber-500/40 text-3xl font-extralight pb-2">+</span>
                                            </div>
                                            <p className="text-neutral-500 text-sm tracking-widest uppercase">Years of Experience</p>
                                        </div>
                                    )}
                                    {profile.projects_completed && (
                                        <div className="group px-6 py-8 border-r border-amber-900/20 last:border-r-0">
                                            <div className="flex items-end gap-2 mb-2">
                                                <span className="text-6xl xl:text-7xl font-extralight luxe-gold-text">{profile.projects_completed}</span>
                                                <span className="text-amber-500/40 text-3xl font-extralight pb-2">+</span>
                                            </div>
                                            <p className="text-neutral-500 text-sm tracking-widest uppercase">Projects Delivered</p>
                                        </div>
                                    )}
                                    {profile.clients_served && (
                                        <div className="group px-6 py-8 border-r border-amber-900/20 last:border-r-0">
                                            <div className="flex items-end gap-2 mb-2">
                                                <span className="text-6xl xl:text-7xl font-extralight luxe-gold-text">{profile.clients_served}</span>
                                                <span className="text-amber-500/40 text-3xl font-extralight pb-2">+</span>
                                            </div>
                                            <p className="text-neutral-500 text-sm tracking-widest uppercase">Happy Clients</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Two Column Layout for Skills & Credentials */}
                            <div className="grid lg:grid-cols-2 gap-16">
                                {/* Skills */}
                                {featuredResume?.skills?.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-8 h-8 border border-amber-500/30 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500">Expertise</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {featuredResume.skills.map((skill, i) => (
                                                <span
                                                    key={skill.id}
                                                    className="group px-4 py-2 bg-[#0c0c0c] border border-amber-900/20 text-neutral-400 text-sm tracking-wide hover:border-amber-500/40 hover:text-amber-400 hover:bg-amber-500/5 transition-all cursor-default"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Credentials & Languages Column */}
                                <div className="space-y-12">
                                    {/* Certifications */}
                                    {certifications?.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-8 h-8 border border-amber-500/30 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500">Credentials</h3>
                                            </div>
                                            <div className="space-y-4">
                                                {certifications.slice(0, 4).map(cert => (
                                                    <div key={cert.id} className="group flex items-center gap-4 p-3 -mx-3 hover:bg-amber-500/5 transition-colors">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
                                                            {cert.badge_image ? (
                                                                <img src={cert.badge_image} alt="" className="w-7 h-7 object-contain" />
                                                            ) : (
                                                                <svg className="w-5 h-5 text-amber-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-neutral-200 font-light group-hover:text-amber-400 transition-colors">{cert.name}</p>
                                                            <p className="text-neutral-600 text-sm">{cert.issuer}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Languages */}
                                    {languages?.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-8 h-8 border border-amber-500/30 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500">Languages</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {languages.map(lang => (
                                                    <div key={lang.id} className="p-4 bg-[#0c0c0c] border border-amber-900/20">
                                                        <span className="text-neutral-200 font-light block">{lang.language}</span>
                                                        <span className="text-amber-500/60 text-sm">{lang.proficiency_label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Work/Projects Section */}
                    {projects?.length > 0 && (
                        <section id="work" className="border-b border-amber-900/10 relative">
                            <div className="px-10 xl:px-20 py-32">
                                <div className="flex items-center gap-4 mb-16">
                                    <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">Selected Work</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                                </div>

                                <div className="space-y-0">
                                    {projects.map((project, i) => (
                                        <div
                                            key={project.id}
                                            className="group relative py-10 border-b border-amber-900/10 last:border-0 hover:bg-gradient-to-r hover:from-amber-500/5 hover:to-transparent transition-all duration-500 -mx-10 xl:-mx-20 px-10 xl:px-20"
                                        >
                                            {/* Hover accent line */}
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-amber-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                                            <div className="flex items-start justify-between gap-8">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <span className="text-amber-500/20 text-sm font-light tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                                                        {project.is_featured && (
                                                            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs tracking-widest uppercase">Featured</span>
                                                        )}
                                                        {project.category && (
                                                            <span className="text-neutral-600 text-xs tracking-widest uppercase">{project.category}</span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-2xl xl:text-4xl font-extralight text-white group-hover:text-amber-400 transition-colors duration-300 mb-4">
                                                        {project.title}
                                                    </h3>
                                                    {project.description && (
                                                        <p className="text-neutral-500 leading-relaxed max-w-2xl mb-5">{project.description}</p>
                                                    )}
                                                    {project.technologies?.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            {project.technologies.map((tech, idx) => (
                                                                <span key={idx} className="text-neutral-600 text-xs tracking-wide">{tech}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-6 pt-3">
                                                    {project.url && (
                                                        <a
                                                            href={project.url}
                                                            target="_blank"
                                                            className="group/link flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm tracking-wide transition-all"
                                                        >
                                                            <span>View</span>
                                                            <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Client Logos */}
                    {clientLogos?.length > 0 && (
                        <section className="border-b border-amber-900/10 bg-[#0a0a0a]">
                            <div className="px-10 xl:px-20 py-16">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-4">
                                        <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">Trusted By</span>
                                        <div className="w-16 h-px bg-amber-500/20"></div>
                                    </div>
                                    <span className="text-neutral-700 text-sm">{clientLogos.length} Partners</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {clientLogos.map(client => (
                                        <div
                                            key={client.id}
                                            className="group flex items-center justify-center p-6 border border-amber-900/10 hover:border-amber-500/30 bg-[#080808] hover:bg-amber-500/5 transition-all duration-300"
                                        >
                                            {client.logo ? (
                                                client.url ? (
                                                    <a href={client.url} target="_blank" className="opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                                                        <img src={client.logo} alt={client.name} className="h-10 w-auto object-contain max-w-[120px]" />
                                                    </a>
                                                ) : (
                                                    <img src={client.logo} alt={client.name} className="h-10 w-auto object-contain max-w-[120px] opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
                                                )
                                            ) : (
                                                <span className="text-neutral-500 group-hover:text-amber-400 text-sm tracking-wide font-light transition-colors">{client.name}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Services Section */}
                    {services?.length > 0 && (
                        <section id="services" className="border-b border-amber-900/10 relative">
                            <div className="px-10 xl:px-20 py-32">
                                <div className="flex items-center gap-4 mb-16">
                                    <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">Services</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {services.map((service, i) => (
                                        <div
                                            key={service.id}
                                            className={`group relative p-8 xl:p-10 transition-all duration-500 ${
                                                service.is_featured
                                                    ? 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30'
                                                    : 'bg-[#0c0c0c] border border-amber-900/20 hover:border-amber-500/20'
                                            }`}
                                        >
                                            {/* Service number */}
                                            <span className="absolute top-6 right-6 text-5xl font-extralight text-amber-500/10">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>

                                            {/* Featured ribbon */}
                                            {service.is_featured && (
                                                <div className="absolute -top-px -right-px">
                                                    <div className="bg-amber-500 text-black text-xs font-medium tracking-widest uppercase px-4 py-1">
                                                        Popular
                                                    </div>
                                                </div>
                                            )}

                                            {/* Gold accent on hover */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                                            <div className="relative">
                                                <div className="flex items-start justify-between mb-6">
                                                    <h3 className="text-2xl font-extralight text-white group-hover:text-amber-400 transition-colors">{service.title}</h3>
                                                    {service.price_display && (
                                                        <span className="text-amber-400 text-xl font-light">{service.price_display}</span>
                                                    )}
                                                </div>
                                                {service.description && (
                                                    <p className="text-neutral-500 leading-relaxed mb-8">{service.description}</p>
                                                )}
                                                {service.features?.length > 0 && (
                                                    <ul className="space-y-3">
                                                        {service.features.map((f, idx) => (
                                                            <li key={idx} className="flex items-center gap-3 text-neutral-400">
                                                                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                {f}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Experience Section */}
                    {featuredResume?.work_experiences?.length > 0 && (
                        <section id="experience" className="border-b border-amber-900/10 relative">
                            <div className="px-10 xl:px-20 py-32">
                                <div className="flex items-center gap-4 mb-16">
                                    <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">Experience</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                                </div>

                                <div className="relative">
                                    {/* Vertical timeline line */}
                                    <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent"></div>

                                    <div className="space-y-12">
                                        {featuredResume.work_experiences.map((exp, i) => (
                                            <div key={exp.id} className="group relative pl-12">
                                                {/* Timeline dot */}
                                                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-amber-500/50 bg-[#080808] group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all duration-300">
                                                    <div className="absolute inset-[3px] rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors"></div>
                                                </div>

                                                {/* Current indicator */}
                                                {exp.is_current && (
                                                    <div className="absolute left-0 top-2 w-[15px] h-[15px]">
                                                        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-50"></span>
                                                    </div>
                                                )}

                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                                                    <div>
                                                        <h3 className="text-2xl font-extralight text-white group-hover:text-amber-400 transition-colors">{exp.title}</h3>
                                                        <p className="text-amber-400/80 text-lg">{exp.company}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-neutral-500 text-sm md:text-right">
                                                        <span className="px-3 py-1 bg-amber-500/5 border border-amber-500/10">
                                                            {exp.start_date?.split('-')[0]} — {exp.is_current ? <span className="text-amber-400">Present</span> : exp.end_date?.split('-')[0]}
                                                        </span>
                                                    </div>
                                                </div>
                                                {exp.description && (
                                                    <p className="text-neutral-500 leading-relaxed max-w-2xl">{exp.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Awards */}
                    {awards?.length > 0 && (
                        <section className="border-b border-amber-900/10">
                            <div className="px-10 xl:px-20 py-32">
                                <div className="flex items-center gap-4 mb-16">
                                    <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">Recognition</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {awards.map((award, i) => (
                                        <div key={award.id} className="group relative p-6 bg-[#0c0c0c] border border-amber-900/20 hover:border-amber-500/30 transition-all duration-300">
                                            {/* Gold corner accent */}
                                            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500/30 group-hover:border-amber-500/60 transition-colors"></div>

                                            <div className="flex items-start gap-5">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center flex-shrink-0 group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all">
                                                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-extralight text-white group-hover:text-amber-400 transition-colors">{award.title}</h3>
                                                    <p className="text-amber-400/70 text-sm mt-1">{award.issuer}{award.date && ` · ${award.date}`}</p>
                                                    {award.description && (
                                                        <p className="text-neutral-500 mt-3 leading-relaxed">{award.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Testimonials Section */}
                    {testimonials?.length > 0 && (
                        <section id="testimonials" className="border-b border-amber-900/10 relative overflow-hidden bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]">
                            {/* Large decorative quote marks */}
                            <div className="absolute top-0 left-10 xl:left-20 text-[300px] font-serif text-amber-500/[0.03] leading-none select-none">"</div>
                            <div className="absolute bottom-0 right-10 xl:right-20 text-[300px] font-serif text-amber-500/[0.03] leading-none select-none rotate-180">"</div>

                            <div className="px-10 xl:px-20 py-32 relative">
                                {/* Section Header */}
                                <div className="flex items-center justify-between mb-20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 border border-amber-500/30 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>
                                        <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">Kind Words</span>
                                        <div className="w-24 h-px bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                                    </div>
                                    <span className="text-neutral-700 text-sm hidden md:block">{testimonials.length} Reviews</span>
                                </div>

                                {/* Featured Testimonial - First one larger */}
                                {testimonials.length > 0 && (
                                    <div className="mb-20">
                                        <div className="relative p-10 xl:p-14 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
                                            {/* Corner accents */}
                                            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-amber-500/40"></div>
                                            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-amber-500/40"></div>

                                            {/* Featured badge */}
                                            <div className="absolute -top-3 left-10 px-4 py-1 bg-amber-500 text-black text-xs font-medium tracking-widest uppercase">
                                                Featured
                                            </div>

                                            {/* Rating */}
                                            {testimonials[0].rating && (
                                                <div className="flex gap-1.5 mb-8">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-5 h-5 ${i < testimonials[0].rating ? 'text-amber-400' : 'text-neutral-800'}`} fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Quote */}
                                            <blockquote className="text-2xl xl:text-4xl font-extralight leading-relaxed text-white mb-10">
                                                "{testimonials[0].content}"
                                            </blockquote>

                                            {/* Author */}
                                            <div className="flex items-center gap-5">
                                                {testimonials[0].client_avatar ? (
                                                    <div className="relative">
                                                        <div className="absolute -inset-1 rounded-full border border-dashed border-amber-500/30 luxe-avatar-ring"></div>
                                                        <img src={testimonials[0].client_avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-light text-2xl">
                                                        {testimonials[0].client_name.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <cite className="luxe-gold-text not-italic block text-xl font-light">{testimonials[0].client_name}</cite>
                                                    <span className="text-neutral-500">{testimonials[0].client_title}{testimonials[0].client_company && ` · ${testimonials[0].client_company}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Other Testimonials Grid */}
                                {testimonials.length > 1 && (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {testimonials.slice(1).map((t, i) => (
                                            <div
                                                key={t.id}
                                                className="group relative p-8 bg-[#0c0c0c] border border-amber-900/20 hover:border-amber-500/30 transition-all duration-300"
                                            >
                                                {/* Quote icon */}
                                                <div className="absolute top-6 right-6 text-amber-500/10">
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                    </svg>
                                                </div>

                                                {/* Rating */}
                                                {t.rating && (
                                                    <div className="flex gap-1 mb-5">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <svg key={idx} className={`w-4 h-4 ${idx < t.rating ? 'text-amber-400' : 'text-neutral-800'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Quote */}
                                                <blockquote className="text-lg xl:text-xl font-extralight leading-relaxed text-neutral-300 mb-8 line-clamp-4">
                                                    "{t.content}"
                                                </blockquote>

                                                {/* Divider */}
                                                <div className="w-12 h-px bg-amber-500/30 mb-6"></div>

                                                {/* Author */}
                                                <div className="flex items-center gap-4">
                                                    {t.client_avatar ? (
                                                        <img src={t.client_avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-1 ring-amber-500/20" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-100 font-light text-lg">
                                                            {t.client_name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <cite className="text-amber-400 not-italic block font-light group-hover:text-amber-300 transition-colors">{t.client_name}</cite>
                                                        <span className="text-neutral-600 text-sm">{t.client_title}{t.client_company && ` · ${t.client_company}`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Contact CTA */}
                    <section className="min-h-[70vh] flex items-center relative">
                        {/* Decorative gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent"></div>

                        {/* Decorative corner */}
                        <div className="absolute bottom-0 right-0 w-48 h-48 border-r border-b border-amber-500/10"></div>

                        <div className="px-10 xl:px-20 py-32 relative">
                            <div className="flex items-center gap-4 mb-10">
                                <span className="text-amber-500/50 text-xs tracking-[0.3em] uppercase">Let's Connect</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                            </div>

                            <h2 className="text-4xl xl:text-6xl font-extralight mb-8 max-w-2xl leading-tight">
                                Ready to bring your <span className="text-amber-400">vision</span> to life?
                            </h2>
                            <p className="text-neutral-500 text-lg mb-12 max-w-lg leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                <button
                                    onClick={onContact}
                                    className="group relative px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium tracking-widest uppercase transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10">Start a Conversation</span>
                                    <div className="absolute inset-0 luxe-shimmer-btn"></div>
                                </button>

                                {profile.email && (
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="group flex items-center gap-3 text-neutral-400 hover:text-amber-400 transition-colors"
                                    >
                                        <span className="text-sm tracking-wide">{profile.email}</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN PROFILE COMPONENT
// ============================================================================
export default function Profile({ profile, featuredResume, projects, businessCard, testimonials = [], services = [], certifications = [], awards = [], clientLogos = [], languages = [] }) {
    const [showQr, setShowQr] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactForm, setContactForm] = useState({ sender_name: '', sender_email: '', subject: '', message: '' });
    const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Map old template names to new ones
    const templateMap = { modern: 'executive', classic: 'minimal', creative: 'studio' };
    const templateId = templateMap[profile.portfolio_template] || profile.portfolio_template || 'executive';

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('/contact', { user_id: profile.id, ...contactForm });
            setContactStatus({ type: 'success', message: 'Message sent!' });
            setContactForm({ sender_name: '', sender_email: '', subject: '', message: '' });
            setTimeout(() => setShowContactForm(false), 2000);
        } catch (error) {
            setContactStatus({ type: 'error', message: 'Failed to send. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const templateProps = {
        profile, projects, testimonials, services, certifications, awards, clientLogos, languages, featuredResume, businessCard,
        onContact: () => setShowContactForm(true),
        onShowQr: () => setShowQr(true),
    };

    // Render the appropriate template
    const renderTemplate = () => {
        switch (templateId) {
            case 'minimal': return <MinimalTemplate {...templateProps} />;
            case 'studio': return <StudioTemplate {...templateProps} />;
            case 'developer': return <DeveloperTemplate {...templateProps} />;
            case 'luxe': return <LuxeTemplate {...templateProps} />;
            case 'executive':
            default: return <ExecutiveTemplate {...templateProps} />;
        }
    };

    return (
        <>
            <Head title={`${profile.name} | Portfolio`} />

            {renderTemplate()}

            {/* QR Modal */}
            {showQr && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowQr(false)}>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Share Profile</h3>
                            <button onClick={() => setShowQr(false)} className="text-neutral-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-xl mb-4">
                            <img src={`/qr/generate?url=${encodeURIComponent(window.location.href)}&size=250`} alt="QR Code" className="w-full" />
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-all">
                            Copy Link
                        </button>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {showContactForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowContactForm(false)}>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Get in Touch</h3>
                            <button onClick={() => setShowContactForm(false)} className="text-neutral-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        {contactStatus.message && (
                            <div className={`mb-4 p-3 rounded-xl text-sm ${contactStatus.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                {contactStatus.message}
                            </div>
                        )}
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <input type="text" required placeholder="Your Name" value={contactForm.sender_name} onChange={e => setContactForm({...contactForm, sender_name: e.target.value})} className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                            <input type="email" required placeholder="Your Email" value={contactForm.sender_email} onChange={e => setContactForm({...contactForm, sender_email: e.target.value})} className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                            <textarea required rows={4} placeholder="Your Message" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
                            <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
