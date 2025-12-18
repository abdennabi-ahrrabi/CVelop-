import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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
};

const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    bold: BoldTemplate,
    creative: CreativeTemplate,
    corporate: CorporateTemplate,
    gradient: GradientTemplate,
    glass: GlassTemplate,
    aurora: AuroraTemplate,
    frost: FrostTemplate,
    prism: PrismTemplate,
};

function ModernTemplate({ card, onContact, onSaveContact }) {
    const design = card.design || {};
    const animationClass = getAnimationClass(design.animation_style);
    const hoverClass = getHoverClass(design.hover_effect);
    const shadowClass = getShadowClass(design.shadow_intensity);
    const fontClass = design.font_family ? `font-${design.font_family}` : 'font-inter';
    const textColor = card.colors.text || '#ffffff';
    const bgColor = card.colors.background || '#0a0a0f';
    const initials = card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className={`min-h-screen flex flex-col ${fontClass}`}
            style={{ backgroundColor: bgColor }}>

            {/* Full-width gradient header banner */}
            <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }} />
                {card.background_image && (
                    <img src={card.background_image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                )}
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16"
                    style={{ background: `linear-gradient(to top, ${bgColor}, transparent)` }} />
            </div>

            {/* Content area */}
            <div className="flex-1 flex items-start justify-center px-4 -mt-20 pb-8">
                <div className={`w-full max-w-md ${animationClass}`}>
                    {/* Card */}
                    <div className={`rounded-3xl overflow-hidden ${shadowClass} ${hoverClass}`}
                        style={{
                            backgroundColor: '#12121a',
                            borderRadius: `${design.border_radius || 28}px`,
                        }}>

                        {/* Avatar overlapping header */}
                        <div className="flex justify-center -mt-16 mb-4 pt-4">
                            <div className="relative">
                                <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 shadow-2xl"
                                    style={{
                                        ringColor: '#12121a',
                                        background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})`,
                                    }}>
                                    {card.avatar ? (
                                        <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                                            {initials}
                                        </div>
                                    )}
                                </div>
                                {card.logo && (
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-white shadow-lg flex items-center justify-center p-1">
                                        <img src={card.logo} alt="Logo" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-6 text-center">
                            <h1 className="text-2xl font-bold mb-1" style={{ color: textColor }}>{card.display_name}</h1>
                            {card.title && (
                                <p className="text-lg font-medium" style={{ color: card.colors.primary }}>{card.title}</p>
                            )}
                            {card.company && (
                                <p className="text-gray-400">{card.company}</p>
                            )}
                            {card.tagline && (
                                <p className="mt-3 text-gray-500 text-sm italic">"{card.tagline}"</p>
                            )}

                            {/* Quick action buttons row */}
                            <div className="flex justify-center gap-2 mt-6">
                                {card.email && (
                                    <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)}
                                        className="flex-1 max-w-[100px] py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-center">
                                        <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">Email</span>
                                    </a>
                                )}
                                {card.phone && (
                                    <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)}
                                        className="flex-1 max-w-[100px] py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-center">
                                        <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke={card.colors.secondary} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">Call</span>
                                    </a>
                                )}
                                {card.website && (
                                    <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)}
                                        className="flex-1 max-w-[100px] py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-center">
                                        <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        <span className="text-xs text-gray-400">Web</span>
                                    </a>
                                )}
                                {card.location && (
                                    <div className="flex-1 max-w-[100px] py-3 px-2 rounded-xl bg-white/5 text-center">
                                        <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke={card.colors.secondary} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">Map</span>
                                    </div>
                                )}
                            </div>

                            {/* Social Links */}
                            {Object.keys(card.social_links).length > 0 && (
                                <div className="flex justify-center gap-2 mt-6">
                                    {Object.entries(card.social_links).map(([platform, url]) => (
                                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                            onClick={() => onContact(platform, url)}
                                            className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-lg"
                                            style={{ backgroundColor: card.colors.primary }}>
                                            {socialIcons[platform]}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Custom Links */}
                            {card.custom_links && card.custom_links.length > 0 && (
                                <div className="mt-6 space-y-2">
                                    {card.custom_links.map((link, index) => (
                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                                            onClick={() => onContact('custom', link.url)}
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                                            <span className="font-medium">{link.title}</span>
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Save Contact Button */}
                            <button onClick={onSaveContact}
                                className="mt-6 w-full py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})`,
                                    borderRadius: `${(design.border_radius || 28) / 2}px`,
                                }}>
                                Save Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MinimalTemplate({ card, onContact, onSaveContact }) {
    const design = card.design || {};
    const animationClass = getAnimationClass(design.animation_style);
    const hoverClass = getHoverClass(design.hover_effect);
    const fontClass = design.font_family ? `font-${design.font_family}` : 'font-inter';
    const initials = card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    // Use actual colors from card settings
    const bgColor = card.colors.background || '#fafafa';
    const textColor = card.colors.text || '#18181b';
    const primaryColor = card.colors.primary || '#8b5cf6';
    const secondaryColor = card.colors.secondary || '#a1a1aa';

    // Detect if dark theme based on background luminance
    const isDark = (() => {
        const hex = bgColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    })();

    // Derive card and UI colors based on theme
    const cardBg = isDark ? (textColor + '08') : '#ffffff';
    const cardBorder = isDark ? (textColor + '15') : 'transparent';
    const subtleText = textColor + '70';
    const mutedText = textColor + '50';
    const dividerColor = textColor + '15';
    const hoverBg = textColor + '10';

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${fontClass}`}
            style={{ backgroundColor: bgColor }}>

            <div className={`w-full max-w-md ${animationClass}`}>
                {/* Typography-focused card */}
                <div className={`rounded-2xl shadow-xl overflow-hidden ${hoverClass}`}
                    style={{
                        backgroundColor: cardBg,
                        borderRadius: `${design.border_radius || 20}px`,
                        border: `1px solid ${cardBorder}`,
                    }}>

                    {/* Top accent line */}
                    <div className="h-1" style={{ backgroundColor: primaryColor }} />

                    <div className="p-8">
                        {/* Large typography header */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold tracking-tight leading-tight"
                                style={{ color: textColor }}>
                                {card.display_name}
                            </h1>
                            <div className="mt-3 flex items-center gap-3">
                                <div className="w-12 h-0.5" style={{ backgroundColor: primaryColor }} />
                                {card.title && (
                                    <p className="text-lg font-medium" style={{ color: primaryColor }}>
                                        {card.title}
                                    </p>
                                )}
                            </div>
                            {card.company && (
                                <p className="mt-2 font-medium" style={{ color: subtleText }}>{card.company}</p>
                            )}
                        </div>

                        {card.tagline && (
                            <p className="mb-8 text-lg leading-relaxed border-l-2 pl-4"
                                style={{ color: subtleText, borderColor: primaryColor + '40' }}>
                                {card.tagline}
                            </p>
                        )}

                        {/* Contact info - clean list style */}
                        <div className="space-y-4 mb-8">
                            {card.email && (
                                <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)}
                                    className="flex items-center gap-4 group transition-colors rounded-lg p-2 -ml-2"
                                    style={{ '--hover-bg': hoverBg }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: primaryColor + '15' }}>
                                        <svg className="w-5 h-5" fill="none" stroke={primaryColor} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider" style={{ color: mutedText }}>Email</p>
                                        <p style={{ color: textColor }}>{card.email}</p>
                                    </div>
                                </a>
                            )}
                            {card.phone && (
                                <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)}
                                    className="flex items-center gap-4 group transition-colors rounded-lg p-2 -ml-2"
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: primaryColor + '15' }}>
                                        <svg className="w-5 h-5" fill="none" stroke={primaryColor} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider" style={{ color: mutedText }}>Phone</p>
                                        <p style={{ color: textColor }}>{card.phone}</p>
                                    </div>
                                </a>
                            )}
                            {card.website && (
                                <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)}
                                    className="flex items-center gap-4 group transition-colors rounded-lg p-2 -ml-2"
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: primaryColor + '15' }}>
                                        <svg className="w-5 h-5" fill="none" stroke={primaryColor} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider" style={{ color: mutedText }}>Website</p>
                                        <p style={{ color: textColor }}>{card.website.replace(/^https?:\/\//, '')}</p>
                                    </div>
                                </a>
                            )}
                            {card.location && (
                                <div className="flex items-center gap-4 p-2 -ml-2">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: primaryColor + '15' }}>
                                        <svg className="w-5 h-5" fill="none" stroke={primaryColor} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider" style={{ color: mutedText }}>Location</p>
                                        <p style={{ color: textColor }}>{card.location}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social links - minimal dots */}
                        {Object.keys(card.social_links).length > 0 && (
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex-1 h-px" style={{ backgroundColor: dividerColor }} />
                                <div className="flex gap-2">
                                    {Object.entries(card.social_links).map(([platform, url]) => (
                                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                            onClick={() => onContact(platform, url)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                                            style={{ color: subtleText }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = hoverBg;
                                                e.currentTarget.style.color = textColor;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = subtleText;
                                            }}>
                                            {socialIcons[platform]}
                                        </a>
                                    ))}
                                </div>
                                <div className="flex-1 h-px" style={{ backgroundColor: dividerColor }} />
                            </div>
                        )}

                        {/* Custom Links */}
                        {card.custom_links && card.custom_links.length > 0 && (
                            <div className="space-y-2 mb-8">
                                {card.custom_links.map((link, index) => (
                                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                                        onClick={() => onContact('custom', link.url)}
                                        className="flex items-center justify-between p-3 rounded-lg transition-all"
                                        style={{ border: `1px solid ${dividerColor}`, color: textColor }}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = textColor + '30'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = dividerColor}>
                                        <span className="font-medium">{link.title}</span>
                                        <svg className="w-4 h-4" fill="none" stroke={subtleText} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Save Contact Button */}
                        <button onClick={onSaveContact}
                            className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                            style={{
                                backgroundColor: primaryColor,
                                color: isDark ? bgColor : '#ffffff',
                                borderRadius: `${(design.border_radius || 20) / 2}px`,
                            }}>
                            Save Contact
                        </button>
                    </div>
                </div>

                {/* Small avatar badge at bottom */}
                {card.avatar && (
                    <div className="flex justify-center -mt-6 relative z-10">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-4 shadow-lg"
                            style={{
                                ringColor: cardBg,
                                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                            }}>
                            <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function BoldTemplate({ card, onContact, onSaveContact }) {
    return (
        <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8 text-center">
                        <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden mb-6 shadow-lg">
                            {card.avatar ? (
                                <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: card.colors.primary }}>
                                    {card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h1 className="text-3xl font-black text-gray-900">{card.display_name}</h1>
                        {card.title && <p className="mt-2 text-lg font-semibold" style={{ color: card.colors.primary }}>{card.title}</p>}
                        {card.company && <p className="text-gray-500 font-medium">{card.company}</p>}
                        {card.tagline && <p className="mt-4 text-gray-600">{card.tagline}</p>}

                        <div className="mt-8 grid grid-cols-2 gap-3">
                            {card.email && (
                                <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)} className="py-4 rounded-xl text-white font-semibold transition-all hover:scale-105" style={{ backgroundColor: card.colors.primary }}>
                                    Email
                                </a>
                            )}
                            {card.phone && (
                                <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)} className="py-4 rounded-xl text-white font-semibold transition-all hover:scale-105" style={{ backgroundColor: card.colors.secondary }}>
                                    Call
                                </a>
                            )}
                        </div>

                        {Object.keys(card.social_links).length > 0 && (
                            <div className="flex justify-center gap-3 mt-6">
                                {Object.entries(card.social_links).map(([platform, url]) => (
                                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer" onClick={() => onContact(platform, url)} className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110" style={{ backgroundColor: card.colors.primary }}>
                                        {socialIcons[platform]}
                                    </a>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={onSaveContact}
                            className="mt-6 w-full py-4 rounded-xl text-white font-bold text-lg transition-all hover:scale-105"
                            style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}
                        >
                            Save Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreativeTemplate({ card, onContact, onSaveContact }) {
    const design = card.design || {};
    const animationClass = getAnimationClass(design.animation_style);
    const hoverClass = getHoverClass(design.hover_effect);
    const fontClass = design.font_family ? `font-${design.font_family}` : 'font-poppins';
    const bgColor = card.colors.background || '#0f0f1a';
    const textColor = card.colors.text || '#ffffff';
    const initials = card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${fontClass}`}
            style={{ backgroundColor: bgColor }}>

            <div className={`w-full max-w-lg ${animationClass}`}>
                {/* Card with LEFT gradient sidebar */}
                <div className={`flex rounded-3xl overflow-hidden shadow-2xl ${hoverClass}`}
                    style={{ borderRadius: `${design.border_radius || 24}px` }}>

                    {/* Gradient Sidebar - Left side */}
                    <div className="w-24 flex-shrink-0 relative overflow-hidden"
                        style={{ background: `linear-gradient(180deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
                        {/* Decorative circles */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/10" />
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10" />
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/20" />

                        {/* Vertical text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/30 text-xs font-bold tracking-[0.3em] transform -rotate-90 whitespace-nowrap uppercase">
                                {card.company || 'Business Card'}
                            </span>
                        </div>
                    </div>

                    {/* Main Content - Right side */}
                    <div className="flex-1 p-8" style={{ backgroundColor: bgColor === '#0f0f1a' ? '#1a1a2e' : (bgColor + 'f0') }}>
                        {/* Avatar & Name row */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg flex-shrink-0"
                                style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
                                {card.avatar ? (
                                    <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                                        {initials}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-bold truncate" style={{ color: textColor }}>{card.display_name}</h1>
                                {card.title && (
                                    <p className="font-medium mt-0.5" style={{ color: card.colors.primary }}>{card.title}</p>
                                )}
                            </div>
                        </div>

                        {card.tagline && (
                            <div className="mb-6 pl-4 border-l-2" style={{ borderColor: card.colors.primary }}>
                                <p className="text-sm italic" style={{ color: textColor + '90' }}>"{card.tagline}"</p>
                            </div>
                        )}

                        {/* Contact info - colored bars */}
                        <div className="space-y-2 mb-6">
                            {card.email && (
                                <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)}
                                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:translate-x-1"
                                    style={{ backgroundColor: card.colors.primary + '15' }}>
                                    <div className="w-1 h-8 rounded-full" style={{ backgroundColor: card.colors.primary }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs uppercase tracking-wider" style={{ color: textColor + '60' }}>Email</p>
                                        <p className="truncate" style={{ color: textColor }}>{card.email}</p>
                                    </div>
                                </a>
                            )}
                            {card.phone && (
                                <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)}
                                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:translate-x-1"
                                    style={{ backgroundColor: card.colors.secondary + '15' }}>
                                    <div className="w-1 h-8 rounded-full" style={{ backgroundColor: card.colors.secondary }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs uppercase tracking-wider" style={{ color: textColor + '60' }}>Phone</p>
                                        <p style={{ color: textColor }}>{card.phone}</p>
                                    </div>
                                </a>
                            )}
                            {card.website && (
                                <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)}
                                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:translate-x-1"
                                    style={{ backgroundColor: card.colors.primary + '10' }}>
                                    <div className="w-1 h-8 rounded-full" style={{ backgroundColor: card.colors.primary + '80' }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs uppercase tracking-wider" style={{ color: textColor + '60' }}>Website</p>
                                        <p className="truncate" style={{ color: textColor }}>{card.website.replace(/^https?:\/\//, '')}</p>
                                    </div>
                                </a>
                            )}
                            {card.location && (
                                <div className="flex items-center gap-3 p-3 rounded-xl"
                                    style={{ backgroundColor: card.colors.secondary + '10' }}>
                                    <div className="w-1 h-8 rounded-full" style={{ backgroundColor: card.colors.secondary + '80' }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs uppercase tracking-wider" style={{ color: textColor + '60' }}>Location</p>
                                        <p style={{ color: textColor }}>{card.location}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social links */}
                        {Object.keys(card.social_links).length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {Object.entries(card.social_links).map(([platform, url]) => (
                                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                        onClick={() => onContact(platform, url)}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                                        style={{ backgroundColor: card.colors.primary + '20', color: card.colors.primary }}>
                                        {socialIcons[platform]}
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Save Contact Button */}
                        <button onClick={onSaveContact}
                            className="w-full py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                            style={{
                                background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})`,
                                borderRadius: `${(design.border_radius || 24) / 2}px`,
                            }}>
                            Save Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CorporateTemplate({ card, onContact, onSaveContact }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="h-2" style={{ backgroundColor: card.colors.primary }}></div>
                <div className="p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: card.colors.primary }}>
                            {card.avatar ? (
                                <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                                    {card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{card.display_name}</h1>
                            {card.title && <p className="font-medium" style={{ color: card.colors.primary }}>{card.title}</p>}
                            {card.company && <p className="text-gray-500">{card.company}</p>}
                        </div>
                        {card.logo && (
                            <img src={card.logo} alt="Logo" className="h-12 ml-auto object-contain" />
                        )}
                    </div>

                    {card.tagline && (
                        <p className="mt-4 text-gray-600 text-sm border-l-2 pl-3" style={{ borderColor: card.colors.primary }}>{card.tagline}</p>
                    )}

                    <hr className="my-6" />

                    <div className="space-y-2 text-sm">
                        {card.email && (
                            <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)} className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {card.email}
                            </a>
                        )}
                        {card.phone && (
                            <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)} className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {card.phone}
                            </a>
                        )}
                        {card.website && (
                            <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)} className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                {card.website.replace(/^https?:\/\//, '')}
                            </a>
                        )}
                        {card.location && (
                            <div className="flex items-center gap-3 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {card.location}
                            </div>
                        )}
                    </div>

                    {Object.keys(card.social_links).length > 0 && (
                        <div className="flex gap-2 mt-6">
                            {Object.entries(card.social_links).map(([platform, url]) => (
                                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" onClick={() => onContact(platform, url)} className="w-8 h-8 rounded flex items-center justify-center text-white transition-all hover:opacity-80" style={{ backgroundColor: card.colors.primary }}>
                                    {socialIcons[platform]}
                                </a>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={onSaveContact}
                        className="mt-6 w-full py-3 rounded text-white font-semibold transition-all hover:opacity-90"
                        style={{ backgroundColor: card.colors.primary }}
                    >
                        Save Contact
                    </button>
                </div>
            </div>
        </div>
    );
}

function GradientTemplate({ card, onContact, onSaveContact }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
            <div className="w-full max-w-md text-center text-white">
                <div className="w-28 h-28 mx-auto rounded-full border-4 border-white/30 overflow-hidden mb-6 backdrop-blur-sm">
                    {card.avatar ? (
                        <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/20 text-3xl font-bold">
                            {card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>

                <h1 className="text-3xl font-bold">{card.display_name}</h1>
                {card.title && <p className="mt-2 text-white/80 text-lg">{card.title}</p>}
                {card.company && <p className="text-white/60">{card.company}</p>}
                {card.tagline && <p className="mt-4 text-white/70">{card.tagline}</p>}

                <div className="mt-8 space-y-3">
                    {card.email && (
                        <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)} className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {card.email}
                        </a>
                    )}
                    {card.phone && (
                        <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)} className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {card.phone}
                        </a>
                    )}
                </div>

                {Object.keys(card.social_links).length > 0 && (
                    <div className="flex justify-center gap-3 mt-8">
                        {Object.entries(card.social_links).map(([platform, url]) => (
                            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" onClick={() => onContact(platform, url)} className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                                {socialIcons[platform]}
                            </a>
                        ))}
                    </div>
                )}

                <button
                    onClick={onSaveContact}
                    className="mt-8 w-full py-4 rounded-xl bg-white text-gray-900 font-bold transition-all hover:bg-white/90"
                >
                    Save Contact
                </button>

                <a href="/" className="block mt-8 text-white/50 text-sm hover:text-white/70 transition-colors">
                    Powered by Indentio
                </a>
            </div>
        </div>
    );
}

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
        'subtle': 'shadow-subtle',
        'medium': 'shadow-medium',
        'strong': 'shadow-strong',
    };
    return classes[intensity] || 'shadow-medium';
}

