import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ messages, unreadCount }) {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (message) => {
        if (confirm('Are you sure you want to delete this message?')) {
            setDeletingId(message.id);
            router.delete(route('messages.destroy', message.id), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const markAsRead = (message) => {
        if (!message.is_read) {
            router.post(route('messages.read', message.id), {}, {
                preserveScroll: true,
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Messages" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Inbox</h1>
                            <p className="text-gray-400 mt-1">
                                {unreadCount > 0 ? (
                                    <span className="text-violet-400">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</span>
                                ) : (
                                    'Messages from your visitors'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Messages List */}
                    {messages.data.length === 0 ? (
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-12 text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No messages yet</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                When visitors contact you through your public profile, their messages will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden divide-y divide-white/10">
                            {messages.data.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-4 hover:bg-white/5 transition-all ${
                                        !message.is_read ? 'bg-violet-500/5' : ''
                                    }`}
                                >
                                    <Link
                                        href={route('messages.show', message.id)}
                                        className="block"
                                        onClick={() => markAsRead(message)}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                !message.is_read
                                                    ? 'bg-gradient-to-br from-violet-500 to-indigo-600'
                                                    : 'bg-white/10'
                                            }`}>
                                                <span className="text-sm font-bold text-white">
                                                    {message.sender_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <span className={`font-semibold truncate ${
                                                        !message.is_read ? 'text-white' : 'text-gray-300'
                                                    }`}>
                                                        {message.sender_name}
                                                    </span>
                                                    <span className="text-sm text-gray-500 flex-shrink-0">
                                                        {formatDate(message.created_at)}
                                                    </span>
                                                </div>
                                                <p className={`text-sm truncate ${
                                                    !message.is_read ? 'text-gray-300' : 'text-gray-500'
                                                }`}>
                                                    {message.subject || message.message.slice(0, 100)}
                                                </p>
                                            </div>

                                            {/* Unread Indicator */}
                                            {!message.is_read && (
                                                <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-2"></div>
                                            )}
                                        </div>
                                    </Link>

                                    {/* Quick Actions */}
                                    <div className="flex items-center gap-2 mt-3 ml-14">
                                        <Link
                                            href={route('messages.show', message.id)}
                                            className="text-xs text-gray-400 hover:text-white transition-colors"
                                        >
                                            View
                                        </Link>
                                        <span className="text-gray-600">|</span>
                                        <a
                                            href={`mailto:${message.sender_email}`}
                                            className="text-xs text-gray-400 hover:text-violet-400 transition-colors"
                                        >
                                            Reply via Email
                                        </a>
                                        <span className="text-gray-600">|</span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(message);
                                            }}
                                            disabled={deletingId === message.id}
                                            className="text-xs text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {messages.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {messages.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        link.active
                                            ? 'bg-violet-600 text-white'
                                            : link.url
                                            ? 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                                            : 'bg-white/5 text-gray-600 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveScroll
                                />
                            ))}
                        </div>
                    )}

                    {/* Info Card */}
                    {messages.data.length > 0 && (
                        <div className="mt-8 rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">About Contact Messages</h3>
                                    <p className="text-sm text-gray-400">
                                        These messages are sent by visitors through your public profile contact form.
                                        Your email address is never exposed to senders.
                                        Click "Reply via Email" to respond directly from your email client.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
