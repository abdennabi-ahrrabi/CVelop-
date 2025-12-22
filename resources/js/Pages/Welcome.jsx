import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Indentio - Your Professional Identity Platform" />
            <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-transparent to-indigo-950/50"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-violet-500/10 via-transparent to-indigo-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                </div>

                {/* Navigation */}
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' : ''}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <ApplicationLogo className="[&_span]:text-white" />

                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a>
                                <a href="#templates" className="text-gray-400 hover:text-white transition-colors">Templates</a>
                            </div>

                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-5 py-2.5 text-gray-300 hover:text-white font-medium transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                                        >
                                            Get Started Free
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                                    </span>
                                    <span className="text-sm text-violet-300">Your Professional Identity Platform</span>
                                </div>

                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                                    Own Your
                                    <span className="block mt-2 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                        Professional Identity
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
                                    Resumes, digital business cards, public profiles, and analytics - all in one platform. Share your professional story with the world.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    {!auth.user && (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl transition-all shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 overflow-hidden"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    Start Building Free
                                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </Link>
                                            <a
                                                href="#how-it-works"
                                                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-lg font-semibold rounded-2xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm"
                                            >
                                                See How It Works
                                            </a>
                                        </>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="mt-16 grid grid-cols-3 gap-8">
                                    {[
                                        { value: '10K+', label: 'Resumes Created' },
                                        { value: '5min', label: 'Average Time' },
                                        { value: '98%', label: 'Success Rate' },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center lg:text-left">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{stat.value}</div>
                                            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Resume Preview */}
                            <div className="relative hidden lg:block">
                                {/* Floating Elements */}
                                <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl rotate-12 opacity-80 animate-float"></div>
                                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl -rotate-12 opacity-80 animate-float" style={{ animationDelay: '1s' }}></div>
                                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg rotate-6 opacity-80 animate-float" style={{ animationDelay: '2s' }}></div>

                                {/* Main Card */}
                                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                                    {/* Mock Resume */}
                                    <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-xl">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                                JD
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                                                <p className="text-violet-600 font-medium">Senior Software Engineer</p>
                                                <p className="text-sm text-gray-500">San Francisco, CA</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Experience</div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-4/5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Skills</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {['React', 'Node.js', 'Python', 'AWS'].map((skill, i) => (
                                                        <span key={i} className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Education</div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Badge */}
                                        <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            AI Enhanced
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted By / Logos */}
                <section className="relative z-10 py-12 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-gray-500 text-sm mb-8">Trusted by professionals at</p>
                        <div className="flex justify-center items-center gap-12 flex-wrap opacity-40">
                            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company, i) => (
                                <span key={i} className="text-2xl font-bold text-gray-400">{company}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features - Bento Grid */}
                <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                Everything you need to
                                <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">land your dream job</span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Powerful features that make resume building effortless
                            </p>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* AI Feature - Large */}
                            <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-8 hover:border-violet-500/40 transition-all">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/30 to-transparent rounded-full blur-3xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-bold rounded-full">AI POWERED</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Smart Content Generation</h3>
                                    <p className="text-gray-400 mb-6 max-w-md">
                                        Let our AI write compelling job descriptions and enhance your content to make it more impactful.
                                    </p>
                                    <div className="flex gap-2">
                                        {['Auto-enhance text', 'Grammar fix', 'Professional tone'].map((tag, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-white/5 text-gray-300 text-sm rounded-full border border-white/10">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ATS Friendly */}
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/20 p-8 hover:border-emerald-500/40 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">ATS-Optimized</h3>
                                <p className="text-gray-400">Formats that pass applicant tracking systems every time.</p>
                            </div>

                            {/* Templates */}
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/20 p-8 hover:border-pink-500/40 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">5+ Pro Templates</h3>
                                <p className="text-gray-400">Beautiful designs for every industry and role.</p>
                            </div>

                            {/* PDF Export */}
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/20 p-8 hover:border-amber-500/40 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Instant PDF Export</h3>
                                <p className="text-gray-400">Download print-ready PDFs in one click.</p>
                            </div>

                            {/* Customization */}
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/20 p-8 hover:border-blue-500/40 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Full Customization</h3>
                                <p className="text-gray-400">Colors, fonts, spacing - make it uniquely yours.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                Three steps to your
                                <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">perfect resume</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: '01',
                                    title: 'Enter Your Info',
                                    description: 'Fill in your details using our intuitive forms or let AI guide you step by step.',
                                    color: 'violet'
                                },
                                {
                                    step: '02',
                                    title: 'AI Enhancement',
                                    description: 'Our AI polishes your content, making it compelling and professional.',
                                    color: 'purple'
                                },
                                {
                                    step: '03',
                                    title: 'Download & Apply',
                                    description: 'Choose a template, customize styling, and download your perfect PDF.',
                                    color: 'indigo'
                                }
                            ].map((item, i) => (
                                <div key={i} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
                                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                                        <div className={`text-6xl font-bold bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 bg-clip-text text-transparent opacity-20 mb-4`}>
                                            {item.step}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                                    {i < 2 && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-600">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Templates Preview */}
                <section id="templates" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                Professional templates
                                <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">for every role</span>
                            </h2>
                            <p className="text-xl text-gray-400">Stand out with designs that get noticed</p>
                        </div>

                        <div className="flex gap-6 justify-center flex-wrap">
                            {['Modern', 'Classic', 'Creative', 'Minimal', 'Executive'].map((template, i) => (
                                <div
                                    key={i}
                                    className="w-48 h-64 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-violet-500/50 hover:scale-105 transition-all cursor-pointer group"
                                >
                                    <div className="w-full h-full bg-white rounded-lg flex flex-col p-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 mb-2"></div>
                                        <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                                        <div className="h-1.5 bg-gray-100 rounded w-1/2 mb-3"></div>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-1 bg-gray-100 rounded"></div>
                                            <div className="h-1 bg-gray-100 rounded w-5/6"></div>
                                            <div className="h-1 bg-gray-100 rounded w-4/6"></div>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-400 mt-2 group-hover:text-white transition-colors">{template}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-12 text-center">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                                    Ready to land your dream job?
                                </h2>
                                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                                    Join thousands of professionals who own their professional identity with Indentio.
                                </p>
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-2xl transition-all hover:bg-gray-100 shadow-2xl hover:shadow-white/25"
                                    >
                                        Create Your Free Resume
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <ApplicationLogo className="mb-4 [&_span]:text-white" />
                                <p className="text-gray-400 max-w-md">
                                    Your complete professional identity platform. Resumes, digital business cards, public profiles, and analytics - all in one place.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Product</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                    <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
                                    <li><Link href={route('register')} className="hover:text-white transition-colors">Get Started</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Legal</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href={route('terms')} className="hover:text-white transition-colors">Terms of Service</Link></li>
                                    <li><Link href={route('privacy')} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500">
                            <p>&copy; {new Date().getFullYear()} Indentio. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(var(--rotation, 12deg)); }
                    50% { transform: translateY(-20px) rotate(var(--rotation, 12deg)); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