function GlassTemplate({ card, onContact, onSaveContact }) {
    const design = card.design || {};
    const animationClass = getAnimationClass(design.animation_style);
    const hoverClass = getHoverClass(design.hover_effect);
    const shadowClass = getShadowClass(design.shadow_intensity);
    const fontClass = design.font_family ? `font-${design.font_family}` : 'font-inter';
    const textColor = card.colors.text || '#ffffff';
    const bgColor = card.colors.background || '#0a0a0f';
    const initials = card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4 ${fontClass}`}
            style={{ backgroundColor: bgColor }}
        >
            {/* Animated background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
                    style={{ backgroundColor: card.colors.primary + '25' }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-glow"
                    style={{ backgroundColor: card.colors.secondary + '25', animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse-glow"
                    style={{ backgroundColor: card.colors.primary + '15', animationDelay: '3s' }} />
            </div>

            <div
                className={`relative w-full max-w-md glass-card ${animationClass} ${shadowClass}`}
                style={{
                    '--glass-blur': `${design.glass_blur || 16}px`,
                    '--glass-opacity': design.glass_opacity || 0.12,
                    borderRadius: `${design.border_radius || 28}px`,
                }}
            >
                <div className={`p-8 ${hoverClass}`}>
                    {/* Split layout - Avatar and Name */}
                    <div className="flex items-center gap-5 mb-6">
                        <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-xl"
                                style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
                                {card.avatar ? (
                                    <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                                        {initials}
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black/50 shadow-lg"
                                style={{ backgroundColor: card.colors.primary }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold truncate" style={{ color: textColor }}>
                                {card.display_name}
                            </h1>
                            {card.title && (
                                <p className="text-lg font-medium truncate" style={{ color: card.colors.primary }}>
                                    {card.title}
                                </p>
                            )}
                            {card.company && (
                                <p className="text-sm truncate" style={{ color: textColor + '99' }}>{card.company}</p>
                            )}
                        </div>
                    </div>

                    {card.tagline && (
                        <p className="text-sm mb-6 text-center" style={{ color: textColor + '80' }}>{card.tagline}</p>
                    )}

                    {/* Contact Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {card.email && (
                            <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)}
                                className="flex items-center gap-3 p-3 rounded-xl glass-card transition-all hover:bg-white/20"
                                style={{ '--glass-blur': '8px' }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: card.colors.primary + '30' }}>
                                    <svg className="w-5 h-5" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-sm" style={{ color: textColor + 'cc' }}>Email</span>
                            </a>
                        )}
                        {card.phone && (
                            <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)}
                                className="flex items-center gap-3 p-3 rounded-xl glass-card transition-all hover:bg-white/20"
                                style={{ '--glass-blur': '8px' }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: card.colors.secondary + '30' }}>
                                    <svg className="w-5 h-5" fill="none" stroke={card.colors.secondary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-sm" style={{ color: textColor + 'cc' }}>Call</span>
                            </a>
                        )}
                        {card.website && (
                            <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)}
                                className="flex items-center gap-3 p-3 rounded-xl glass-card transition-all hover:bg-white/20"
                                style={{ '--glass-blur': '8px' }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: card.colors.primary + '30' }}>
                                    <svg className="w-5 h-5" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <span className="text-sm" style={{ color: textColor + 'cc' }}>Website</span>
                            </a>
                        )}
                        {card.location && (
                            <div className="flex items-center gap-3 p-3 rounded-xl glass-card" style={{ '--glass-blur': '8px' }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: card.colors.secondary + '30' }}>
                                    <svg className="w-5 h-5" fill="none" stroke={card.colors.secondary} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm" style={{ color: textColor + 'cc' }}>Location</span>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    {Object.keys(card.social_links).length > 0 && (
                        <div className="flex justify-center gap-3 mb-6">
                            {Object.entries(card.social_links).map(([platform, url]) => (
                                <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                    onClick={() => onContact(platform, url)}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center glass-card transition-all hover:scale-110 hover:bg-white/20"
                                    style={{ '--glass-blur': '8px', color: textColor }}>
                                    {socialIcons[platform]}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Custom Links */}
                    {card.custom_links && card.custom_links.length > 0 && (
                        <div className="space-y-2 mb-6">
                            {card.custom_links.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                                    onClick={() => onContact('custom', link.url)}
                                    className="block w-full p-3 rounded-xl glass-card text-center font-medium transition-all hover:bg-white/20"
                                    style={{ '--glass-blur': '8px', color: textColor }}>
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Save Contact Button */}
                    <button onClick={onSaveContact}
                        className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                        style={{
                            background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})`,
                            borderRadius: `${(design.border_radius || 28) / 2}px`,
                        }}>
                        Save Contact
                    </button>
                </div>
            </div>
        </div>
    );
}

