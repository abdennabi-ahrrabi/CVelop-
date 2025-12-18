import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ message }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('messages.destroy', message.id));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Message from ${message.sender_name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <Link
                        href={route('messages.index')}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Inbox
                    </Link>

                    {/* Message Card */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg font-bold text-white">
                                        {message.sender_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-xl font-bold text-white">{message.sender_name}</h1>
                                    <a
                                        href={`mailto:${message.sender_email}`}
                                        className="text-violet-400 hover:text-violet-300 transition-colors"
                                    >
                                        {message.sender_email}
                                    </a>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {formatDate(message.created_at)}
                                    </p>
                                </div>
                            </div>

                            {message.subject && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <h2 className="text-lg font-semibold text-white">
                                        {message.subject}
                                    </h2>
                                </div>
                            )}
                        </div>

                        {/* Message Body */}
                        <div className="p-6">
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {message.message}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 bg-white/5 border-t border-white/10 flex flex-wrap gap-3">
                            <a
                                href={`mailto:${message.sender_email}?subject=Re: ${message.subject || 'Your message'}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                                Reply via Email
                            </a>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 font-medium rounded-xl transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Message Details
                        </h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <dt className="text-gray-500">Received</dt>
                                <dd className="text-white">{formatDate(message.created_at)}</dd>
                            </div>
                            {message.read_at && (
                                <div>
                                    <dt className="text-gray-500">Read</dt>
                                    <dd className="text-white">{formatDate(message.read_at)}</dd>
                                </div>
                            )}
                            {message.ip_address && (
                                <div>
                                    <dt className="text-gray-500">IP Address</dt>
                                    <dd className="text-white font-mono">{message.ip_address}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
