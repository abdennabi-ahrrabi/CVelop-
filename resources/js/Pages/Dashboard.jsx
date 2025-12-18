import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats, recentActivity, recentResumes, recentCards }) {
    const user = usePage().props.auth.user;

    // Use passed stats or defaults
    const dashboardStats = stats || {
        totalViews: 0,
        resumeCount: 0,
        cardCount: 0,
        clickRate: 0,
        viewsChange: 0,
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Welcome back, {user.name.split(' ')[0]}
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Here's what's happening with your professional identity
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/resumes/wizard"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-violet-500/20"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                AI Wizard
                            </Link>
                            <Link
                                href="/business-cards/create"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg transition-all border border-white/10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Card
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Total Views</p>
                                    <p className="text-2xl font-bold text-white mt-1">{dashboardStats.totalViews}</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-3 text-xs">
                                <span className={dashboardStats.viewsChange >= 0 ? "text-emerald-400" : "text-red-400"}>
                                    {dashboardStats.viewsChange >= 0 ? '+' : ''}{dashboardStats.viewsChange}%
                                </span>
                                <span className="text-gray-500">from last month</span>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Resumes</p>
                                    <p className="text-2xl font-bold text-white mt-1">{dashboardStats.resumeCount}</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <Link href="/resumes" className="flex items-center gap-1 mt-3 text-xs text-violet-400 hover:text-violet-300">
                                View all
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Business Cards</p>
                                    <p className="text-2xl font-bold text-white mt-1">{dashboardStats.cardCount}</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                </div>
                            </div>
                            <Link href="/business-cards" className="flex items-center gap-1 mt-3 text-xs text-violet-400 hover:text-violet-300">
                                View all
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Click Rate</p>
                                    <p className="text-2xl font-bold text-white mt-1">{dashboardStats.clickRate}%</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                </div>
                            </div>
                            <Link href="/analytics" className="flex items-center gap-1 mt-3 text-xs text-violet-400 hover:text-violet-300">
                                View analytics
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content - Left Side */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Create */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Quick Create</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Link href="/resumes/wizard" className="group">
                                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-5 hover:shadow-lg hover:shadow-violet-500/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">AI Resume Wizard</h3>
                                                    <p className="text-sm text-violet-200">Create with AI assistance</p>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded">
                                                Popular
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href="/resumes/create" className="group">
                                        <div className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">New Resume</h3>
                                                    <p className="text-sm text-gray-400">Start from scratch</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href="/business-cards/create" className="group">
                                        <div className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">Business Card</h3>
                                                    <p className="text-sm text-gray-400">Create digital card</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href="/templates/builder" className="group">
                                        <div className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">Template Builder</h3>
                                                    <p className="text-sm text-gray-400">Custom template</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                                    <Link href="/analytics" className="text-sm text-violet-400 hover:text-violet-300">
                                        View all
                                    </Link>
                                </div>

                                {recentActivity && recentActivity.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentActivity.map((activity, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                    activity.type === 'view' ? 'bg-violet-500/20' : 'bg-emerald-500/20'
                                                }`}>
                                                    {activity.type === 'view' ? (
                                                        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-white truncate">{activity.message}</p>
                                                    <p className="text-xs text-gray-500">{activity.time_ago}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-white font-medium mb-1">No activity yet</h3>
                                        <p className="text-sm text-gray-400 max-w-xs">
                                            Create your first resume or business card to start tracking activity
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="space-y-6">
                            {/* Public Profile Card */}
                            <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-xl p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{user.name}</h3>
                                        <p className="text-sm text-gray-400">@{user.username || user.email.split('@')[0]}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={`/@${user.username || user.email.split('@')[0]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all group"
                                    >
                                        <span className="text-sm text-white">View Public Profile</span>
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>

                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all group"
                                    >
                                        <span className="text-sm text-gray-300">Edit Profile Settings</span>
                                        <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
                                <div className="space-y-2">
                                    <Link href="/resumes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">My Resumes</span>
                                    </Link>

                                    <Link href="/business-cards" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group">
                                        <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Business Cards</span>
                                    </Link>

                                    <Link href="/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Analytics</span>
                                    </Link>

                                    <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group">
                                        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Settings</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Pro Tips */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                                    </svg>
                                    <h3 className="text-sm font-semibold text-white">Pro Tip</h3>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Add your Indentio profile link to your email signature for easy sharing. Your public profile shows all your resumes and business cards in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
