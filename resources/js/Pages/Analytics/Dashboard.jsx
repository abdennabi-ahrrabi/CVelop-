import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    // Placeholder data - in a real implementation, this would come from the backend
    const stats = {
        totalViews: 0,
        monthlyViews: 0,
        qrScans: 0,
        linkClicks: 0,
    };

    return (
        <AuthenticatedLayout>
            <Head title="Analytics" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white">Analytics</h1>
                        <p className="text-gray-400 mt-1">Track your professional identity performance</p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">{stats.totalViews}</p>
                                    <p className="text-sm text-gray-400">Total Views</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">{stats.monthlyViews}</p>
                                    <p className="text-sm text-gray-400">This Month</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">{stats.qrScans}</p>
                                    <p className="text-sm text-gray-400">QR Scans</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">{stats.linkClicks}</p>
                                    <p className="text-sm text-gray-400">Link Clicks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Views Over Time</h3>
                            <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                                <div className="text-center">
                                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-gray-500">Chart data will appear here</p>
                                    <p className="text-gray-600 text-sm">once you start receiving views</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
                            <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                                <div className="text-center">
                                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                    <p className="text-gray-500">Source breakdown</p>
                                    <p className="text-gray-600 text-sm">Direct, QR Code, Social, etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h4 className="text-xl font-semibold text-white mb-2">No activity yet</h4>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Share your profile or business cards to start tracking views and engagement.
                            </p>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-8 rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Boost Your Visibility</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-violet-400 font-bold">1</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">Add to Email Signature</h4>
                                    <p className="text-xs text-gray-400">Include your profile link in your email signature</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-violet-400 font-bold">2</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">Share QR Code</h4>
                                    <p className="text-xs text-gray-400">Print your QR code on business cards or materials</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-violet-400 font-bold">3</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">Social Media Bio</h4>
                                    <p className="text-xs text-gray-400">Add your Indentio link to your social profiles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
