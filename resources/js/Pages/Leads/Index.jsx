import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const typeLabels = {
    contact: 'General',
    meeting: 'Meeting Request',
    callback: 'Callback Request',
    inquiry: 'Business Inquiry',
};

const typeColors = {
    contact: 'bg-blue-100 text-blue-700',
    meeting: 'bg-purple-100 text-purple-700',
    callback: 'bg-orange-100 text-orange-700',
    inquiry: 'bg-emerald-100 text-emerald-700',
};

export default function Index({ leads, unreadCount }) {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (lead) => {
        if (confirm(`Delete this lead from ${lead.name}?`)) {
            setDeletingId(lead.id);
            router.delete(route('leads.destroy', lead.id), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const markAsRead = (lead) => {
        router.post(route('leads.read', lead.id), {}, { preserveScroll: true });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return `${minutes}m ago`;
            }
            return `${hours}h ago`;
        } else if (days === 1) {
            return 'Yesterday';
        } else if (days < 7) {
            return `${days}d ago`;
        }
        return date.toLocaleDateString();
    };

    return (
        <AuthenticatedLayout>
            <Head title="Leads" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Leads</h1>
                            <p className="text-gray-400 mt-1">
                                Inquiries from your business cards
                                {unreadCount > 0 && (
                                    <span className="ml-2 px-2 py-0.5 bg-violet-500 text-white text-xs font-bold rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Leads List */}
                    {leads.data.length === 0 ? (
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-12 text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No leads yet</h3>
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                Share your business card to start receiving inquiries. Leads will appear here when visitors contact you.
                            </p>
                            <Link
                                href={route('business-cards.index')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                                </svg>
                                Manage Business Cards
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {leads.data.map((lead) => (
                                <div
                                    key={lead.id}
                                    className={`rounded-2xl bg-white/5 border overflow-hidden transition-all hover:border-violet-500/50 ${
                                        lead.status === 'new' ? 'border-violet-500/50 bg-violet-500/5' : 'border-white/10'
                                    }`}
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                            {/* Avatar */}
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold">
                                                    {lead.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-white">{lead.name}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[lead.type]}`}>
                                                        {typeLabels[lead.type]}
                                                    </span>
                                                    {lead.status === 'new' && (
                                                        <span className="px-2 py-0.5 bg-violet-500 text-white text-xs font-bold rounded-full">
                                                            NEW
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                                                    <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors">
                                                        {lead.email}
                                                    </a>
                                                    {lead.phone && (
                                                        <>
                                                            <span>•</span>
                                                            <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">
                                                                {lead.phone}
                                                            </a>
                                                        </>
                                                    )}
                                                    {lead.company && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{lead.company}</span>
                                                        </>
                                                    )}
                                                </div>

                                                {lead.message && (
                                                    <p className="text-gray-300 text-sm line-clamp-2">{lead.message}</p>
                                                )}

                                                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                                    <span>via {lead.business_card?.name || 'Business Card'}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(lead.created_at)}</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 sm:flex-col">
                                                <Link
                                                    href={route('leads.show', lead.id)}
                                                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                                    title="View Details"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                                <a
                                                    href={`mailto:${lead.email}`}
                                                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-all"
                                                    title="Reply via Email"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(lead)}
                                                    disabled={deletingId === lead.id}
                                                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination */}
                            {leads.last_page > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    {leads.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                link.active
                                                    ? 'bg-violet-500 text-white'
                                                    : link.url
                                                    ? 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                                                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                                            }`}
                                            preserveScroll
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
