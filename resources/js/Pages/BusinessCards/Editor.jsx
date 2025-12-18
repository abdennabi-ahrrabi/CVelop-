import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useRef, useMemo } from 'react';
import { getContrastColor, hexToRgba } from '@/utils/colorUtils';

// Layout templates with visual characteristics
const layoutTemplates = [
    // Standard layouts
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean centered layout with subtle accents',
        category: 'standard',
        features: ['Centered content', 'Clean typography', 'Subtle borders'],
        layoutPreview: 'centered',
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Header banner with two-tone design',
        category: 'standard',
        features: ['Colored header', 'Two-tone design', 'Professional look'],
        layoutPreview: 'header-banner',
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Gradient sidebar with bold typography',
        category: 'standard',
        features: ['Side accent bar', 'Bold colors', 'Artistic feel'],
        layoutPreview: 'sidebar',
    },
    // Premium glassmorphism layouts
    {
        id: 'glass',
        name: 'Glass',
        description: 'Frosted glass with floating orbs',
        category: 'glass',
        features: ['Blur effects', 'Floating shapes', 'Translucent card'],
        layoutPreview: 'glass-orbs',
    },
    {
        id: 'aurora',
        name: 'Aurora',
        description: 'Full-bleed header with wave overlay',
        category: 'glass',
        features: ['Wave divider', 'Large header', 'Animated feel'],
        layoutPreview: 'wave-header',
    },
    {
        id: 'frost',
        name: 'Frost',
        description: 'Horizontal card with ice-inspired design',
        category: 'glass',
        features: ['Horizontal layout', 'Frost patterns', 'Cool aesthetic'],
        layoutPreview: 'horizontal',
    },
    {
        id: 'prism',
        name: 'Prism',
        description: 'Asymmetric layout with rainbow accents',
        category: 'glass',
        features: ['Rainbow borders', 'Asymmetric design', 'Futuristic'],
        layoutPreview: 'asymmetric',
    },
];

const fontOptions = [
    { id: 'inter', name: 'Inter', style: 'Modern, clean' },
    { id: 'poppins', name: 'Poppins', style: 'Geometric, friendly' },
    { id: 'playfair', name: 'Playfair Display', style: 'Elegant, serif' },
    { id: 'montserrat', name: 'Montserrat', style: 'Professional, versatile' },
    { id: 'roboto', name: 'Roboto', style: 'Neutral, readable' },
    { id: 'outfit', name: 'Outfit', style: 'Contemporary, geometric' },
];

const animationOptions = [
    { id: 'none', name: 'None', description: 'No entrance animation' },
    { id: 'fade', name: 'Fade In', description: 'Smooth opacity transition' },
    { id: 'slide', name: 'Slide Up', description: 'Slides from below' },
    { id: 'scale', name: 'Scale In', description: 'Grows from center' },
    { id: 'float', name: 'Float', description: 'Gentle floating motion' },
];

const hoverOptions = [
    { id: 'none', name: 'None', description: 'No hover effect' },
    { id: 'lift', name: 'Lift', description: 'Rises on hover' },
    { id: 'glow', name: 'Glow', description: 'Glowing shadow' },
    { id: 'scale', name: 'Scale', description: 'Slight enlargement' },
    { id: 'tilt', name: 'Tilt', description: '3D perspective tilt' },
];

// Quick color presets for easy selection
const colorPresets = [
    { primary: '#8b5cf6', secondary: '#6366f1', name: 'Violet' },
    { primary: '#3b82f6', secondary: '#0ea5e9', name: 'Blue' },
    { primary: '#10b981', secondary: '#14b8a6', name: 'Emerald' },
    { primary: '#f59e0b', secondary: '#f97316', name: 'Amber' },
    { primary: '#ef4444', secondary: '#f43f5e', name: 'Red' },
    { primary: '#ec4899', secondary: '#d946ef', name: 'Pink' },
    { primary: '#1f2937', secondary: '#374151', name: 'Dark' },
];

// Helper functions for animations
function getAnimationClass(animation) {
    const classes = {
        'none': '',
        'fade': 'animate-fadeIn',
        'slide': 'animate-slideUp',
        'scale': 'animate-scaleIn',
        'float': 'animate-float',
    };
    return classes[animation] || '';
}

function getHoverClass(hover) {
    const classes = {
        'none': '',
        'lift': 'hover-lift',
        'glow': 'hover-glow',
        'scale': 'hover-scale',
        'tilt': 'hover-tilt',
    };
    return classes[hover] || '';
}

function getShadowClass(intensity) {
    const classes = {
        'none': '',
        'subtle': 'shadow-lg',
        'medium': 'shadow-xl',
        'strong': 'shadow-2xl',
    };
    return classes[intensity] || 'shadow-xl';
}

