import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-[#0a0a0f]">
            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-[#0a0a0f] to-indigo-950/50"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <Link href="/" className="mb-12">
                        <ApplicationLogo className="[&_img]:h-12 [&_span]:text-2xl [&_span]:text-white" />
                    </Link>

                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">Build Your</span>
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Professional Resume</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                        Create stunning resumes with AI-powered suggestions.
                        Stand out from the crowd and land your dream job.
                    </p>

                    <div className="space-y-5">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-lg text-gray-300">Professional templates</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 flex items-center justify-center group-hover:border-violet-500/50 transition-colors">
                                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg text-gray-300">AI-powered content enhancement</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-lg text-gray-300">Export to PDF instantly</span>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative">
                {/* Subtle background glow */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px]"></div>

                {/* Mobile logo */}
                <div className="lg:hidden mb-8">
                    <Link href="/">
                        <ApplicationLogo className="[&_span]:text-white" />
                    </Link>
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 shadow-2xl shadow-black/20">
                        {children}
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        By continuing, you agree to our{' '}
                        <Link href="/terms" className="text-violet-400 hover:text-violet-300 transition-colors">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
