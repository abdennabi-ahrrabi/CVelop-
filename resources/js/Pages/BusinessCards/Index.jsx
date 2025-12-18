import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ cards }) {
    const [deletingId, setDeletingId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const handleDelete = (card) => {
        if (confirm(`Are you sure you want to delete "${card.name}"? This action cannot be undone.`)) {
            setDeletingId(card.id);
            router.delete(route('business-cards.destroy', card.id), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const copyLink = (card) => {
        navigator.clipboard.writeText(card.public_url);
        setCopiedId(card.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Business Cards" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Business Cards</h1>
                            <p className="text-gray-400 mt-1">Create and manage your digital business cards</p>
                        </div>
                        <Link
                            href={route('business-cards.create')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Card
                        </Link>
                    </div>

                    {/* Cards Grid */}
                    {cards.length === 0 ? (
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-12 text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No business cards yet</h3>
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                Create your first digital business card to share your contact information with anyone using a simple link or QR code.
                            </p>
                            <Link
                                href={route('business-cards.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Your First Card
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className={`rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-violet-500/50 transition-all ${
                                        !card.is_active ? 'opacity-60' : ''
                                    }`}
                                >
                                    {/* Card Preview Header */}
                                    <div
                                        className="h-20 relative"
                                        style={{ background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary})` }}
                                    >
                                        {card.is_primary && (
                                            <span className="absolute top-2 right-2 px-2 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
                                                PRIMARY
                                            </span>
                                        )}
                                        {!card.is_active && (
                                            <span className="absolute top-2 left-2 px-2 py-1 bg-red-500/80 text-white text-xs font-bold rounded-full">
                                                INACTIVE
                                            </span>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                                <span className="text-lg font-bold text-white">
                                                    {card.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-white truncate">{card.name}</h3>
                                                <p className="text-sm text-gray-400 truncate">{card.display_name}</p>
                                                {card.title && <p className="text-sm text-violet-400 truncate">{card.title}</p>}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-2 mb-4">
                                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                                <p className="text-lg font-bold text-white">{card.view_count}</p>
                                                <p className="text-xs text-gray-500">Views</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                                <p className="text-lg font-bold text-white">{card.qr_scan_count}</p>
                                                <p className="text-xs text-gray-500">QR Scans</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                                <p className="text-lg font-bold text-white">{card.link_click_count}</p>
                                                <p className="text-xs text-gray-500">Clicks</p>
                                            </div>
                                        </div>

                                        {/* Primary Actions */}
                                        <div className="flex gap-2 mb-3">
                                            <Link
                                                href={route('business-cards.edit', card.id)}
                                                className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all text-center"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => copyLink(card)}
                                                className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                                title="Copy Link"
                                            >
                                                {copiedId === card.id ? (
                                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                    </svg>
                                                )}
                                            </button>
                                            <a
                                                href={card.public_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                                title="View Card"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                            <button
                                                onClick={() => handleDelete(card)}
                                                disabled={deletingId === card.id}
                                                className="py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Tools Row */}
                                        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10">
                                            <a
                                                href={route('business-cards.pdf', card.id)}
                                                className="py-2 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-lg transition-all text-center flex items-center justify-center gap-1"
                                                title="Download PDF"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                PDF
                                            </a>
                                            <a
                                                href={route('business-cards.qr.download', card.id)}
                                                className="py-2 px-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-xs font-medium rounded-lg transition-all text-center flex items-center justify-center gap-1"
                                                title="Download QR Code"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                </svg>
                                                QR
                                            </a>
                                            <Link
                                                href={route('business-cards.signature', card.id)}
                                                className="py-2 px-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium rounded-lg transition-all text-center flex items-center justify-center gap-1"
                                                title="Email Signature"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Sig
                                            </Link>
                                            <Link
                                                href={route('business-cards.nfc', card.id)}
                                                className="py-2 px-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium rounded-lg transition-all text-center flex items-center justify-center gap-1"
                                                title="NFC Setup Guide"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                                </svg>
                                                NFC
                                            </Link>
                                        </div>

                                        <p className="text-xs text-gray-500 mt-3 text-center">
                                            Created {card.created_at}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tips Section */}
                    {cards.length > 0 && (
                        <div className="mt-8 rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Tips for Success</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Share Your QR Code</h4>
                                        <p className="text-sm text-gray-400">Print or display your QR code for quick contact sharing</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Customize Your Design</h4>
                                        <p className="text-sm text-gray-400">Choose colors and templates that match your brand</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Track Performance</h4>
                                        <p className="text-sm text-gray-400">Monitor views, scans, and clicks to measure engagement</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
