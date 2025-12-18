import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';

const signatureStyles = {
    modern: {
        name: 'Modern',
        description: 'Clean with colored accent',
    },
    minimal: {
        name: 'Minimal',
        description: 'Simple and professional',
    },
    corporate: {
        name: 'Corporate',
        description: 'Traditional business style',
    },
    creative: {
        name: 'Creative',
        description: 'Bold with personality',
    },
};

export default function EmailSignature({ card }) {
    const [style, setStyle] = useState('modern');
    const [showAvatar, setShowAvatar] = useState(true);
    const [showSocial, setShowSocial] = useState(true);
    const [copied, setCopied] = useState(false);
    const signatureRef = useRef(null);

    const generateSignatureHtml = () => {
        const primaryColor = card.color_primary || '#8b5cf6';

        if (style === 'modern') {
            return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;">
    <tr>
        <td style="padding-right: 15px; border-right: 3px solid ${primaryColor};">
            ${showAvatar && card.avatar ? `<img src="${card.avatar}" alt="${card.display_name}" width="80" height="80" style="border-radius: 50%; display: block;" />` : ''}
        </td>
        <td style="padding-left: 15px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 18px; font-weight: bold; color: ${primaryColor}; padding-bottom: 2px;">
                        ${card.display_name}
                    </td>
                </tr>
                ${card.title ? `<tr><td style="font-size: 14px; color: #666666; padding-bottom: 8px;">${card.title}${card.company ? ` | ${card.company}` : ''}</td></tr>` : ''}
                ${card.email ? `<tr><td style="font-size: 13px; color: #333333; padding-bottom: 2px;">✉ <a href="mailto:${card.email}" style="color: #333333; text-decoration: none;">${card.email}</a></td></tr>` : ''}
                ${card.phone ? `<tr><td style="font-size: 13px; color: #333333; padding-bottom: 2px;">📱 <a href="tel:${card.phone}" style="color: #333333; text-decoration: none;">${card.phone}</a></td></tr>` : ''}
                ${card.website ? `<tr><td style="font-size: 13px; color: #333333; padding-bottom: 8px;">🌐 <a href="${card.website}" style="color: ${primaryColor}; text-decoration: none;">${card.website.replace(/^https?:\/\//, '')}</a></td></tr>` : ''}
                ${showSocial && (card.linkedin_url || card.twitter_url) ? `
                <tr>
                    <td style="padding-top: 5px;">
                        ${card.linkedin_url ? `<a href="${card.linkedin_url}" style="margin-right: 8px; text-decoration: none; color: #0077b5;">LinkedIn</a>` : ''}
                        ${card.twitter_url ? `<a href="${card.twitter_url}" style="margin-right: 8px; text-decoration: none; color: #1da1f2;">Twitter</a>` : ''}
                    </td>
                </tr>` : ''}
                <tr>
                    <td style="padding-top: 10px;">
                        <a href="${card.public_url}" style="display: inline-block; padding: 6px 12px; background-color: ${primaryColor}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 12px;">View Digital Card</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
        }

        if (style === 'minimal') {
            return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #333333;">
    <tr>
        <td>
            <span style="font-size: 16px; font-weight: bold;">${card.display_name}</span>
            ${card.title ? `<br /><span style="color: #666666;">${card.title}${card.company ? ` at ${card.company}` : ''}</span>` : ''}
        </td>
    </tr>
    <tr>
        <td style="padding-top: 8px; font-size: 12px; color: #666666;">
            ${card.email ? `<a href="mailto:${card.email}" style="color: #666666; text-decoration: none;">${card.email}</a>` : ''}
            ${card.email && card.phone ? ' | ' : ''}
            ${card.phone ? `<a href="tel:${card.phone}" style="color: #666666; text-decoration: none;">${card.phone}</a>` : ''}
        </td>
    </tr>
    <tr>
        <td style="padding-top: 5px;">
            <a href="${card.public_url}" style="color: ${primaryColor}; text-decoration: none; font-size: 12px;">View my digital business card →</a>
        </td>
    </tr>
</table>`;
        }

        if (style === 'corporate') {
            return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Times New Roman', serif; font-size: 14px; color: #1a1a1a; border-top: 2px solid ${primaryColor}; padding-top: 10px;">
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 18px; font-weight: bold; color: #1a1a1a;">${card.display_name}</td>
                </tr>
                ${card.title ? `<tr><td style="font-size: 14px; font-style: italic; color: #444444;">${card.title}</td></tr>` : ''}
                ${card.company ? `<tr><td style="font-size: 14px; font-weight: bold; color: ${primaryColor}; padding-top: 5px; text-transform: uppercase; letter-spacing: 1px;">${card.company}</td></tr>` : ''}
            </table>
        </td>
        ${showAvatar && card.logo ? `<td style="padding-left: 20px;"><img src="${card.logo}" alt="Logo" height="50" /></td>` : ''}
    </tr>
    <tr>
        <td colspan="2" style="padding-top: 10px; font-size: 12px;">
            ${card.email ? `Email: <a href="mailto:${card.email}" style="color: #1a1a1a;">${card.email}</a><br />` : ''}
            ${card.phone ? `Phone: ${card.phone}<br />` : ''}
            ${card.website ? `Web: <a href="${card.website}" style="color: ${primaryColor};">${card.website.replace(/^https?:\/\//, '')}</a>` : ''}
        </td>
    </tr>
</table>`;
        }

        if (style === 'creative') {
            return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px;">
    <tr>
        <td style="background: linear-gradient(135deg, ${primaryColor}, ${card.color_secondary || '#6366f1'}); padding: 15px; border-radius: 8px;">
            <table cellpadding="0" cellspacing="0" border="0" style="color: #ffffff;">
                <tr>
                    ${showAvatar && card.avatar ? `<td style="padding-right: 15px;"><img src="${card.avatar}" alt="${card.display_name}" width="70" height="70" style="border-radius: 8px; border: 2px solid rgba(255,255,255,0.3);" /></td>` : ''}
                    <td style="vertical-align: top;">
                        <div style="font-size: 20px; font-weight: bold; margin-bottom: 3px;">${card.display_name}</div>
                        ${card.title ? `<div style="font-size: 14px; opacity: 0.9;">${card.title}</div>` : ''}
                        ${card.company ? `<div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">${card.company}</div>` : ''}
                    </td>
                </tr>
            </table>
            <table cellpadding="0" cellspacing="0" border="0" style="color: #ffffff; margin-top: 10px;">
                <tr>
                    ${card.email ? `<td style="padding-right: 15px;"><a href="mailto:${card.email}" style="color: #ffffff; text-decoration: none; font-size: 12px;">📧 ${card.email}</a></td>` : ''}
                    ${card.phone ? `<td><a href="tel:${card.phone}" style="color: #ffffff; text-decoration: none; font-size: 12px;">📞 ${card.phone}</a></td>` : ''}
                </tr>
            </table>
            <div style="margin-top: 10px;">
                <a href="${card.public_url}" style="display: inline-block; padding: 8px 16px; background-color: rgba(255,255,255,0.2); color: #ffffff; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: bold;">✨ View Digital Card</a>
            </div>
        </td>
    </tr>
</table>`;
        }

        return '';
    };

    const copyToClipboard = async () => {
        const html = generateSignatureHtml();
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([html], { type: 'text/html' }),
                    'text/plain': new Blob([html], { type: 'text/plain' }),
                }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for browsers that don't support ClipboardItem
            const textarea = document.createElement('textarea');
            textarea.value = html;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const downloadHtml = () => {
        const html = generateSignatureHtml();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${card.display_name.replace(/\s+/g, '-').toLowerCase()}-signature.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Email Signature Generator" />

            <div className="py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('business-cards.edit', card.id)}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Card Editor
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Email Signature Generator</h1>
                        <p className="text-gray-400 mt-1">Create a professional email signature from your business card</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Options Panel */}
                        <div className="space-y-6">
                            {/* Style Selection */}
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Signature Style</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(signatureStyles).map(([key, value]) => (
                                        <button
                                            key={key}
                                            onClick={() => setStyle(key)}
                                            className={`p-4 rounded-xl border text-left transition-all ${
                                                style === key
                                                    ? 'border-violet-500 bg-violet-500/20'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="text-white font-medium">{value.name}</div>
                                            <div className="text-gray-400 text-sm">{value.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Options</h2>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showAvatar}
                                            onChange={(e) => setShowAvatar(e.target.checked)}
                                            className="w-5 h-5 rounded bg-white/5 border-white/20 text-violet-500 focus:ring-violet-500"
                                        />
                                        <span className="text-white">Show profile photo/logo</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showSocial}
                                            onChange={(e) => setShowSocial(e.target.checked)}
                                            className="w-5 h-5 rounded bg-white/5 border-white/20 text-violet-500 focus:ring-violet-500"
                                        />
                                        <span className="text-white">Show social media links</span>
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                            Copy HTML
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={downloadHtml}
                                    className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download
                                </button>
                            </div>
                        </div>

                        {/* Preview Panel */}
                        <div className="space-y-6">
                            <div className="rounded-2xl bg-white border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
                                <div className="bg-gray-50 rounded-xl p-6 min-h-[200px]">
                                    <div
                                        ref={signatureRef}
                                        dangerouslySetInnerHTML={{ __html: generateSignatureHtml() }}
                                    />
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">How to Use</h2>
                                <div className="space-y-4 text-gray-400 text-sm">
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                                        <p>Click "Copy HTML" to copy your signature to clipboard</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                                        <p>Open your email client's signature settings</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                                        <p>Paste the signature (Ctrl+V / Cmd+V)</p>
                                    </div>
                                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                                        <p className="text-white text-xs font-medium mb-1">Supported Email Clients:</p>
                                        <p className="text-gray-500 text-xs">Gmail, Outlook, Apple Mail, Thunderbird, and most other email clients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