// Live Preview Component - Professional Distinct Layouts
function LivePreview({ data, avatar, logo }) {
    const animationClass = getAnimationClass(data.animation_style);
    const hoverClass = getHoverClass(data.hover_effect);
    const shadowClass = getShadowClass(data.shadow_intensity);

    const fontClass = {
        'inter': 'font-inter',
        'poppins': 'font-poppins',
        'playfair': 'font-playfair',
        'montserrat': 'font-montserrat',
        'roboto': 'font-roboto',
        'outfit': 'font-outfit',
    }[data.font_family] || 'font-inter';

    const initials = data.display_name
        ? data.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : 'AB';

    const textColor = data.color_text || '#ffffff';
    const bgColor = data.color_background || '#0a0a0f';

    // GLASS TEMPLATE - Split horizontal layout with floating elements
    if (data.template === 'glass') {
        return (
            <div
                className={`relative overflow-hidden ${animationClass} ${fontClass}`}
                style={{
                    background: bgColor,
                    borderRadius: `${data.border_radius}px`,
                    minHeight: '280px',
                }}
            >
                {/* Animated background orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full blur-3xl animate-pulse-glow"
                        style={{ backgroundColor: data.color_primary + '30' }} />
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full blur-3xl animate-pulse-glow"
                        style={{ backgroundColor: data.color_secondary + '30', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-2xl"
                        style={{ backgroundColor: data.color_primary + '20' }} />
                </div>

                {/* Main glass card */}
                <div
                    className={`relative m-3 p-4 glass-card ${hoverClass}`}
                    style={{
                        '--glass-blur': `${data.glass_blur}px`,
                        '--glass-opacity': data.glass_opacity,
                        borderRadius: `${Math.max(8, data.border_radius - 8)}px`,
                    }}
                >
                    {/* Top section - Avatar and name side by side */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/20"
                                style={{ background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})` }}>
                                {avatar ? (
                                    <img src={avatar} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                                        {initials}
                                    </div>
                                )}
                            </div>
                            {/* Status dot */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black/50"
                                style={{ backgroundColor: data.color_primary }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-base truncate" style={{ color: textColor }}>
                                {data.display_name || 'Your Name'}
                            </h4>
                            {data.title && (
                                <p className="text-sm font-medium truncate" style={{ color: data.color_primary }}>
                                    {data.title}
                                </p>
                            )}
                            {data.company && (
                                <p className="text-xs truncate" style={{ color: textColor + '99' }}>{data.company}</p>
                            )}
                        </div>
                    </div>

                    {/* Contact grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {data.email && (
                            <div className="flex items-center gap-2 p-2 rounded-xl glass-card" style={{ '--glass-blur': '8px' }}>
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: data.color_primary + '30' }}>
                                    <svg className="w-3 h-3" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-[10px] truncate" style={{ color: textColor + 'cc' }}>Email</span>
                            </div>
                        )}
                        {data.phone && (
                            <div className="flex items-center gap-2 p-2 rounded-xl glass-card" style={{ '--glass-blur': '8px' }}>
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: data.color_secondary + '30' }}>
                                    <svg className="w-3 h-3" fill="none" stroke={data.color_secondary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-[10px] truncate" style={{ color: textColor + 'cc' }}>Call</span>
                            </div>
                        )}
                        {data.website && (
                            <div className="flex items-center gap-2 p-2 rounded-xl glass-card" style={{ '--glass-blur': '8px' }}>
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: data.color_primary + '30' }}>
                                    <svg className="w-3 h-3" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <span className="text-[10px] truncate" style={{ color: textColor + 'cc' }}>Website</span>
                            </div>
                        )}
                        {data.location && (
                            <div className="flex items-center gap-2 p-2 rounded-xl glass-card" style={{ '--glass-blur': '8px' }}>
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: data.color_secondary + '30' }}>
                                    <svg className="w-3 h-3" fill="none" stroke={data.color_secondary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                </div>
                                <span className="text-[10px] truncate" style={{ color: textColor + 'cc' }}>Location</span>
                            </div>
                        )}
                    </div>

                    {/* CTA Button */}
                    <button
                        className="w-full py-2.5 rounded-xl text-white text-xs font-semibold transition-all hover:opacity-90"
                        style={{
                            background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})`,
                            borderRadius: `${Math.max(8, data.border_radius / 2)}px`,
                        }}
                    >
                        Save Contact
                    </button>
                </div>
            </div>
        );
    }

    // AURORA TEMPLATE - Full bleed header with stacked card layout
    if (data.template === 'aurora') {
        return (
            <div
                className={`relative overflow-hidden ${animationClass} ${fontClass}`}
                style={{ background: bgColor, borderRadius: `${data.border_radius}px` }}
            >
                {/* Aurora animated background */}
                <div
                    className="absolute inset-0 animate-aurora opacity-40"
                    style={{
                        background: `linear-gradient(-45deg, ${data.color_primary}, ${data.color_secondary}, ${data.color_primary}80, ${data.color_secondary}80)`,
                        backgroundSize: '400% 400%',
                    }}
                />

                {/* Header section with large avatar */}
                <div className="relative pt-8 pb-12 px-4">
                    <div className="relative w-20 h-20 mx-auto">
                        <div
                            className="absolute inset-0 rounded-full animate-aurora"
                            style={{
                                background: `linear-gradient(-45deg, ${data.color_primary}, ${data.color_secondary})`,
                                backgroundSize: '400% 400%',
                                padding: '3px',
                            }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: bgColor }}>
                                {avatar ? (
                                    <img src={avatar} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center text-xl font-bold animate-aurora"
                                        style={{
                                            background: `linear-gradient(-45deg, ${data.color_primary}, ${data.color_secondary})`,
                                            backgroundSize: '400% 400%',
                                            color: '#fff',
                                        }}
                                    >
                                        {initials}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating info card */}
                <div
                    className={`relative -mt-6 mx-3 mb-3 p-4 glass-card-dark ${hoverClass}`}
                    style={{
                        '--glass-blur': `${data.glass_blur}px`,
                        borderRadius: `${Math.max(12, data.border_radius - 4)}px`,
                    }}
                >
                    <div className="text-center mb-4">
                        <h4
                            className="font-bold text-lg bg-clip-text text-transparent animate-aurora"
                            style={{
                                backgroundImage: `linear-gradient(-45deg, ${data.color_primary}, ${data.color_secondary}, ${data.color_primary})`,
                                backgroundSize: '400% 400%',
                            }}
                        >
                            {data.display_name || 'Your Name'}
                        </h4>
                        {data.title && (
                            <p className="text-sm mt-1" style={{ color: textColor + 'cc' }}>{data.title}</p>
                        )}
                        {data.company && (
                            <p className="text-xs mt-0.5" style={{ color: textColor + '80' }}>{data.company}</p>
                        )}
                    </div>

                    {/* Horizontal contact pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {data.email && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] glass-card"
                                style={{ '--glass-blur': '6px', color: textColor + 'cc' }}>
                                <svg className="w-2.5 h-2.5" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </span>
                        )}
                        {data.phone && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] glass-card"
                                style={{ '--glass-blur': '6px', color: textColor + 'cc' }}>
                                <svg className="w-2.5 h-2.5" fill="none" stroke={data.color_secondary} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call
                            </span>
                        )}
                    </div>

                    <button
                        className="w-full py-2.5 rounded-xl text-white text-xs font-bold animate-aurora"
                        style={{
                            background: `linear-gradient(-45deg, ${data.color_primary}, ${data.color_secondary})`,
                            backgroundSize: '400% 400%',
                        }}
                    >
                        Connect Now
                    </button>
                </div>
            </div>
        );
    }

    // FROST TEMPLATE - Clean horizontal business card style
    if (data.template === 'frost') {
        const isLight = data.color_background === '#f8fcfd' || data.color_background === '#ffffff' || !data.color_background || data.color_background?.startsWith('#f');
        const frostTextColor = isLight ? '#1e293b' : textColor;

        return (
            <div
                className={`relative overflow-hidden ${animationClass} ${fontClass}`}
                style={{
                    background: `linear-gradient(135deg, ${data.color_background || '#f8fcfd'}, ${data.color_primary}15)`,
                    borderRadius: `${data.border_radius}px`,
                }}
            >
                {/* Frost texture overlay */}
                <div className="absolute inset-0 frost-effect opacity-80" />

                {/* Decorative corner accent */}
                <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-30"
                    style={{ backgroundColor: data.color_primary }}
                />

                <div className={`relative p-5 ${hoverClass}`}>
                    {/* Horizontal layout */}
                    <div className="flex gap-4">
                        {/* Left - Avatar */}
                        <div className="flex-shrink-0">
                            <div
                                className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})`,
                                }}
                            >
                                {avatar ? (
                                    <img src={avatar} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                                        {initials}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right - Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-base" style={{ color: frostTextColor }}>
                                {data.display_name || 'Your Name'}
                            </h4>
                            {data.title && (
                                <p className="text-sm font-medium" style={{ color: data.color_primary }}>
                                    {data.title}
                                </p>
                            )}
                            {data.company && (
                                <p className="text-xs mt-1" style={{ color: frostTextColor + '99' }}>
                                    {data.company}
                                </p>
                            )}

                            {/* Contact row */}
                            <div className="flex gap-2 mt-3">
                                {data.email && (
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: data.color_primary + '20' }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                {data.phone && (
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: data.color_secondary + '20' }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke={data.color_secondary} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <button
                        className="w-full mt-4 py-2.5 rounded-xl text-white text-xs font-semibold shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})`,
                        }}
                    >
                        Save Contact
                    </button>
                </div>
            </div>
        );
    }

    // PRISM TEMPLATE - Asymmetric futuristic layout with rainbow borders
    if (data.template === 'prism') {
        return (
            <div
                className={`relative overflow-hidden ${animationClass} ${fontClass}`}
                style={{ background: '#030303', borderRadius: `${data.border_radius}px` }}
            >
                {/* Rainbow glow background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 right-0 h-1 rainbow-border" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 rainbow-border" />
                </div>

                <div className={`relative p-4 ${hoverClass}`}>
                    {/* Asymmetric header */}
                    <div className="flex items-start gap-3 mb-4">
                        {/* Rainbow bordered avatar */}
                        <div className="relative">
                            <div className="w-16 h-16 rainbow-border" style={{ borderRadius: `${data.border_radius / 2}px` }}>
                                <div
                                    className="w-full h-full overflow-hidden"
                                    style={{ background: '#0a0a0a', borderRadius: `${data.border_radius / 2 - 2}px` }}
                                >
                                    {avatar ? (
                                        <img src={avatar} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center text-lg font-bold"
                                            style={{
                                                background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})`,
                                                color: '#fff',
                                            }}
                                        >
                                            {initials}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Name with gradient text */}
                        <div className="flex-1 pt-1">
                            <h4 className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400">
                                {data.display_name || 'Your Name'}
                            </h4>
                            {data.title && (
                                <p className="text-xs mt-1" style={{ color: data.color_primary }}>
                                    {data.title}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Company badge */}
                    {data.company && (
                        <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] rainbow-border"
                                style={{ color: textColor + 'cc' }}>
                                <span className="bg-black px-2 py-0.5 rounded-full">{data.company}</span>
                            </span>
                        </div>
                    )}

                    {/* Vertical contact list with rainbow accents */}
                    <div className="space-y-2 mb-4">
                        {data.email && (
                            <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-violet-400" />
                                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs truncate" style={{ color: textColor + 'aa' }}>{data.email}</span>
                            </div>
                        )}
                        {data.phone && (
                            <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-400 to-pink-400" />
                                <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-xs" style={{ color: textColor + 'aa' }}>{data.phone}</span>
                            </div>
                        )}
                    </div>

                    {/* Rainbow CTA */}
                    <div className="rainbow-border" style={{ borderRadius: `${data.border_radius / 2}px` }}>
                        <button className="w-full py-2.5 text-xs font-bold"
                            style={{ background: '#0a0a0a', color: textColor, borderRadius: `${data.border_radius / 2 - 2}px` }}>
                            Add to Contacts
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // MINIMAL TEMPLATE - Ultra clean, typography focused
    if (data.template === 'minimal') {
        const isLightBg = !bgColor || bgColor === '#ffffff' || bgColor.startsWith('#f');
        const minimalText = isLightBg ? '#1e293b' : textColor;
        const minimalSubtext = isLightBg ? '#64748b' : textColor + '80';

        return (
            <div
                className={`${animationClass} ${hoverClass} ${fontClass} ${shadowClass}`}
                style={{
                    background: bgColor || '#ffffff',
                    borderRadius: `${data.border_radius}px`,
                    border: isLightBg ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <div className="p-5">
                    {/* Minimal header with small accent line */}
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-1 h-12 rounded-full"
                            style={{ background: `linear-gradient(180deg, ${data.color_primary}, ${data.color_secondary})` }}
                        />
                        <div>
                            <h4 className="font-bold text-lg" style={{ color: minimalText }}>
                                {data.display_name || 'Your Name'}
                            </h4>
                            {data.title && (
                                <p className="text-sm" style={{ color: data.color_primary }}>{data.title}</p>
                            )}
                        </div>
                    </div>

                    {data.company && (
                        <p className="text-xs mb-4 pl-5" style={{ color: minimalSubtext }}>{data.company}</p>
                    )}

                    {/* Clean divider */}
                    <div className="h-px mb-4" style={{ backgroundColor: isLightBg ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }} />

                    {/* Contact info - simple list */}
                    <div className="space-y-2 mb-4">
                        {data.email && (
                            <div className="flex items-center gap-3">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs truncate" style={{ color: minimalSubtext }}>{data.email}</span>
                            </div>
                        )}
                        {data.phone && (
                            <div className="flex items-center gap-3">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-xs" style={{ color: minimalSubtext }}>{data.phone}</span>
                            </div>
                        )}
                    </div>

                    {/* Minimal button */}
                    <button
                        className="w-full py-2.5 text-xs font-medium transition-colors"
                        style={{
                            backgroundColor: isLightBg ? data.color_primary + '10' : data.color_primary + '20',
                            color: data.color_primary,
                            borderRadius: `${data.border_radius / 2}px`,
                        }}
                    >
                        Save Contact
                    </button>
                </div>
            </div>
        );
    }

    // MODERN/DEFAULT TEMPLATE - Professional with header banner
    return (
        <div
            className={`overflow-hidden ${animationClass} ${shadowClass} ${fontClass}`}
            style={{ background: bgColor, borderRadius: `${data.border_radius}px` }}
        >
            {/* Gradient header with pattern */}
            <div
                className="relative h-20"
                style={{ background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})` }}
            >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                    }}
                />
            </div>

            {/* Content area */}
            <div className={`relative px-4 pb-4 ${hoverClass}`}>
                {/* Overlapping avatar */}
                <div className="flex justify-center -mt-10 mb-3">
                    <div
                        className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl ring-4"
                        style={{
                            background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})`,
                            ringColor: bgColor,
                        }}
                    >
                        {avatar ? (
                            <img src={avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                                {initials}
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                    <h4 className="font-bold text-base" style={{ color: textColor }}>
                        {data.display_name || 'Your Name'}
                    </h4>
                    {data.title && (
                        <p className="text-sm font-medium" style={{ color: data.color_primary }}>{data.title}</p>
                    )}
                    {data.company && (
                        <p className="text-xs mt-1" style={{ color: textColor + '80' }}>{data.company}</p>
                    )}
                    {data.tagline && (
                        <p className="text-xs mt-2 line-clamp-2" style={{ color: textColor + '60' }}>{data.tagline}</p>
                    )}
                </div>

                {/* Contact buttons row */}
                <div className="flex justify-center gap-3 mb-4">
                    {data.email && (
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: data.color_primary + '20' }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    {data.phone && (
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: data.color_secondary + '20' }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke={data.color_secondary} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                    )}
                    {data.website && (
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: data.color_primary + '15' }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke={data.color_primary} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <button
                    className="w-full py-3 rounded-xl text-white text-sm font-semibold"
                    style={{
                        background: `linear-gradient(135deg, ${data.color_primary}, ${data.color_secondary})`,
                        borderRadius: `${data.border_radius / 2}px`,
                    }}
                >
                    Save Contact
                </button>
            </div>
        </div>
    );
}

export default function Editor({ card, defaults, templates }) {
    const isEditing = !!card;
    const avatarInput = useRef(null);
    const logoInput = useRef(null);
    const [activeTab, setActiveTab] = useState('design');
    const [layoutCategory, setLayoutCategory] = useState('all');
    const [showQr, setShowQr] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        name: card?.name || '',
        display_name: card?.display_name || defaults?.display_name || '',
        title: card?.title || '',
        company: card?.company || '',
        email: card?.email || defaults?.email || '',
        phone: card?.phone || defaults?.phone || '',
        website: card?.website || defaults?.website || '',
        location: card?.location || defaults?.location || '',
        tagline: card?.tagline || '',
        linkedin_url: card?.linkedin_url || defaults?.linkedin_url || '',
        twitter_url: card?.twitter_url || defaults?.twitter_url || '',
        github_url: card?.github_url || defaults?.github_url || '',
        instagram_url: card?.instagram_url || defaults?.instagram_url || '',
        custom_links: card?.custom_links || [],
        template: card?.template || 'modern',
        color_primary: card?.color_primary || '#8b5cf6',
        color_secondary: card?.color_secondary || '#6366f1',
        color_background: card?.color_background || '#0a0a0f',
        color_text: card?.color_text || '#ffffff',
        color_accent: card?.color_accent || '#ec4899',
        is_primary: card?.is_primary || false,
        is_active: card?.is_active !== undefined ? card.is_active : true,
        // Glassmorphism settings
        glass_blur: card?.glass_blur || '12',
        glass_opacity: card?.glass_opacity || '0.15',
        glass_border: card?.glass_border ?? true,
        // Typography
        font_family: card?.font_family || 'inter',
        font_weight_heading: card?.font_weight_heading || '700',
        font_weight_body: card?.font_weight_body || '400',
        // Border & Shadow
        border_radius: card?.border_radius || '24',
        border_width: card?.border_width || '1',
        border_opacity: card?.border_opacity || '0.2',
        shadow_intensity: card?.shadow_intensity || 'medium',
        // Animation settings
        animation_style: card?.animation_style || 'none',
        hover_effect: card?.hover_effect || 'lift',
        // Smart features
        auto_contrast: card?.auto_contrast ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('business-cards.update', card.id));
        } else {
            post(route('business-cards.store'));
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingAvatar(true);
        const formData = new FormData();
        formData.append('avatar', file);

        router.post(route('business-cards.avatar', card.id), formData, {
            onFinish: () => setUploadingAvatar(false),
            preserveScroll: true,
        });
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingLogo(true);
        const formData = new FormData();
        formData.append('logo', file);

        router.post(route('business-cards.logo', card.id), formData, {
            onFinish: () => setUploadingLogo(false),
            preserveScroll: true,
        });
    };

    const addCustomLink = () => {
        setData('custom_links', [...data.custom_links, { title: '', url: '' }]);
    };

    const updateCustomLink = (index, field, value) => {
        const links = [...data.custom_links];
        links[index][field] = value;
        setData('custom_links', links);
    };

    const removeCustomLink = (index) => {
        setData('custom_links', data.custom_links.filter((_, i) => i !== index));
    };

    const selectLayout = (templateId) => {
        setData('template', templateId);
    };

    const applyColorPreset = (preset) => {
        setData({
            ...data,
            color_primary: preset.primary,
            color_secondary: preset.secondary,
        });
    };

    const tabs = [
        { id: 'design', label: 'Design', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
        { id: 'info', label: 'Basic Info', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: 'social', label: 'Social Links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
        { id: 'effects', label: 'Effects', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
        { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? `Edit ${card.name}` : 'Create Business Card'} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('business-cards.index')}
                                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    {isEditing ? 'Edit Business Card' : 'Create Business Card'}
                                </h1>
                                <p className="text-gray-400">{isEditing ? card.name : 'Fill in your details'}</p>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowQr(true)}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    QR Code
                                </button>
                                <div className="relative group">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl transition-all flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        Print
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-56 py-2 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                        <a
                                            href={route('business-cards.pdf', card.id)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium">Single Card PDF</div>
                                                <div className="text-xs text-gray-500">3.5" x 2" standard size</div>
                                            </div>
                                        </a>
                                        <a
                                            href={route('business-cards.print-sheet', card.id)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium">Print Sheet (10 cards)</div>
                                                <div className="text-xs text-gray-500">Letter size, cut guides</div>
                                            </div>
                                        </a>
                                        <div className="border-t border-white/10 my-2"></div>
                                        <a
                                            href={route('business-cards.qr.download', card.id)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium">QR Code (PNG)</div>
                                                <div className="text-xs text-gray-500">High resolution 500x500</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <a
                                    href={card.public_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Preview
                                </a>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Tabs */}
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                                activeTab === tab.id
                                                    ? 'bg-violet-600 text-white'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                            </svg>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Basic Info Tab */}
                                {activeTab === 'info' && (
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Card Name *</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g., My Professional Card"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                                            <p className="text-gray-500 text-xs mt-1">Internal name for your reference</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Display Name *</label>
                                            <input
                                                type="text"
                                                value={data.display_name}
                                                onChange={(e) => setData('display_name', e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                            {errors.display_name && <p className="text-red-400 text-sm mt-1">{errors.display_name}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                                                <input
                                                    type="text"
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                    placeholder="Software Engineer"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                                <input
                                                    type="text"
                                                    value={data.company}
                                                    onChange={(e) => setData('company', e.target.value)}
                                                    placeholder="Acme Inc."
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                                            <textarea
                                                value={data.tagline}
                                                onChange={(e) => setData('tagline', e.target.value)}
                                                placeholder="A short description about yourself..."
                                                rows={3}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
                                            />
                                        </div>

                                        {isEditing && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Avatar</label>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center overflow-hidden">
                                                            {card.avatar ? (
                                                                <img src={card.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="text-white font-bold">
                                                                    {data.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <input type="file" ref={avatarInput} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
                                                        <button
                                                            type="button"
                                                            onClick={() => avatarInput.current?.click()}
                                                            disabled={uploadingAvatar}
                                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-all disabled:opacity-50"
                                                        >
                                                            {uploadingAvatar ? 'Uploading...' : 'Upload'}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Logo</label>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                                                            {card.logo ? (
                                                                <img src={card.logo} alt="Logo" className="w-full h-full object-contain" />
                                                            ) : (
                                                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <input type="file" ref={logoInput} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                                                        <button
                                                            type="button"
                                                            onClick={() => logoInput.current?.click()}
                                                            disabled={uploadingLogo}
                                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-all disabled:opacity-50"
                                                        >
                                                            {uploadingLogo ? 'Uploading...' : 'Upload'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Contact Tab */}
                                {activeTab === 'contact' && (
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+1 (555) 123-4567"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                                            <input
                                                type="url"
                                                value={data.website}
                                                onChange={(e) => setData('website', e.target.value)}
                                                placeholder="https://example.com"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                                            <input
                                                type="text"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                placeholder="San Francisco, CA"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Social Tab */}
                                {activeTab === 'social' && (
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                                            <input
                                                type="url"
                                                value={data.linkedin_url}
                                                onChange={(e) => setData('linkedin_url', e.target.value)}
                                                placeholder="https://linkedin.com/in/username"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Twitter / X</label>
                                            <input
                                                type="url"
                                                value={data.twitter_url}
                                                onChange={(e) => setData('twitter_url', e.target.value)}
                                                placeholder="https://twitter.com/username"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                                            <input
                                                type="url"
                                                value={data.github_url}
                                                onChange={(e) => setData('github_url', e.target.value)}
                                                placeholder="https://github.com/username"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                                            <input
                                                type="url"
                                                value={data.instagram_url}
                                                onChange={(e) => setData('instagram_url', e.target.value)}
                                                placeholder="https://instagram.com/username"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <label className="block text-sm font-medium text-gray-300">Custom Links</label>
                                                <button
                                                    type="button"
                                                    onClick={addCustomLink}
                                                    className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Add Link
                                                </button>
                                            </div>
                                            {data.custom_links.map((link, index) => (
                                                <div key={index} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={link.title}
                                                        onChange={(e) => updateCustomLink(index, 'title', e.target.value)}
                                                        placeholder="Title"
                                                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm"
                                                    />
                                                    <input
                                                        type="url"
                                                        value={link.url}
                                                        onChange={(e) => updateCustomLink(index, 'url', e.target.value)}
                                                        placeholder="URL"
                                                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCustomLink(index)}
                                                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Design Tab */}
                                {activeTab === 'design' && (
                                    <div className="space-y-6">
                                        {/* Layout Selection */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <label className="text-sm font-medium text-gray-300">Layout</label>
                                                <div className="flex gap-1">
                                                    {[
                                                        { id: 'all', label: 'All' },
                                                        { id: 'standard', label: 'Standard' },
                                                        { id: 'glass', label: 'Glass' },
                                                    ].map((cat) => (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => setLayoutCategory(cat.id)}
                                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                                                layoutCategory === cat.id
                                                                    ? 'bg-violet-600 text-white'
                                                                    : 'bg-white/5 text-gray-400 hover:text-white'
                                                            }`}
                                                        >
                                                            {cat.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                {layoutTemplates
                                                    .filter(layout => layoutCategory === 'all' || layout.category === layoutCategory)
                                                    .map((layout) => (
                                                    <button
                                                        key={layout.id}
                                                        type="button"
                                                        onClick={() => setData('template', layout.id)}
                                                        className={`group relative rounded-xl overflow-hidden transition-all ${
                                                            data.template === layout.id
                                                                ? 'ring-2 ring-violet-500'
                                                                : 'ring-1 ring-white/10 hover:ring-white/30'
                                                        }`}
                                                    >
                                                        {/* Mini preview */}
                                                        <div className="h-20 bg-gradient-to-br from-gray-800 to-gray-900 p-2">
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                {layout.layoutPreview === 'centered' && (
                                                                    <div className="w-full h-full rounded border border-white/20 bg-white/5 flex flex-col items-center justify-center gap-1">
                                                                        <div className="w-4 h-4 rounded-full bg-violet-500/40" />
                                                                        <div className="w-8 h-1 rounded bg-white/40" />
                                                                    </div>
                                                                )}
                                                                {layout.layoutPreview === 'header-banner' && (
                                                                    <div className="w-full h-full rounded border border-white/20 bg-white/5 overflow-hidden flex flex-col">
                                                                        <div className="h-6 bg-violet-500/40" />
                                                                        <div className="flex-1 p-1">
                                                                            <div className="w-6 h-1 rounded bg-white/30" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {layout.layoutPreview === 'sidebar' && (
                                                                    <div className="w-full h-full rounded border border-white/20 bg-white/5 overflow-hidden flex">
                                                                        <div className="w-1.5 bg-gradient-to-b from-violet-500/60 to-pink-500/60" />
                                                                        <div className="flex-1 p-1.5 flex flex-col justify-center gap-0.5">
                                                                            <div className="w-8 h-1 rounded bg-white/40" />
                                                                            <div className="w-5 h-0.5 rounded bg-white/20" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {layout.layoutPreview === 'glass-orbs' && (
                                                                    <div className="w-full h-full rounded border border-white/20 bg-slate-800 overflow-hidden relative">
                                                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-violet-500/30 blur-sm" />
                                                                        <div className="absolute inset-1 rounded bg-white/5 p-1">
                                                                            <div className="w-6 h-1 rounded bg-white/40" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {layout.layoutPreview === 'wave-header' && (
                                                                    <div className="w-full h-full rounded border border-white/20 bg-slate-800 overflow-hidden relative">
                                                                        <div className="absolute top-0 inset-x-0 h-6 bg-violet-600/50" />
                                                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/20 border border-white/40" />
                                                                    </div>
                                                                )}
                                                                {layout.layoutPreview === 'horizontal' && (
                                                                    <div className="w-full h-full rounded border border-white/20 bg-gradient-to-r from-cyan-900/50 to-slate-900 flex items-center p-1.5 gap-1">
                                                                        <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
                                                                            <div className="w-2 h-2 rounded-full bg-white/30" />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <div className="w-6 h-1 rounded bg-white/40" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {layout.layoutPreview === 'asymmetric' && (
                                                                    <div className="w-full h-full rounded bg-slate-900 overflow-hidden relative border border-violet-500/30">
                                                                        <div className="absolute top-1 left-1 w-1/2 flex flex-col gap-0.5">
                                                                            <div className="w-6 h-1 rounded bg-white/40" />
                                                                            <div className="w-4 h-0.5 rounded bg-violet-400/40" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Label */}
                                                        <div className="px-2 py-1.5 bg-[#0a0a0f] text-center">
                                                            <span className="text-xs font-medium text-white">{layout.name}</span>
                                                        </div>
                                                        {/* Selected indicator */}
                                                        {data.template === layout.id && (
                                                            <div className="absolute top-1 right-1 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center">
                                                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Color Selection */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <label className="block text-sm font-medium text-gray-300 mb-4">Colors</label>

                                            <div className="mb-4">
                                                <p className="text-xs text-gray-500 mb-2">Presets</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {colorPresets.map((preset) => (
                                                        <button
                                                            key={preset.name}
                                                            type="button"
                                                            onClick={() => applyColorPreset(preset)}
                                                            className="w-10 h-10 rounded-lg overflow-hidden border-2 border-transparent hover:border-white/50 transition-all"
                                                            style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }}
                                                            title={preset.name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-2">Primary</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="color"
                                                            value={data.color_primary}
                                                            onChange={(e) => setData('color_primary', e.target.value)}
                                                            className="w-10 h-10 rounded-lg cursor-pointer"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={data.color_primary}
                                                            onChange={(e) => setData('color_primary', e.target.value)}
                                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-2">Secondary</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="color"
                                                            value={data.color_secondary}
                                                            onChange={(e) => setData('color_secondary', e.target.value)}
                                                            className="w-10 h-10 rounded-lg cursor-pointer"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={data.color_secondary}
                                                            onChange={(e) => setData('color_secondary', e.target.value)}
                                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Effects Tab */}
                                {activeTab === 'effects' && (
                                    <div className="space-y-6">
                                        {/* Glassmorphism Controls */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                                                Glassmorphism
                                            </h4>

                                            <div className="mb-4">
                                                <label className="block text-sm text-gray-400 mb-2">
                                                    Blur Intensity: {data.glass_blur}px
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="24"
                                                    value={data.glass_blur}
                                                    onChange={(e) => setData('glass_blur', e.target.value)}
                                                    className="w-full accent-violet-500"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm text-gray-400 mb-2">
                                                    Background Opacity: {Math.round(parseFloat(data.glass_opacity) * 100)}%
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={parseFloat(data.glass_opacity) * 100}
                                                    onChange={(e) => setData('glass_opacity', (parseInt(e.target.value) / 100).toString())}
                                                    className="w-full accent-violet-500"
                                                />
                                            </div>

                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={data.glass_border}
                                                    onChange={(e) => setData('glass_border', e.target.checked)}
                                                    className="w-5 h-5 rounded bg-white/10 border-white/20 text-violet-600 focus:ring-violet-500"
                                                />
                                                <span className="text-gray-300">Show glass border</span>
                                            </label>
                                        </div>

                                        {/* Typography Controls */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                                Typography
                                            </h4>

                                            <label className="block text-sm text-gray-400 mb-3">Font Family</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {fontOptions.map((font) => (
                                                    <button
                                                        key={font.id}
                                                        type="button"
                                                        onClick={() => setData('font_family', font.id)}
                                                        className={`p-3 rounded-xl text-left transition-all ${
                                                            data.font_family === font.id
                                                                ? 'bg-violet-600 border-violet-500'
                                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                        } border`}
                                                    >
                                                        <p className="font-semibold text-white">{font.name}</p>
                                                        <p className="text-xs text-gray-400">{font.style}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Border & Shadow Controls */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                                Border & Shadow
                                            </h4>

                                            <div className="mb-4">
                                                <label className="block text-sm text-gray-400 mb-2">
                                                    Border Radius: {data.border_radius}px
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="48"
                                                    value={data.border_radius}
                                                    onChange={(e) => setData('border_radius', e.target.value)}
                                                    className="w-full accent-violet-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Shadow Intensity</label>
                                                <div className="flex gap-2">
                                                    {['none', 'subtle', 'medium', 'strong'].map((intensity) => (
                                                        <button
                                                            key={intensity}
                                                            type="button"
                                                            onClick={() => setData('shadow_intensity', intensity)}
                                                            className={`flex-1 py-2 px-3 rounded-lg text-sm capitalize transition-all ${
                                                                data.shadow_intensity === intensity
                                                                    ? 'bg-violet-600 text-white'
                                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                            }`}
                                                        >
                                                            {intensity}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Animation Controls */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                                Animations
                                            </h4>

                                            <div className="mb-4">
                                                <label className="block text-sm text-gray-400 mb-2">Entrance Animation</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {animationOptions.map((anim) => (
                                                        <button
                                                            key={anim.id}
                                                            type="button"
                                                            onClick={() => setData('animation_style', anim.id)}
                                                            className={`p-2 rounded-lg text-sm transition-all ${
                                                                data.animation_style === anim.id
                                                                    ? 'bg-violet-600 text-white'
                                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                            }`}
                                                        >
                                                            {anim.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Hover Effect</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {hoverOptions.map((hover) => (
                                                        <button
                                                            key={hover.id}
                                                            type="button"
                                                            onClick={() => setData('hover_effect', hover.id)}
                                                            className={`p-2 rounded-lg text-sm transition-all ${
                                                                data.hover_effect === hover.id
                                                                    ? 'bg-violet-600 text-white'
                                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                            }`}
                                                        >
                                                            {hover.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Auto-Contrast Toggle */}
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                            <label className="flex items-center justify-between cursor-pointer">
                                                <div>
                                                    <p className="font-medium text-white flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                        Auto-Contrast
                                                    </p>
                                                    <p className="text-sm text-gray-400 mt-1">Automatically adjust text colors for readability</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={data.auto_contrast}
                                                    onChange={(e) => setData('auto_contrast', e.target.checked)}
                                                    className="w-5 h-5 rounded bg-white/10 border-white/20 text-violet-600 focus:ring-violet-500"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Settings Tab */}
                                {activeTab === 'settings' && (
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
                                        <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                                            <input
                                                type="checkbox"
                                                checked={data.is_primary}
                                                onChange={(e) => setData('is_primary', e.target.checked)}
                                                className="w-5 h-5 rounded bg-white/10 border-white/20 text-violet-600 focus:ring-violet-500"
                                            />
                                            <div>
                                                <p className="font-medium text-white">Set as Primary Card</p>
                                                <p className="text-sm text-gray-400">This card will be featured on your public profile</p>
                                            </div>
                                        </label>

                                        <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="w-5 h-5 rounded bg-white/10 border-white/20 text-violet-600 focus:ring-violet-500"
                                            />
                                            <div>
                                                <p className="font-medium text-white">Active</p>
                                                <p className="text-sm text-gray-400">Inactive cards won't be accessible via public link</p>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Preview Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-400">Live Preview</h3>
                                        <span className="text-xs text-gray-500 px-2 py-1 bg-white/5 rounded-lg">
                                            {layoutTemplates.find(t => t.id === data.template)?.name || 'Minimal'}
                                        </span>
                                    </div>
                                    <LivePreview data={data} avatar={card?.avatar} logo={card?.logo} />

                                    {/* Save Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-6 w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {isEditing ? 'Save Changes' : 'Create Card'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* QR Code Modal */}
            {showQr && card && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowQr(false)}>
                    <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">QR Code</h3>
                            <button onClick={() => setShowQr(false)} className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-xl mb-4">
                            <img
                                src={card.qr_url}
                                alt="QR Code"
                                className="w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigator.clipboard.writeText(card.public_url)}
                                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all"
                            >
                                Copy Link
                            </button>
                            <a
                                href={route('business-cards.qr.download', card.id)}
                                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl transition-all text-center"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
