import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function NfcSetup({ card }) {
    const [copiedUrl, setCopiedUrl] = useState(false);
    const cardUrl = `${window.location.origin}/c/${card.slug}`;

    const copyUrl = () => {
        navigator.clipboard.writeText(cardUrl);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
    };

    const nfcTags = [
        {
            name: 'NFC215 Tags',
            description: 'Most common and affordable option. Works with all smartphones.',
            storage: '504 bytes',
            price: '$0.30 - $0.50 each',
            recommended: true,
        },
        {
            name: 'NFC216 Tags',
            description: 'Higher storage capacity for longer URLs or additional data.',
            storage: '888 bytes',
            price: '$0.50 - $1.00 each',
            recommended: false,
        },
        {
            name: 'NFC Metal Tags',
            description: 'Special tags designed to work on metal surfaces.',
            storage: '504 bytes',
            price: '$1.00 - $2.00 each',
            recommended: false,
        },
        {
            name: 'NFC Cards',
            description: 'Credit card sized NFC cards for a premium look.',
            storage: '504 bytes',
            price: '$2.00 - $5.00 each',
            recommended: false,
        },
    ];

    const apps = [
        {
            name: 'NFC Tools',
            platform: 'iOS & Android',
            icon: '🛠️',
            features: ['Write URLs', 'Read tags', 'Lock tags'],
            link: 'https://www.wakdev.com/en/apps/nfc-tools.html',
        },
        {
            name: 'NXP TagWriter',
            platform: 'Android',
            icon: '📝',
            features: ['Easy URL writing', 'Multiple formats', 'Batch writing'],
            link: 'https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter',
        },
        {
            name: 'GoToTags',
            platform: 'iOS & Android',
            icon: '🏷️',
            features: ['Business focused', 'Analytics', 'Bulk encoding'],
            link: 'https://gototags.com/',
        },
    ];

    const steps = [
        {
            number: 1,
            title: 'Get an NFC Tag',
            description: 'Purchase NFC tags online (Amazon, AliExpress) or from specialty stores. NFC215 tags are recommended for business cards.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
        },
        {
            number: 2,
            title: 'Install an NFC Writer App',
            description: 'Download "NFC Tools" or "NXP TagWriter" from your app store. These apps allow you to write URLs to NFC tags.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            number: 3,
            title: 'Copy Your Card URL',
            description: 'Use the button below to copy your unique business card URL. This is the link that will open when someone scans your NFC tag.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
            ),
        },
        {
            number: 4,
            title: 'Write to the NFC Tag',
            description: 'Open the NFC app, select "Write" or "Write Tag", choose "URL" type, paste your card URL, and tap your phone to the NFC tag.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
        },
        {
            number: 5,
            title: 'Test Your Tag',
            description: 'Hold your phone near the NFC tag to verify it opens your business card. The link should work on any NFC-enabled smartphone.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            number: 6,
            title: 'Attach to Your Card',
            description: 'Stick the NFC tag to the back of your physical business card, or embed it in a card holder, phone case, or other accessory.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                </svg>
            ),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title={`NFC Setup - ${card.name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('business-cards.index')}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Business Cards
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">NFC Setup Guide</h1>
                                <p className="text-gray-400">Set up NFC tap-to-share for "{card.name}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Your Card URL */}
                    <div className="rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 p-6 mb-8">
                        <h2 className="text-lg font-semibold text-white mb-2">Your Business Card URL</h2>
                        <p className="text-gray-400 text-sm mb-4">This is the URL you'll program into your NFC tag</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={cardUrl}
                                readOnly
                                className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-sm"
                            />
                            <button
                                onClick={copyUrl}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                                    copiedUrl
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {copiedUrl ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    {/* Step by Step Guide */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-6">Step-by-Step Setup</h2>
                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white">
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-violet-400">STEP {step.number}</span>
                                        </div>
                                        <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                                        <p className="text-gray-400 text-sm">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended NFC Tags */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-2">Recommended NFC Tags</h2>
                        <p className="text-gray-400 text-sm mb-6">Choose the right NFC tag for your needs</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {nfcTags.map((tag) => (
                                <div
                                    key={tag.name}
                                    className={`p-4 rounded-xl border transition-all ${
                                        tag.recommended
                                            ? 'bg-violet-500/10 border-violet-500/30'
                                            : 'bg-white/5 border-white/10'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-white">{tag.name}</h3>
                                        {tag.recommended && (
                                            <span className="px-2 py-0.5 bg-violet-500 text-white text-xs font-bold rounded-full">
                                                Recommended
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm mb-3">{tag.description}</p>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="text-gray-500">
                                            <span className="text-gray-400">Storage:</span> {tag.storage}
                                        </span>
                                        <span className="text-gray-500">
                                            <span className="text-gray-400">Price:</span> {tag.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Apps */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-2">NFC Writer Apps</h2>
                        <p className="text-gray-400 text-sm mb-6">Free apps to program your NFC tags</p>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {apps.map((app) => (
                                <a
                                    key={app.name}
                                    href={app.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all group"
                                >
                                    <div className="text-3xl mb-2">{app.icon}</div>
                                    <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">{app.name}</h3>
                                    <p className="text-gray-500 text-xs mb-2">{app.platform}</p>
                                    <ul className="space-y-1">
                                        {app.features.map((feature) => (
                                            <li key={feature} className="text-gray-400 text-xs flex items-center gap-1">
                                                <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-amber-400 mb-2">Pro Tips</h3>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400">•</span>
                                        <span>Lock your NFC tag after writing to prevent accidental overwrites</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400">•</span>
                                        <span>Test with multiple phones to ensure compatibility</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400">•</span>
                                        <span>Place tags away from metal or electronic components for best scanning</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400">•</span>
                                        <span>Consider ordering a few extra tags as backups</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Video Tutorial Placeholder */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center mb-8">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Need Visual Help?</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Search "How to write NFC tag" on YouTube for video tutorials showing the exact process.
                        </p>
                        <a
                            href="https://www.youtube.com/results?search_query=how+to+write+nfc+tag+url"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                            Watch Tutorials
                        </a>
                    </div>

                    {/* Other Tools */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Other Sharing Options</h2>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <a
                                href={route('business-cards.qr.download', card.id)}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">QR Code</h3>
                                    <p className="text-gray-500 text-xs">Download for print</p>
                                </div>
                            </a>
                            <Link
                                href={route('business-cards.signature', card.id)}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">Email Signature</h3>
                                    <p className="text-gray-500 text-xs">Generate HTML signature</p>
                                </div>
                            </Link>
                            <a
                                href={route('business-cards.pdf', card.id)}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">PDF Export</h3>
                                    <p className="text-gray-500 text-xs">Printable format</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