function AuroraTemplate({ card, onContact, onSaveContact }) {
    const design = card.design || {};
    const animationClass = getAnimationClass(design.animation_style);
    const hoverClass = getHoverClass(design.hover_effect);
    const shadowClass = getShadowClass(design.shadow_intensity);
    const fontClass = design.font_family ? `font-${design.font_family}` : 'font-inter';
    const textColor = card.colors.text || '#ffffff';
    const bgColor = card.colors.background || '#0a0a0f';
    const initials = card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div
            className={`min-h-screen flex flex-col ${fontClass}`}
            style={{ backgroundColor: bgColor }}
        >
            {/* Full-bleed animated header */}
            <div className="relative h-56 overflow-hidden">
                <div
                    className="absolute inset-0 animate-aurora"
                    style={{
                        background: `linear-gradient(-45deg, ${card.colors.primary}, ${card.colors.secondary}, ${card.colors.primary}88, ${card.colors.secondary}88)`,
                        backgroundSize: '400% 400%',
                    }}
                />
                {/* Animated wave overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-20">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,214.38,119.6,287.94,100.3,googol 321.39,56.44Z"
                            fill={bgColor}
                            opacity="0.3"
                        />
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            fill={bgColor}
                            opacity="0.5"
                        />
                        <path
                            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            fill={bgColor}
                        />
                    </svg>
                </div>
                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-white/30 rounded-full animate-float"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${20 + (i % 2) * 30}%`,
                            animationDelay: `${i * 0.7}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content area */}
            <div className="flex-1 flex items-start justify-center px-4 -mt-20 pb-8">
                <div
                    className={`relative w-full max-w-md ${animationClass} ${shadowClass}`}
                    style={{ borderRadius: `${design.border_radius || 32}px` }}
                >
                    {/* Avatar floating above card */}
                    <div className="flex justify-center mb-4 relative z-10">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 shadow-2xl"
                            style={{
                                ringColor: bgColor,
                                background: `linear-gradient(-45deg, ${card.colors.primary}, ${card.colors.secondary})`,
                            }}>
                            {card.avatar ? (
                                <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl animate-aurora"
                                    style={{ backgroundSize: '400% 400%' }}>
                                    {initials}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Floating card */}
                    <div
                        className={`glass-card ${hoverClass}`}
                        style={{
                            '--glass-blur': `${design.glass_blur || 20}px`,
                            '--glass-opacity': design.glass_opacity || 0.15,
                            borderRadius: `${design.border_radius || 32}px`,
                        }}
                    >
                        <div className="p-8 pt-4 text-center">
                            <h1 className="text-3xl font-bold mb-1" style={{ color: textColor }}>
                                {card.display_name}
                            </h1>
                            {card.title && (
                                <p className="text-lg font-semibold bg-clip-text text-transparent animate-aurora"
                                    style={{
                                        backgroundImage: `linear-gradient(-45deg, ${card.colors.primary}, ${card.colors.secondary}, ${card.colors.primary})`,
                                        backgroundSize: '400% 400%',
                                    }}>
                                    {card.title}
                                </p>
                            )}
                            {card.company && (
                                <p className="text-sm mt-1" style={{ color: textColor + '80' }}>{card.company}</p>
                            )}
                            {card.tagline && (
                                <p className="mt-4 text-sm italic" style={{ color: textColor + '70' }}>"{card.tagline}"</p>
                            )}

                            {/* Contact buttons row */}
                            <div className="flex justify-center gap-3 mt-6">
                                {card.email && (
                                    <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)}
                                        className="flex-1 max-w-[120px] p-3 rounded-xl glass-card text-center transition-all hover:bg-white/20"
                                        style={{ '--glass-blur': '8px' }}>
                                        <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1 animate-aurora"
                                            style={{
                                                background: `linear-gradient(-45deg, ${card.colors.primary}40, ${card.colors.secondary}40)`,
                                                backgroundSize: '400% 400%',
                                            }}>
                                            <svg className="w-5 h-5" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium" style={{ color: textColor + 'cc' }}>Email</span>
                                    </a>
                                )}
                                {card.phone && (
                                    <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)}
                                        className="flex-1 max-w-[120px] p-3 rounded-xl glass-card text-center transition-all hover:bg-white/20"
                                        style={{ '--glass-blur': '8px' }}>
                                        <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1 animate-aurora"
                                            style={{
                                                background: `linear-gradient(-45deg, ${card.colors.secondary}40, ${card.colors.primary}40)`,
                                                backgroundSize: '400% 400%',
                                            }}>
                                            <svg className="w-5 h-5" fill="none" stroke={card.colors.secondary} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium" style={{ color: textColor + 'cc' }}>Call</span>
                                    </a>
                                )}
                                {card.website && (
                                    <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)}
                                        className="flex-1 max-w-[120px] p-3 rounded-xl glass-card text-center transition-all hover:bg-white/20"
                                        style={{ '--glass-blur': '8px' }}>
                                        <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1 animate-aurora"
                                            style={{
                                                background: `linear-gradient(-45deg, ${card.colors.primary}40, ${card.colors.secondary}40)`,
                                                backgroundSize: '400% 400%',
                                            }}>
                                            <svg className="w-5 h-5" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium" style={{ color: textColor + 'cc' }}>Web</span>
                                    </a>
                                )}
                            </div>

                            {card.location && (
                                <p className="mt-4 text-sm flex items-center justify-center gap-2" style={{ color: textColor + '80' }}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    {card.location}
                                </p>
                            )}

                            {/* Social Links */}
                            {Object.keys(card.social_links).length > 0 && (
                                <div className="flex justify-center gap-3 mt-6">
                                    {Object.entries(card.social_links).map(([platform, url]) => (
                                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                            onClick={() => onContact(platform, url)}
                                            className="w-11 h-11 rounded-xl flex items-center justify-center glass-card transition-all hover:scale-110 hover:bg-white/20"
                                            style={{ '--glass-blur': '8px', color: textColor + 'cc' }}>
                                            {socialIcons[platform]}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Custom Links */}
                            {card.custom_links && card.custom_links.length > 0 && (
                                <div className="space-y-2 mt-6">
                                    {card.custom_links.map((link, index) => (
                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                                            onClick={() => onContact('custom', link.url)}
                                            className="block w-full p-3 rounded-xl glass-card text-center font-medium transition-all hover:bg-white/20"
                                            style={{ '--glass-blur': '8px', color: textColor }}>
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Save Contact Button */}
                            <button onClick={onSaveContact}
                                className="mt-6 w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] animate-aurora shadow-lg"
                                style={{
                                    background: `linear-gradient(-45deg, ${card.colors.primary}, ${card.colors.secondary}, ${card.colors.primary})`,
                                    backgroundSize: '400% 400%',
                                    borderRadius: `${(design.border_radius || 32) / 2}px`,
                                }}>
                                Save Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FrostTemplate({ card, onContact, onSaveContact }) {
    const design = card.design || {};
    const animationClass = getAnimationClass(design.animation_style);
    const hoverClass = getHoverClass(design.hover_effect);
    const shadowClass = getShadowClass(design.shadow_intensity);
    const fontClass = design.font_family ? `font-${design.font_family}` : 'font-inter';
    const initials = card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${fontClass}`}
            style={{ background: 'linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)' }}>

            {/* Frost/Ice particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${5 + i * 8}%`,
                            top: `${5 + (i % 4) * 25}%`,
                            animationDelay: `${i * 0.4}s`,
                        }}>
                        <div className="w-3 h-3 bg-white/60 rotate-45" />
                    </div>
                ))}
                {/* Ice crystals */}
                {[...Array(6)].map((_, i) => (
                    <div key={`crystal-${i}`}
                        className="absolute text-white/40 animate-pulse"
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${15 + (i % 3) * 30}%`,
                            animationDelay: `${i * 0.8}s`,
                            fontSize: '24px',
                        }}>
                        ❄
                    </div>
                ))}
            </div>

            <div className={`relative w-full max-w-lg ${animationClass}`}>
                {/* Main horizontal card */}
                <div
                    className={`relative overflow-hidden ${hoverClass} ${shadowClass}`}
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(224,247,250,0.9))',
                        backdropFilter: `blur(${design.glass_blur || 16}px)`,
                        borderRadius: `${design.border_radius || 28}px`,
                        border: '1px solid rgba(255,255,255,0.6)',
                    }}>

                    {/* Ice accent on top */}
                    <div className="absolute top-0 left-0 right-0 h-1"
                        style={{ background: `linear-gradient(90deg, ${card.colors.primary}, ${card.colors.secondary}, ${card.colors.primary})` }} />

                    {/* Horizontal layout */}
                    <div className="flex items-stretch">
                        {/* Left - Avatar section */}
                        <div className="w-40 flex-shrink-0 p-6 flex flex-col items-center justify-center relative"
                            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5), rgba(178,235,242,0.5))' }}>
                            <div className="relative">
                                {/* Ice ring */}
                                <div className="absolute -inset-2 rounded-full animate-pulse"
                                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(128,222,234,0.6))' }} />
                                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
                                    {card.avatar ? (
                                        <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                                            {initials}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {card.logo && (
                                <img src={card.logo} alt="Logo" className="h-6 mt-4 object-contain opacity-80" />
                            )}
                        </div>

                        {/* Right - Info section */}
                        <div className="flex-1 p-6">
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold text-slate-800">{card.display_name}</h1>
                                {card.title && (
                                    <p className="text-base font-semibold" style={{ color: card.colors.primary }}>{card.title}</p>
                                )}
                                {card.company && (
                                    <p className="text-sm text-slate-500">{card.company}</p>
                                )}
                            </div>

                            {card.tagline && (
                                <p className="text-sm text-slate-600 mb-4 italic border-l-2 pl-3"
                                    style={{ borderColor: card.colors.primary + '60' }}>
                                    {card.tagline}
                                </p>
                            )}

                            {/* Contact info horizontal */}
                            <div className="space-y-2 text-sm">
                                {card.email && (
                                    <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)}
                                        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: card.colors.primary + '20' }}>
                                            <svg className="w-4 h-4" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="truncate">{card.email}</span>
                                    </a>
                                )}
                                {card.phone && (
                                    <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)}
                                        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: card.colors.secondary + '20' }}>
                                            <svg className="w-4 h-4" fill="none" stroke={card.colors.secondary} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <span>{card.phone}</span>
                                    </a>
                                )}
                                {card.website && (
                                    <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)}
                                        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: card.colors.primary + '20' }}>
                                            <svg className="w-4 h-4" fill="none" stroke={card.colors.primary} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <span className="truncate">{card.website.replace(/^https?:\/\//, '')}</span>
                                    </a>
                                )}
                                {card.location && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: card.colors.secondary + '20' }}>
                                            <svg className="w-4 h-4" fill="none" stroke={card.colors.secondary} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                        </div>
                                        <span>{card.location}</span>
                                    </div>
                                )}
                            </div>

                            {/* Social + Actions row */}
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200/50">
                                {Object.keys(card.social_links).length > 0 && (
                                    <div className="flex gap-2">
                                        {Object.entries(card.social_links).map(([platform, url]) => (
                                            <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                                onClick={() => onContact(platform, url)}
                                                className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/60 hover:bg-white/90 transition-all text-slate-500 hover:text-slate-700 shadow-sm">
                                                {socialIcons[platform]}
                                            </a>
                                        ))}
                                    </div>
                                )}
                                <button onClick={onSaveContact}
                                    className="ml-auto px-5 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 shadow-md"
                                    style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
                                    Save Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Links below card */}
                {card.custom_links && card.custom_links.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {card.custom_links.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                                onClick={() => onContact('custom', link.url)}
                                className="block w-full p-3 rounded-xl text-center font-medium transition-all hover:scale-[1.02] shadow-md"
                                style={{
                                    background: 'rgba(255,255,255,0.85)',
                                    backdropFilter: 'blur(8px)',
                                    color: card.colors.primary,
                                }}>
                                {link.title}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function PrismTemplate({ card, onContact, onSaveContact }) {
    const design = card.design || {};
    const animationClass = getAnimationClass(design.animation_style);
    const hoverClass = getHoverClass(design.hover_effect);
    const shadowClass = getShadowClass(design.shadow_intensity);
    const fontClass = design.font_family ? `font-${design.font_family}` : 'font-inter';
    const initials = card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const bgColor = card.colors.background || '#0a0a0f';

    // Rainbow colors for accents
    const rainbowColors = ['#ff0080', '#7928ca', '#0070f3', '#00dfd8', '#ff4d4d', '#f9cb28'];

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${fontClass}`}
            style={{ backgroundColor: bgColor }}>

            {/* Animated prism light rays */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {rainbowColors.map((color, i) => (
                    <div key={i}
                        className="absolute w-1 animate-pulse"
                        style={{
                            background: `linear-gradient(180deg, transparent, ${color}40, transparent)`,
                            height: '100%',
                            left: `${10 + i * 15}%`,
                            transform: `rotate(${-15 + i * 5}deg)`,
                            transformOrigin: 'top center',
                            animationDelay: `${i * 0.3}s`,
                        }}
                    />
                ))}
            </div>

            <div className={`relative w-full max-w-md ${animationClass}`}>
                {/* Main card with rainbow border effect */}
                <div className="relative p-[2px] rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #ff0080, #7928ca, #0070f3, #00dfd8)',
                        animation: 'hue-rotate 8s linear infinite',
                        borderRadius: `${design.border_radius || 28}px`,
                    }}>
                    <div className={`relative bg-gray-900/95 ${hoverClass} ${shadowClass}`}
                        style={{ borderRadius: `${(design.border_radius || 28) - 2}px` }}>

                        {/* Asymmetric layout */}
                        <div className="p-6">
                            {/* Top section - Avatar offset to left */}
                            <div className="flex items-start gap-5 mb-6">
                                {/* Avatar with rainbow glow */}
                                <div className="relative flex-shrink-0">
                                    <div className="absolute -inset-1 rounded-2xl blur-md animate-pulse"
                                        style={{ background: 'linear-gradient(135deg, #ff0080, #7928ca, #0070f3)' }} />
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-white/20"
                                        style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}>
                                        {card.avatar ? (
                                            <img src={card.avatar} alt={card.display_name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                                                {initials}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Name and title */}
                                <div className="flex-1 min-w-0 pt-1">
                                    <h1 className="text-2xl font-bold text-white truncate">{card.display_name}</h1>
                                    {card.title && (
                                        <p className="text-base font-semibold bg-clip-text text-transparent truncate"
                                            style={{
                                                backgroundImage: 'linear-gradient(135deg, #ff0080, #7928ca, #0070f3, #00dfd8)',
                                            }}>
                                            {card.title}
                                        </p>
                                    )}
                                    {card.company && (
                                        <p className="text-sm text-gray-400 truncate">{card.company}</p>
                                    )}
                                </div>
                            </div>

                            {card.tagline && (
                                <p className="text-sm text-gray-400 mb-6 pl-4 border-l-2"
                                    style={{ borderImage: 'linear-gradient(180deg, #ff0080, #0070f3) 1' }}>
                                    {card.tagline}
                                </p>
                            )}

                            {/* Contact list with color bars */}
                            <div className="space-y-2 mb-6">
                                {card.email && (
                                    <a href={`mailto:${card.email}`} onClick={() => onContact('email', card.email)}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: rainbowColors[0] }} />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5">
                                            <svg className="w-4 h-4" fill="none" stroke={rainbowColors[0]} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">{card.email}</p>
                                        </div>
                                    </a>
                                )}
                                {card.phone && (
                                    <a href={`tel:${card.phone}`} onClick={() => onContact('phone', card.phone)}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: rainbowColors[1] }} />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5">
                                            <svg className="w-4 h-4" fill="none" stroke={rainbowColors[1]} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{card.phone}</p>
                                        </div>
                                    </a>
                                )}
                                {card.website && (
                                    <a href={card.website} target="_blank" rel="noopener noreferrer" onClick={() => onContact('website', card.website)}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: rainbowColors[2] }} />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5">
                                            <svg className="w-4 h-4" fill="none" stroke={rainbowColors[2]} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Website</p>
                                            <p className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">{card.website.replace(/^https?:\/\//, '')}</p>
                                        </div>
                                    </a>
                                )}
                                {card.location && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: rainbowColors[3] }} />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5">
                                            <svg className="w-4 h-4" fill="none" stroke={rainbowColors[3]} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Location</p>
                                            <p className="text-sm text-gray-300">{card.location}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social links - horizontal rainbow underline on hover */}
                            {Object.keys(card.social_links).length > 0 && (
                                <div className="flex justify-center gap-2 mb-6">
                                    {Object.entries(card.social_links).map(([platform, url], i) => (
                                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                            onClick={() => onContact(platform, url)}
                                            className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white relative group overflow-hidden">
                                            {socialIcons[platform]}
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform"
                                                style={{ backgroundColor: rainbowColors[i % rainbowColors.length] }} />
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Custom Links */}
                            {card.custom_links && card.custom_links.length > 0 && (
                                <div className="space-y-2 mb-6">
                                    {card.custom_links.map((link, index) => (
                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                                            onClick={() => onContact('custom', link.url)}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                                            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: rainbowColors[(index + 4) % rainbowColors.length] }} />
                                            <span className="text-sm font-medium">{link.title}</span>
                                            <svg className="w-4 h-4 ml-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Save Contact Button with rainbow gradient */}
                            <div className="relative p-[1px] rounded-xl overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, #ff0080, #7928ca, #0070f3, #00dfd8)',
                                }}>
                                <button onClick={onSaveContact}
                                    className="w-full py-4 rounded-xl font-bold text-white bg-gray-900 hover:bg-gray-800 transition-all relative overflow-hidden group">
                                    <span className="relative z-10">Save Contact</span>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                                        style={{ background: 'linear-gradient(135deg, #ff0080, #7928ca, #0070f3, #00dfd8)' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for hue rotation animation */}
            <style>{`
                @keyframes hue-rotate {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default function BusinessCard({ card, owner }) {
    const [showQr, setShowQr] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        type: 'contact',
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post(route('card.lead', card.slug), {
            onSuccess: () => {
                setContactSuccess(true);
                reset();
                setTimeout(() => {
                    setShowContact(false);
                    setContactSuccess(false);
                }, 2000);
            },
        });
    };

    const trackClick = async (linkType, linkUrl) => {
        try {
            await fetch('/track/click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({
                    user_id: owner.id,
                    link_type: linkType,
                    link_url: linkUrl,
                    business_card_id: card.id,
                }),
            });
        } catch (e) {
            // Silently fail
        }
    };

    const generateVCard = () => {
        const vcard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${card.display_name}`,
            card.title ? `TITLE:${card.title}` : '',
            card.company ? `ORG:${card.company}` : '',
            card.email ? `EMAIL:${card.email}` : '',
            card.phone ? `TEL:${card.phone}` : '',
            card.website ? `URL:${card.website}` : '',
            card.location ? `ADR:;;${card.location};;;;` : '',
            'END:VCARD'
        ].filter(Boolean).join('\n');

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${card.display_name.replace(/\s+/g, '_')}.vcf`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const TemplateComponent = templates[card.template] || ModernTemplate;

    return (
        <>
            <Head title={`${card.display_name} | Indentio`} />
            <TemplateComponent card={card} onContact={trackClick} onSaveContact={generateVCard} />

            {/* Floating Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3">
                {/* Contact Button */}
                <button
                    onClick={() => setShowContact(true)}
                    className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-emerald-500 text-white transition-all hover:scale-110 hover:shadow-xl"
                    title="Contact Me"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </button>

                {/* View Portfolio Button */}
                {owner.is_public && owner.username && (
                    <a
                        href={owner.profile_url}
                        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-white text-gray-700 transition-all hover:scale-110 hover:shadow-xl"
                        title="View Full Portfolio"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </a>
                )}

                {/* QR Code Button */}
                <button
                    onClick={() => setShowQr(true)}
                    className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}
                    title="Share QR Code"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                </button>
            </div>

            {/* QR Modal */}
            {showQr && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowQr(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Share Card</h3>
                            <button onClick={() => setShowQr(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl mb-4">
                            <img
                                src={card.qr_url}
                                alt="QR Code"
                                className="w-full"
                            />
                        </div>
                        <p className="text-center text-gray-500 text-sm mb-4">
                            Scan to view {card.display_name}'s card
                        </p>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            className="w-full py-3 rounded-xl text-white font-semibold transition-all"
                            style={{ backgroundColor: card.colors.primary }}
                        >
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>

                        {/* View Portfolio Link */}
                        {owner.is_public && owner.username && (
                            <a
                                href={owner.profile_url}
                                className="mt-3 w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                View Full Portfolio
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {showContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowContact(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Contact {card.display_name}</h3>
                            <button onClick={() => setShowContact(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {contactSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h4>
                                <p className="text-gray-500">Thank you for reaching out. You'll hear back soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                {/* Contact Type */}
                                <div className="flex gap-2 flex-wrap">
                                    {[
                                        { id: 'contact', label: 'General' },
                                        { id: 'meeting', label: 'Schedule Meeting' },
                                        { id: 'callback', label: 'Request Callback' },
                                        { id: 'inquiry', label: 'Business Inquiry' },
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setData('type', type.id)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                data.type === type.id
                                                    ? 'text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                            style={data.type === type.id ? { backgroundColor: card.colors.primary } : {}}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                        <input
                                            type="text"
                                            value={data.company}
                                            onChange={e => setData('company', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: card.colors.primary }}
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
